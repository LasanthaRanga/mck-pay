import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApicallService } from '../../services/apicall.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-pay-asses',
  templateUrl: './pay-asses.page.html',
  styleUrls: ['./pay-asses.page.scss'],
})
export class PayAssesPage implements OnInit {

  payType;

  constructor(private apiCall: ApicallService, private router: Router, private stor: Storage, private dataService: DataService) { }

  ngOnInit() {
  }

  payTypeChange() {
    console.log(this.payType);
  }

}
