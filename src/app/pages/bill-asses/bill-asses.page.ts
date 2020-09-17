import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallService } from '../../services/apicall.service';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-bill-asses',
  templateUrl: './bill-asses.page.html',
  styleUrls: ['./bill-asses.page.scss'],
})
export class BillAssesPage implements OnInit {
  mobPay = environment.apiUrl + 'mobPay/';
  billid;
  billData;

  constructor(private aRout: ActivatedRoute, private apiCall: ApicallService, private allert: AlertController, private router: Router) {
    this.billid = this.aRout.snapshot.paramMap.get('id');
    console.log(this.billid);
    this.getBill();
  }

  ngOnInit() {
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


}
