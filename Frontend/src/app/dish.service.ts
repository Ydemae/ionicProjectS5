import { Injectable } from '@angular/core';
import { ApiConnectionService } from './api-connection.service';
import { Observable } from 'rxjs';
import { Dish } from './types/dishType';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private apiConnection : ApiConnectionService ) { }

  getAllDishes(){
    return this.apiConnection.getApi("/dish")
  }

  getDishById(id : number) : Observable<Dish>{
    return this.apiConnection.getApi(`/dish/${id}`);
  }

  deleteDish(id : number){
    return this.apiConnection.getApi(`/dish/delete/${id}`);
  }

  deactivateDish(id : number){
    return this.apiConnection.getApi(`/dish/deactivate/${id}`);
  }

  activateDish(id : number){
    return this.apiConnection.getApi(`/dish/activate/${id}`);
  }
}
