import { Injectable } from '@angular/core';
import { ApiConnectionService } from './api-connection.service';

@Injectable({
  providedIn: 'root'
})
export class RegisteredDayService {

  constructor(private apiConnection : ApiConnectionService ) { }

  create(){
    return this.apiConnection.getApi("/registered-day");
  }

  dateExists(date : string){
    return this.apiConnection.postApi(`/registered-day/exists`, {"date" : date});
  }
}
