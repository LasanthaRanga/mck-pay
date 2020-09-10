import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApicallService } from '../../services/apicall.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-find-asses',
  templateUrl: './find-asses.page.html',
  styleUrls: ['./find-asses.page.scss'],
})
export class FindAssesPage implements OnInit {
  apiurl = environment.apiUrl + 'ass/';
  atdurl = environment.apiUrl + 'atd/';
  constructor(private apiCall: ApicallService, private router: Router, private stor: Storage, private dataService: DataService) { }
  idAssess;
  hasAssessData = false;
  isLoading = false;
  selectedAssessment = null;
  selectedBalance = null;
  amount = 0.00;
  assSelectedListToATD = [];

  wardList;
  streetList;
  selectedWard;
  selectedStreet;
  assno;
  assessmentArray;
  selected;

  ngOnInit() {
    this.loadWardCombo();
  }

  findAssessment() {
    this.isLoading = true;
    this.apiCall.call(this.apiurl + 'getDetails', { id: this.idAssess }, data => {
      // this.hasAssessData = true;
      this.selectedAssessment = data[0];
      console.log(this.selectedAssessment);
      // this.isLoading = false;
      this.getArrears();
    });
  }

  getArrears() {
    this.apiCall.call(this.apiurl + 'getArrears', { id: this.idAssess, year: 2020 }, data => {
      this.selectedBalance = data;
      this.hasAssessData = true;
      console.log(data);
      this.isLoading = false;
    });
  }

  goToAtd() {
    this.assSelectedListToATD.push(this.selectedAssessment);
    // this.router.navigate(['/atd-form', this.idAssess]);
    console.log(this.assSelectedListToATD);
  }



  loadWardCombo() {
    this.apiCall.call(this.apiurl + 'getWardList', {}, data => {
      console.log(data);
      this.wardList = data;
    });
  }

  loadStreetCombo() {
    this.apiCall.call(this.apiurl + 'getStreetList', { id: this.selectedWard.idWard }, data => {
      console.log(data);
      this.streetList = data;
    });
  }

  searchAssessment() {
    this.idAssess = 0;
    this.selectedAssessment = null;
    const obj = {
      ward: this.selectedWard.idWard,
      street: this.selectedStreet.idStreet,
      assno: this.assno
    };
    this.apiCall.call(this.apiurl + 'searchAssessment', obj, data => {
      console.log(data);
      this.assessmentArray = data;
    });
  }

  addAssessment(ass) {
    this.selected = ass;
    console.log(this.selected);
    this.assessmentArray = null;
    this.idAssess = this.selected.idAssessment;
    this.findAssessment();
  }

  goToPay() {
    this.dataService.setData('idAss', this.selectedAssessment);
    this.dataService.setData('amount', this.amount);
    this.router.navigate(['/pay-asses']);
  }



}
