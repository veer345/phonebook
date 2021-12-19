import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhoneserviceService {
  endpoint='https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts'
  constructor(private http:HttpClient) { }

  getPhonebookData()
  {
    return this.http.get<any>(this.endpoint)
    .pipe(map((result:any)=>{
      return result
    }))
  }
}
