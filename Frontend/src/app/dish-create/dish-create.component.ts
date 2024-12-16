import { Component, OnInit } from '@angular/core';
import { Dish } from '../types/dishType';

@Component({
  selector: 'app-dish-create',
  templateUrl: './dish-create.component.html',
  styleUrls: ['./dish-create.component.scss'],
})
export class DishCreateComponent  implements OnInit {

  public DishData : Dish = {
    id : 0,
    dish_name : "",
    dish_kcal : 0,
    dish_prot : 0,
    dish_glu : 0,
    dish_lip : 0,
    image_url : "",
    active : true
  }

  constructor() { }

  ngOnInit() {}

  receiveDishData(data : Dish){

  }

}
