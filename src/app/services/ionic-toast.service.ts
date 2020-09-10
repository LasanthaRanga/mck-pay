import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class IonicToastService {

  private myToast: any;

  constructor(public toast: ToastController) { }


  showToast(title, mg, colo) {
    this.myToast = this.toast.create({
      header: title,
      message: mg,
      position: 'top',
      duration: 3000,
      animated: true,
      color: colo,
      buttons: [
        // {
        //   side: 'start',
        //   icon: 'star',
        //   text: 'Favorite',
        //   handler: () => {
        //     console.log('Favorite clicked');
        //   }
        // },

        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ],

    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

  HideToast() {
    this.myToast = this.toast.dismiss();
  }
}
