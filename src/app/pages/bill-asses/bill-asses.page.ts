import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallService } from '../../services/apicall.service';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { StorService } from '../../services/stor.service';
import { PrintService } from '../../services/print.service';

@Component({
  selector: 'app-bill-asses',
  templateUrl: './bill-asses.page.html',
  styleUrls: ['./bill-asses.page.scss'],
})
export class BillAssesPage implements OnInit {
  mobPay = environment.apiUrl + 'mobPay/';
  mobprint = environment.apiUrl + 'mobprint/';
  urlPay = environment.apiUrl + 'mobPay/';

  billid;
  billData;
  sabaName = '';
  user;
  macAddress = '';

  constructor(
    private aRout: ActivatedRoute,
    private apiCall: ApicallService,
    private allert: AlertController,
    private router: Router,
    private stor: StorService,
    private print: PrintService,
  ) {
    this.billid = this.aRout.snapshot.paramMap.get('id');
    console.log(this.billid);
    this.getBill();
    this.getName();
  }

  ngOnInit() {
    this.stor.getLocalData('user', data => {
      this.user = data;
      console.log(this.user);
      this.getMacAddress();

    });
  }

  getName() {
    this.apiCall.getValue('saba_name', data => {
      this.sabaName = data.value;
    });
  }

  getMacAddress() {
    this.apiCall.call(this.mobprint + 'getMyPrinter', { uid: this.user.uid }, data => {
      this.macAddress = data[0].macAddress;
      console.log(this.macAddress);
    });
  }

  getBill() {
    this.apiCall.call(this.mobPay + 'getAssBill', { idMobilePay: this.billid }, data => {
      this.billData = data[0];
      console.log(this.billData);
    });
  }

  clickOnCancel() {
    console.log(this.billid);
    this.presentAlertMultipleButtons();
  }


  async presentAlertMultipleButtons() {
    const alert = await this.allert.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure to cancel',
      subHeader: '',
      message: this.billData.mobile_recipt_no,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.cancelBill();
          }
        }
      ]
    });
    await alert.present();
  }


  cancelBill() {
    this.apiCall.call(this.mobPay + 'cancleAssBill', { idMobilePay: this.billid }, data => {
      console.log(data);
      this.router.navigate(['/mybills']);
    });
  }

  reprint() {
    this.apiCall.call(this.urlPay + 'getReciptData', { id: this.billid }, dd => {
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
        ' A.Tax No : ' + dd[0].assessment_no + '\n' +
        ' PAID : Rs.' + dd[0].amount.toFixed(2) + '\n' +
        ' Date : ' + d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + '  '
        + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '\n' +
        ' User : ' + dd[0].user_username + '\n' +
        '------------------------------ \n \n \n \n  ';

      console.log(myText);

      this.print.sendToBluetoothPrinter(this.macAddress, myText);

    });
  }


}
