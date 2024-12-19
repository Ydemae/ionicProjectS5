import { Injectable } from '@angular/core';
import { ApiConnectionService } from './api-connection.service';

@Injectable({
  providedIn: 'root'
})
export class DayMealsService {

  constructor(private apiConnection : ApiConnectionService ) { }
  
  getToday(){
    return this.apiConnection.getApi("/day-meals/getToday");
  }

  getAll(){
    return this.apiConnection.getApi("/day-meals/getAll");
  }

  delete(id : number){
    return this.apiConnection.getApi(`/day-meals/delete/${id}`)
  }

  update(id : number, quantity : number){
    return this.apiConnection.postApi("/day-meals/update", {"id" : id, "quantity" : quantity});
  }

  create(data : any){
    return this.apiConnection.postApi("/day-meals/create", data);
  }

}
