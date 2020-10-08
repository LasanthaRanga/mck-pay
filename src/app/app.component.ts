import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorService } from 'src/app/services/stor.service';
import { ApicallService } from 'src/app/services/apicall.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public user;

  public loged = [
    // {
    //   title: 'Inbox',
    //   url: '/folder/Inbox',
    //   icon: 'mail'
    // },
    {
      title: 'Assessment',
      url: '/find-asses',
      icon: 'location'
    },
    {
      title: 'My Bills',
      url: '/mybills',
      icon: 'document-text'
    },
    {
      title: 'Create AT Total',
      url: '/totbill-asses',
      icon: 'receipt'
    },
    {
      title: 'Find Shop',
      url: '/find-shop',
      icon: 'search'
    },
    {
      title: 'Printers',
      url: '/printer',
      icon: 'print'
    },
    {
      title: 'Logout',
      url: '/logout',
      icon: 'log-out'
    }
  ];

  public notlog = [
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    }
  ];

  public appPages = [];
  // public labels = ['Family'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private stor: StorService,
    private apiCall: ApicallService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.apiCall.authenticationState.subscribe(status => {
        if (status) {
          this.appPages = this.loged;
        } else {
          this.appPages = this.notlog;
        }
      });


    });
  }


  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    this.getLogUser();
  }

  getLogUser() {
    this.stor.getLocalData('user', data => {
      this.user = data;
      console.log(this.user);
    });
  }


}
