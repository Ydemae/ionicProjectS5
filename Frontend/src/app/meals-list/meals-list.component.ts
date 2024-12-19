import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';
import { DayMealsService } from '../day-meals.service';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
})
export class MealsListComponent {

  public todayMealsFetched = false;
  public allMealsFetched = false;

  public todayMeals! : Array<any>;
  public allMeals! : Array<any>;

  constructor(
    private toastService : ToastService,
    private dayMealsService : DayMealsService
  ) { }

  ionViewWillEnter(){
    this.fetchTodayMeals();
    this.fetchAllMeals();
  }

  fetchTodayMeals(){
    this.dayMealsService.getToday().subscribe({
      next: (response) => {
        console.log(response);
        this.todayMeals = response;
        this.todayMealsFetched = true;
      },
      error: (error) => {
        console.error(error);
        this.toastService.showErrorToast("Unexpected error occurred when trying to fetch today's meals. Please try again");
      }
    })
  }
  fetchAllMeals(){
    this.dayMealsService.getAll().subscribe({
      next: (response) => {
        this.allMeals = response;
        this.allMealsFetched = true;
      },
      error: (error) => {
        console.error(error);
        this.toastService.showErrorToast("Unexpected error occurred when trying to fetch all meals. Please try again");
      }
    })
  }

}
