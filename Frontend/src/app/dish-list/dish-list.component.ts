import { Component, OnInit } from '@angular/core';
import { DishService } from '../dish.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.scss'],
})
export class DishListComponent  implements OnInit {

  private dishList : Array<any> = [];

  constructor(
    private dishService : DishService,
    private toastService : ToastService
  ) { }

  ngOnInit() {
    this.dishService.getAllDishes().subscribe({
      next: (response) => {
        this.dishList = response;
      },
      error: (error) => {
        this.toastService.showErrorToast("An unexpected error occurred while trying to fetch dish list, if the problem persists please contact customer support.");
      }
    })
  }

  getDishList() { return this.dishList };

}
