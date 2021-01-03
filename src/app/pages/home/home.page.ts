import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private apiCall: ApicallService) { }
  logo;
  ngOnInit() {
    this.getLogoName();
  }

  getLogoName() {
    this.apiCall.getValue("logo_path", data => {
      this.logo = data.value;
      console.log(this.logo);
    });

  }

}
