import { Component, OnInit } from '@angular/core';
import { StorService } from '../../services/stor.service';
import { Router } from '@angular/router';
import { ApicallService } from '../../services/apicall.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private router: Router, private stor: StorService, private apiCall: ApicallService) { }

  ngOnInit() {
    this.logOut();
  }

  logOut() {
    this.stor.remove('user', data => {
      this.stor.remove('secret', d => {
        this.apiCall.authenticationState = new BehaviorSubject(false);
        //  this.logOut();
        window.location.replace('/login');
        //  this.router.navigate(['/home']);
      });
    });
  }

}
