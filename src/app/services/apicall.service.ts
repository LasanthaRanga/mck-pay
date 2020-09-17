import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  authenticationState = new BehaviorSubject(false);
  user;
  TOKEN_KEY = 'secret';
  constructor(private http: HttpClient, private storage: Storage, private helper: JwtHelperService, private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  call(url, param, func) {
    this.http.post(url, param).subscribe(result => {
      func(result);
    }, error => {
      func(error);
    });
  }

  checkToken() {
    console.log('check tocken');
    this.storage.get(this.TOKEN_KEY).then(token => {
      if (token) {
        const decode = this.helper.decodeToken(token);
        const isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.user = decode;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(this.TOKEN_KEY);
          this.storage.remove('user');
        }
      }
    });
  }


}
