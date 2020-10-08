import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { StorService } from '../../services/stor.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-mybills',
  templateUrl: './mybills.page.html',
  styleUrls: ['./mybills.page.scss'],
})
export class MybillsPage implements OnInit {

  mobPay = environment.apiUrl + 'mobPay/';
  from = '';
  to = '';

  fyear; fmonth; fdate;
  tyear; tmonth; tdate;

  user;

  bills;
  total = 0.0;



  constructor(private apiCall: ApicallService, private store: StorService) {

    const dateTime = new Date();

    this.fyear = dateTime.getFullYear();
    this.fmonth = dateTime.getMonth() + 1;
    this.fdate = dateTime.getDate();
    this.tyear = this.fyear;
    this.tmonth = this.fmonth;
    this.tdate = this.fdate;
    this.from = this.fyear + '-' + this.fmonth + '-' + this.fdate;
    this.to = this.tyear + '-' + this.tmonth + '-' + this.tdate;

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
    console.log(this.from);
    console.log(this.to);

    if (this.user) {
      this.apiCall.call(this.mobPay + 'getMyBill', { from: this.from, to: this.to, user: this.user.uid }, data => {
        this.bills = data;
        console.log(this.bills);
        this.getTotal();
      });
    }
  }

  getTotal() {
    this.total = 0.0;
    if (this.bills) {
      this.bills.forEach(e => {
        if (e.status !== 2) {
          this.total += e.amount;
        }
      });
    }
  }

  loadAll() {
    this.loadBillst();
  }

}
