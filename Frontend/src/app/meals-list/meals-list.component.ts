import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast.service';
import { DayMealsService } from '../day-meals.service';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
})
export class MealsListComponent {

  public allMealsFetched = false;

  public allMeals! : Array<any>;

  public allDays : Array<string> = [];
  public mealsByDay : Array<any> = [];
  public totalsByDay : Array<any> = [];

  public avgCalories = 0;
  public avgProt = 0;
  public avgLip = 0;
  public avgGlu = 0;

  constructor(
    private toastService : ToastService,
    private dayMealsService : DayMealsService
  ) { }

  ionViewWillEnter(){
    this.fetchAllMeals();
  }

  private formatDateTodmY(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  private round(num : number) : number{
    return Math.round(num * 10) / 10;
  }

  organizeData(){
    //Organizes fetched data in order to use it for display

    let sumCalories = 0;
    let sumProt = 0;
    let sumLip = 0;
    let sumGlu = 0;

    let dayCount = -1;
    for (let i = 0; i < this.allMeals.length; i++){
      sumCalories += this.allMeals[i].dish_kcal;
      sumProt += this.allMeals[i].dish_prot;
      sumLip += this.allMeals[i].dish_lip;
      sumGlu += this.allMeals[i].dish_glu;

      const tempDate = new Date(this.allMeals[i].day_date);
      this.allMeals[i].day_date = this.formatDateTodmY(tempDate);

      if (this.allDays.indexOf(this.allMeals[i].day_date) == -1){
        dayCount += 1;
        this.totalsByDay.push({
          kcal : 0,
          prot : 0,
          lip : 0,
          glu : 0});
        this.allDays.push(this.allMeals[i].day_date);
        this.mealsByDay.push([]);
      }
      this.totalsByDay[dayCount].kcal += this.round(this.allMeals[i].dish_kcal * (this.allMeals[i].quantity / 100));
      this.totalsByDay[dayCount].prot += this.round(this.allMeals[i].dish_prot * (this.allMeals[i].quantity / 100));
      this.totalsByDay[dayCount].lip += this.round(this.allMeals[i].dish_lip * (this.allMeals[i].quantity / 100));
      this.totalsByDay[dayCount].glu += this.round(this.allMeals[i].dish_glu * (this.allMeals[i].quantity / 100));

      this.mealsByDay[dayCount].push(this.allMeals[i]);
    }

    this.avgCalories = this.round(sumCalories/this.allMeals.length);
    this.avgProt = this.round(sumProt/this.allMeals.length);
    this.avgLip = this.round(sumLip/this.allMeals.length);
    this.avgGlu = this.round(sumGlu/this.allMeals.length);
  }


  update(data : any){
    const id = data["id"];
    const qt = data["qt"];
    this.dayMealsService.update(id, qt).subscribe({
      next: (response) => {
        if (response["code"] != 0){
          this.toastService.showErrorToast("Unexpected error occurred when trying to update meal quantity")
        }
      },
      error: (error) => {
        this.toastService.showErrorToast("Unexpected error occurred when trying to update meal quantity")
      }
    })
  }

  delete(id : number){
    this.dayMealsService.delete(id).subscribe({
      next: (response) => {
        if (response["code"] != 0){
          this.toastService.showErrorToast("Unexcpected error occurred when trying to delete meal");
        }
        else{
          this.toastService.showSuccessToast("Meal was successfully deleted, data will be reloaded");
          this.fetchAllMeals();
        }
      },
      error: (error) => {
        this.toastService.showErrorToast("Unexcpected error occurred when trying to delete meal");
      }
    })
  }
  
  fetchAllMeals(){
    this.allMeals = [];
    this.allDays = [];
    this.mealsByDay = [];
    this.totalsByDay = [];
    this.allMealsFetched = false;
    this.dayMealsService.getAll().subscribe({
      next: (response) => {
        this.allMeals = response;
        this.organizeData();
        this.allMealsFetched = true;
      },
      error: (error) => {
        console.error(error);
        this.toastService.showErrorToast("Unexpected error occurred when trying to fetch all meals. Please try again");
      }
    })
  }

}
