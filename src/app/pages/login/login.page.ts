import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { StorService } from '../../services/stor.service';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { IonicToastService } from '../../services/ionic-toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  TOKEN_KEY = 'secret';
  uname;
  pword;
  user;
  userUrl = environment.apiUrl + 'user/';



  constructor(
    private apiCall: ApicallService,
    private helper: JwtHelperService,
    private router: Router,
    private tost: IonicToastService,
    private stor: StorService
  ) { }
  ngOnInit() {

  }

  login() {
    console.log(this.uname + " -- " + this.pword);
    try {
      this.apiCall.call(this.userUrl + 'login', { uname: this.uname, pword: this.pword }, data => {
        console.log(data);
        if (data.status === 401) {
          this.tost.showToast('Faile', 'Username Or Password Wrong', 'danger');
        } else {
          this.stor.setLocalData(this.TOKEN_KEY, data['token'], dd => {
            // console.log(dd);
          });
          this.user = this.helper.decodeToken(data['token']);
          this.stor.setLocalData('user', this.user, (ddd => {
            this.tost.showToast('Success', 'Login Complted', 'success');
            //  console.log(ddd);
            this.apiCall.authenticationState.next(true);
            window.location.replace('/home');
          }));
        }
      });
    } catch (error) {
      console.log(error);
    }




  }

  getAll() {
    console.log(this.uname + " -- " + this.pword);
    this.apiCall.call(this.userUrl + 'getAll', { uname: this.uname, pword: this.pword }, data => {
      console.log(data);
    });
  }




}
