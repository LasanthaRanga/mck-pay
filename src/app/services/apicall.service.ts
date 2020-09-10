import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private http: HttpClient) { }

  call(url, param, func) {
    this.http.post(url, param).subscribe(result => {
      func(result);
    }, error => {
      func(error);
    });
  }
}
