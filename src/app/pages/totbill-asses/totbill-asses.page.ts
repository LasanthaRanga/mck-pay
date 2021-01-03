import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { StorService } from '../../services/stor.service';
import { PrintService } from '../../services/print.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-totbill-asses',
  templateUrl: './totbill-asses.page.html',
  styleUrls: ['./totbill-asses.page.scss'],
})
export class TotbillAssesPage implements OnInit {
  mobPay = environment.apiUrl + 'mobPay/';
  mobPayTot = environment.apiUrl + 'mobPayTot/';
  mobprint = environment.apiUrl + 'mobprint/';
  from = '';
  to = '';

  fyear; fmonth; fdate;
  tyear; tmonth; tdate;

  user;

  bills;

  selectedBills = [];
  total = 0.0;
  cash = 0.0;
  cheque = 0.0;
  sabaName = '';
  macAddress = '';

  bluetoothList: any = [];
  selectedPrinter: any;

  totBills = [];


  constructor(private apiCall: ApicallService, private store: StorService, private print: PrintService) {

    const dateTime = new Date();

    this.fyear = dateTime.getFullYear();
    this.fmonth = dateTime.getMonth() + 1;
    this.fdate = dateTime.getDate();
    this.tyear = this.fyear;
    this.tmonth = this.fmonth;
    this.tdate = this.fdate;

    this.getLogUser();
    this.getName();

  }


  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.user) {
      this.loadBillst();
      this.getTotal();
    }
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


  getLogUser() {
    this.store.getLocalData('user', data => {
      this.user = data;
      console.log(this.user);
      this.loadBillst();
      this.getMacAddress();
    });
  }


  loadBillst() {
    this.from = this.fyear + '-' + this.fmonth + '-' + this.fdate;
    this.to = this.tyear + '-' + this.tmonth + '-' + this.tdate;
    this.apiCall.call(this.mobPay + 'getAssBillToTot', { from: this.from, to: this.to, user: this.user.uid }, data => {
      this.bills = data;
      console.log(this.bills);
      this.getTotal();
      this.getTotalBills();
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



  clickOnCashTotal() {
    if (this.bills) {
      this.total = 0.0;
      this.cash = 0.0;
      this.cheque = 0.0;
      this.bills.forEach(e => {
        if (e.status === 0) {
          this.total += e.amount;
          if (e.pay_type === 1) {
            this.selectedBills.push(e);
            this.cash += e.amount;
            console.log('--');

          }
          if (e.pay_type === 2) {
            this.cheque += e.amount;
          }
        }
      });


      console.log(this.selectedBills);
      console.log(this.total);
      console.log(this.cash);
      console.log(this.user);
      this.from = this.fyear + '-' + this.fmonth + '-' + this.fdate;
      this.apiCall.call(this.mobPayTot + 'makeAssess',
        {
          bills: this.selectedBills,
          total: this.cash,
          user: this.user,
          date: this.from,
          payType: 1,
          chno: ''
        }, data => {
          console.log('------------------');
          console.log(data);
          console.log('------------------');
          this.getTotalBills();
          this.bills = [];

        });


    }
  }

  getTotalBills() {
    this.apiCall.call(this.mobPayTot + 'totalBillByDate', { uid: this.user.uid, date: this.from }, data => {
      this.totBills = data;
      console.log(this.totBills);
    });
  }

  reprint(tb) {
    console.log(tb);

    const totalBill = this.sabaName + '\n' +
      '  Assessment Tax Collection\n' +
      '------------------------------ \n' +
      '  Barcord ID: ' + tb.idMobTot + '_' + 'M\n' +
      '  Receipt No: ' + tb.no + '\n' +
      '  Amount: Rs.' + tb.total.toFixed(2) + '\n' +
      '------------------------------ \n \n \n \n  ';
    this.print.sendToBluetoothPrinter(this.macAddress, totalBill);
  }

  


}
