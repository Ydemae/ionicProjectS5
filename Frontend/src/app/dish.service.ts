import { Injectable } from '@angular/core';
import { ApiConnectionService } from './api-connection.service';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private apiConnection : ApiConnectionService ) { }

  getAllDishes(){
    return this.apiConnection.getApi("/dish")
  }

  getDishById(id : number){
    return this.apiConnection.getApi(`/dish/${id}`);
  }
}
