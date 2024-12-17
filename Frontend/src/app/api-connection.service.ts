import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {

  private baseApiUrl = "http://localhost:3000"

  constructor(private http : HttpClient) {}

  getApi(endpoint : string) : Observable<any>{
    console.log(this.baseApiUrl + endpoint);
    return this.http.get(this.baseApiUrl + endpoint);
  }

  postApi(endpoint: string, data : any) : Observable<any>{
    console.log(this.baseApiUrl + endpoint);
    console.log(data);
    return this.http.post(this.baseApiUrl + endpoint, data);
  }
}
