import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class StorService {

  constructor(private storage: Storage) { }

  setLocalData(key, val, next) {
    this.storage.set(key, val).then(result => {
      next(result);
    });
  }

  getLocalData(key, func) {
    this.storage.get(key).then(result => {
      func(result);
    }).catch(error => {
      func(null);
    });
  }
}
