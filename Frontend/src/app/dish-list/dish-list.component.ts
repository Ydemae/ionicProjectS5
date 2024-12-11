import { Component, OnInit } from '@angular/core';
import { DishService } from '../dish.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.scss'],
})
export class DishListComponent  implements OnInit {

  private dishList : Array<any> = [];

  constructor(private dishService : DishService) { }

  ngOnInit() {
    this.dishService.getAllDishes().subscribe({
      next: (response) => {
        console.log(response);
        this.dishList = response;
      }
    })
  }

  getDishList() { return this.dishList };

}
