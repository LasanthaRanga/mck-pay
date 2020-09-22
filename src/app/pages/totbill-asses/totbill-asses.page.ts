import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { StorService } from '../../services/stor.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-totbill-asses',
  templateUrl: './totbill-asses.page.html',
  styleUrls: ['./totbill-asses.page.scss'],
})
export class TotbillAssesPage implements OnInit {
  mobPay = environment.apiUrl + 'mobPay/';
  from = '';
  to = '';

  fyear; fmonth; fdate;
  tyear; tmonth; tdate;

  user;

  bills;
  total = 0.0;
  cash = 0.0;
  cheque = 0.0;
  constructor(private apiCall: ApicallService, private store: StorService) {

    const dateTime = new Date();

    this.fyear = dateTime.getFullYear();
    this.fmonth = dateTime.getMonth() + 1;
    this.fdate = dateTime.getDate();
    this.tyear = this.fyear;
    this.tmonth = this.fmonth;
    this.tdate = this.fdate;

    this.getLogUser();


  }


  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.user) {
      this.loadBillst();
      this.getTotal();
    }
  }

  getLogUser() {
    this.store.getLocalData('user', data => {
      this.user = data;
      console.log(this.user);
      this.loadBillst();
    });
  }


  loadBillst() {
    this.from = this.fyear + '-' + this.fmonth + '-' + this.fdate;
    this.to = this.tyear + '-' + this.tmonth + '-' + this.tdate;
    this.apiCall.call(this.mobPay + 'getAssBillToTot', { from: this.from, to: this.to, user: this.user.uid }, data => {
      this.bills = data;
      console.log(this.bills);
      this.getTotal();
    });
  }

  getTotal() {
    if (this.bills) {
      this.total = 0.0;
      this.cash = 0.0;
      this.cheque = 0.0;
      this.bills.forEach(e => {
        if (e.status === 0) {
          this.total += e.amount;
          if (e.pay_type === 1) {
            this.cash += e.amount;
          }
          if (e.pay_type === 2) {
            this.cheque += e.amount;
          }
        }
      });
    }

  }

  loadAll() {
    this.loadBillst();
  }




}
