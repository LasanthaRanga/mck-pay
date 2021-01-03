import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApicallService } from '../../services/apicall.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-find-shop',
  templateUrl: './find-shop.page.html',
  styleUrls: ['./find-shop.page.scss'],
})
export class FindShopPage implements OnInit {

  isLoading;
  apiurl = environment.apiUrl + 'shopRent/';
  offises; seletedOffice;
  buildings; selectedBuilding;
  flors; selectedFlors;
  sno;
  shops;

  constructor(private apiCall: ApicallService, private router: Router, private stor: Storage, private dataService: DataService) { }

  ngOnInit() {
    this.getOfiiceList();
  }


  getOfiiceList() {
    console.log("load office");
    this.isLoading = true;
    this.apiCall.call(this.apiurl + 'getAlloffice', {}, data => {
      this.offises = data;
    });
  }

  getBuildings() {
    console.log(this.seletedOffice);
    this.apiCall.call(this.apiurl + 'getAllBillding', { office: this.seletedOffice.idOffice }, data => {
      this.buildings = data;
    });
  }

  getFlor() {
    console.log(this.seletedOffice);
    this.apiCall.call(this.apiurl + 'getAllfloor', { bid: this.selectedBuilding.idsr_building }, data => {
      console.log(data);
      this.flors = data;
    });
  }

  getShops() {
    this.apiCall.call(this.apiurl + 'getShops', { fid: this.selectedFlors.idsr_flow, shop: this.sno }, data => {
      console.log(data);
      this.shops = data;
    });
  }

  goToPay(shop) {
    console.log(shop);
    this.dataService.setData('shop', shop.sr_shop_now_category_id);
    this.router.navigate(['/pay-shop']);
  }


}
