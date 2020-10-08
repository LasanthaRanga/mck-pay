import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApicallService } from '../../services/apicall.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DataService } from 'src/app/services/data.service';
import { StorService } from '../../services/stor.service';
import { PrintService } from '../../services/print.service';
import { IonicToastService } from '../../services/ionic-toast.service';


@Component({
  selector: 'app-pay-asses',
  templateUrl: './pay-asses.page.html',
  styleUrls: ['./pay-asses.page.scss'],
})
export class PayAssesPage implements OnInit {

  urlPay = environment.apiUrl + 'mobPay/';
  mobprint = environment.apiUrl + 'mobprint/';

  payType;
  ass;
  amount;
  banks;
  payButtonAnnable = false;
  chequeNO = '';
  selectedBank = 0;
  cusid = 0;
  user;
  payTypeInt;
  email = '';
  mobile = '';
  macAddress = '';
  sabaName = '';
  constructor(
    private apiCall: ApicallService,
    private router: Router,
    private stor: StorService,
    private dataService: DataService,
    private print: PrintService,
    private toast: IonicToastService) { }




  ngOnInit() {


    this.ass = this.dataService.getData('ass');
    console.log(this.ass);

    this.amount = this.dataService.getData('amount');


    this.stor.getLocalData('user', data => {
      this.user = data;
      console.log(this.user);
      this.getMacAddress();
      this.getName();
    });



    this.getBank();
    this.getMobileEmail();
  }

  getName() {
    this.apiCall.getValue('saba_name', data => {
      this.sabaName = data.value;
    });
  }

  payTypeChange() {
    if (this.ass) {
      if (this.payType === 'cash') {
        this.payTypeInt = 1;
        if (this.amount > 0) {
          this.payButtonAnnable = true;
        } else {
          this.payButtonAnnable = false;
        }
      } else if (this.payType === 'cheque') {
        this.payTypeInt = 2;
        if (this.amount > 0) {
          if (this.chequeNO && this.chequeNO.length > 2) {
            if (this.selectedBank) {
              this.payButtonAnnable = true;
            } else {
              this.payButtonAnnable = false;
            }
          } else {
            this.payButtonAnnable = false;
          }
        } else {
          this.payButtonAnnable = false;
        }
      } else {
        this.payButtonAnnable = false;
      }
    }
  }


  getMacAddress() {
    this.apiCall.call(this.mobprint + 'getMyPrinter', { uid: this.user.uid }, data => {
      this.macAddress = data[0].macAddress;
      console.log(this.macAddress);
    });
  }

  getBank() {
    this.apiCall.call(this.urlPay + 'getBank', {}, data => {
      this.banks = data;
    });
  }

  getMobileEmail() {
    if (this.ass) {
      this.apiCall.call(this.urlPay + 'getMobileEmail', { app_cat: 2, app_id: this.ass.idAssessment }, data => {
        if (data[0]) {
          this.email = data[0].cus_email;
          this.mobile = data[0].cus_mobile;
        }
      });
    }
  }

  payNow() {
    this.payButtonAnnable = false;
    const obj = {
      app_cat: 2,
      app_id: this.ass.idAssessment,
      user_id: this.user.uid,
      amount: this.amount,
      pay_type: this.payTypeInt,
      cheque_no: this.chequeNO,
      bank_id: this.selectedBank,
      cus_id: this.cusid,
      cus_email: this.email,
      cus_mobile: this.mobile,
      status: 0
    };

    console.log(obj);
    this.apiCall.call(this.urlPay + 'getPayment', obj, (data) => {
      const id = data.insertId;
      console.log(data.insertId);
      this.getReciptDataToPrint(id);
    });
  }


  getReciptDataToPrint(rid) {
    this.apiCall.call(this.urlPay + 'getReciptData', { id: rid }, dd => {
      console.log(dd);

      // amount: 200
      // app_cat: 2
      // app_id: 50
      // assessment_no: "101/7_1/1"
      // bank_id: 0
      // cheque_no: ""
      // collect_time: "2020-10-06T06:09:11.000Z"
      // cus_email: ""
      // cus_id: null
      // cus_mobile: ""
      // idMobilePay: 14
      // mobile_recipt_no: "RI-AT-14"
      // oder: 14
      // pay_type: 1
      // recipt_id: null
      // recipt_no: null
      // status: 0
      // status_time: "2020-10-06T06:09:11.000Z"
      // user_id: 1
      // user_username: "admin"


      const d = new Date(dd[0].collect_time);


      const myText = this.sabaName + '\n' +
        '    Assessment Tax Payment    \n' +
        '------------------------------ \n' +
        ' Receipt No : ' + dd[0].mobile_recipt_no + '\n' +
        ' Name : ' + dd[0].cus_name + '\n' +
        ' A.Tax No : ' + dd[0].assessment_no + '\n' +
        ' PAID : Rs.' + dd[0].amount.toFixed(2) + '\n' +
        ' Date : ' + d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + '  '
        + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '\n' +
        ' User : ' + dd[0].user_username + '\n' +
        '------------------------------ \n \n \n \n  ';

      console.log(myText);
      this.toast.showToast(dd[0].mobile_recipt_no, dd[0].amount, 'success');
      this.print.sendToBluetoothPrinter(this.macAddress, myText);
      this.router.navigate(['/find-asses']);

    });
  }



}
