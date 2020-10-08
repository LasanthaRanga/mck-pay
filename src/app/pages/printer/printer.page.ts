import { Component, OnInit } from '@angular/core';
import { PrintService } from '../../services/print.service';
import { ApicallService } from '../../services/apicall.service';
import { StorService } from '../../services/stor.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-printer',
  templateUrl: './printer.page.html',
  styleUrls: ['./printer.page.scss'],
})
export class PrinterPage implements OnInit {
  mobprint = environment.apiUrl + 'mobprint/';
  user;
  bluetoothList: any = [];
  selectedPrinter: any;

  constructor(private apiCall: ApicallService, private store: StorService, private print: PrintService) {
    this.getLogUser();
    this.listPrinter();
  }

  ngOnInit() {
  }

  getLogUser() {
    this.store.getLocalData('user', data => {
      this.user = data;
      console.log(this.user);
    });
  }

  listPrinter() {
    try {
      this.print.searchBluetoothPrinter()
        .then(resp => {
          // List of bluetooth device list
          this.bluetoothList = resp;
          console.log(this.bluetoothList);
        });
    } catch (error) {
      console.log(error);
    }

  }

  selectPrinter(macAddress, n) {
    // Selected printer macAddress stored here
    this.selectedPrinter = macAddress;
    console.log(name);
    console.log(this.user.uid);
    this.apiCall.call(this.mobprint + 'assignPrinter', { uid: this.user.uid, mac: macAddress, name: n }, data => {
      console.log(data);
    });
  }

  printStuff() {
    // The text that you want to print
    const myText = "    Test Print Ok \n ------------------------------ \n \n \n \n  ";
    this.print.sendToBluetoothPrinter(this.selectedPrinter, myText);
  }

  updatePrinterDate() {
    console.log(this.user);
  }


}
