import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApicallService } from '../../services/apicall.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DataService } from 'src/app/services/data.service';
import { StorService } from '../../services/stor.service';


@Component({
  selector: 'app-pay-asses',
  templateUrl: './pay-asses.page.html',
  styleUrls: ['./pay-asses.page.scss'],
})
export class PayAssesPage implements OnInit {

  urlPay = environment.apiUrl + 'mobPay/';


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

  constructor(
    private apiCall: ApicallService,
    private router: Router,
    private stor: StorService,
    private dataService: DataService
  ) { }

  ngOnInit() {


    this.ass = this.dataService.getData('ass');
    console.log(this.ass);

    this.amount = this.dataService.getData('amount');


    this.stor.getLocalData('user', data => {
      this.user = data;
      console.log(this.user);
    });



    this.getBank();
    this.getMobileEmail();
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
      console.log(data);
    });
  }



}
