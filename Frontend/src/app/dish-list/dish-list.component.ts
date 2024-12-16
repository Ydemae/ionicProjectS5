import { Component, OnInit } from '@angular/core';
import { DishService } from '../dish.service';
import { ToastService } from '../toast.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.scss'],
})
export class DishListComponent {

  private dishList : Array<any> = [];

  constructor(
    private dishService : DishService,
    private toastService : ToastService,
    private sessionService : SessionService
  ) { }

  async ionViewWillEnter() {
    this.dishService.getAllDishes().subscribe({
      next: (response) => {
        this.dishList = response;
      },
      error: (error) => {
        this.toastService.showErrorToast("An unexpected error occurred while trying to fetch dish list, if the problem persists please contact customer support.");
      }
    })

   
    this.sessionService.getSession("Success").then(
      (successMessage) => {
        console.log(successMessage);
        if (successMessage != null && successMessage != ""){
          this.toastService.showSuccessToast(successMessage);
          this.sessionService.removeSession("Success");
        }
      }
    )
  }

  getDishList() { return this.dishList };

}
