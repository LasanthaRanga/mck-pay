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
  selector: 'app-pay-shop',
  templateUrl: './pay-shop.page.html',
  styleUrls: ['./pay-shop.page.scss'],
})
export class PayShopPage implements OnInit {

  shopId;
  shopData;
  apiurl = environment.apiUrl + 'shopRent/';
  payList;

  total;


  constructor(
    private apiCall: ApicallService,
    private router: Router,
    private stor: StorService,
    private dataService: DataService,
    private print: PrintService,
    private toast: IonicToastService) { }

  ngOnInit() {
    this.shopId = this.dataService.getData('shop');
    console.log(this.shopId);
    this.getShopInfo();
    this.getShopPayInfo();
  }

  getShopInfo() {
    this.apiCall.call(this.apiurl + 'getShopInfo', { sid: this.shopId }, data => {
      this.shopData = data[0];
      console.log(this.shopData);
    });
  }

  getShopPayInfo() {
    const arr = [];
    this.apiCall.call(this.apiurl + 'getPayInfo', { sid: this.shopId }, res => {
      this.payList = res;
      this.payList.forEach(data => {
        const xx = {
          FB: data.FB,
          LYFB: data.LYFB,
          SE_Charge: data.SE_Charge,
          month: data.month,
          sr_shop_arrears_bal: data.sr_shop_arrears_bal,
          sr_shop_last_year_arrears_bal: data.sr_shop_last_year_arrears_bal,
          sr_shop_proc_id: data.sr_shop_proc_id,
          sr_shop_proc_month: data.sr_shop_proc_month,
          sr_shop_proc_year: data.sr_shop_proc_year,
          sr_shop_rental_tot_bal: data.sr_shop_rental_tot_bal,
          tot: data.tot,
          isSelect: false,
          canSelect: true,
          status: 0
        };
        arr.push(xx);
      });
      this.payList = arr;
      console.log(this.payList);
      this.manageMonth();
    });
  }

  selectAllMonths() {
    this.payList.forEach(element => {
      element.isSelect = true;
    });
    this.manageMonth();
  }

  unselectAllMonths() {
    this.payList.forEach(element => {
      element.isSelect = false;
    });
    this.manageMonth();
  }

  manageMonth() {
    let isSelectedPriviars = true;
    let findUnSelected = false;

    this.payList.forEach(element => {
      if (isSelectedPriviars) {
        element.canSelect = true;
      } else {
        element.canSelect = false;
      }

      if (!element.isSelect || findUnSelected) {
        findUnSelected = true;
        element.isSelect = false;
      }

      isSelectedPriviars = element.isSelect;
    });
    this.getTotal();
  }

  getTotal() {
    let value = 0;
    this.payList.forEach(element => {
      if (element.isSelect) {
        value += element.tot;
      }
    });
    this.total = value;
  }


}
