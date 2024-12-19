import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { DishService } from '../dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from '../types/dishType';
import { ToastService } from '../toast.service';
import { SessionService } from '../session.service';
import { DayMealsService } from '../day-meals.service';
import { RegisteredDayService } from '../registered-day.service';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss'],
})
export class DishDetailComponent  implements OnInit {

  private dishDetail : Dish | null = null;
  private isFetched : boolean = false;
  public showModal : boolean = false;
  public showDeactivationButton : boolean  = false;
  public showDeletionButton : boolean = false;
  public showActivationButton : boolean = false;

  public showNotFoundError = false;
  public modalTitle = "";
  public modalText = "";

  public showAddToMealsModal = false;
  public quantity = 100;
  public data_kcal! : number;
  public data_prot! : number;
  public data_lip! : number;
  public data_glu! : number;

  constructor(
    private dishService : DishService,
    private route : ActivatedRoute,
    private toastService : ToastService,
    private sessionService : SessionService,
    private router : Router,
    private dayMealsService : DayMealsService,
    private registeredDayService : RegisteredDayService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.dishService.getDishById(Number.parseInt(id!)).subscribe(
      {
        next: (response) => {
          this.dishDetail = response;
          if(this.dishDetail){
            this.updateAddToMealsData();
            this.isFetched = true;
          }
          else{
            this.showNotFoundError = true;
          }
        },
        error: (error) => {
          this.showNotFoundError = true;
        }
      }
    )
  }

  getDishDetail() : Dish{
    return this.dishDetail!;
  }

  getIsFetched() : boolean{
    return this.isFetched;
  }

  private formatDateToYmd(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

  addToMeals(){
    this.registeredDayService.dateExists(this.formatDateToYmd(new Date())).subscribe(
      {
        next: (response) => {

          //The day isn't registered
          if (response["code"] == 1){
            this.registeredDayService.create().subscribe({
              next: (response) => {
                if (response["id"] == -1){
                  this.toastService.showErrorToast("Unexpected error occurred when trying to create registered day");
                }
                else
                {
                  const registeredDayId = response["id"];

                  this.createMeal(registeredDayId);
                }
              },
              error: (error) => {
                this.toastService.showErrorToast("Unexpected error occurred when trying to create registered day");
              }
            })
          }
          //The day is registered
          else{
            const registeredDayId = response[0]["id"];
            
            this.createMeal(registeredDayId);
          }
        },
        error: (error) => {
          this.toastService.showErrorToast("Unexpected error occurred when trying to test existence of registered day");
        }
      }
    )
  }

  private createMeal(id : number){
    this.dayMealsService.create({
      "id" : 0,
      "dish" : this.dishDetail,
      "day" : id,
      "quantity" : this.quantity
    }).subscribe({
      next: (response) => {
        if (response["code"] == 0){
          this.hideAddToMealsModal();
          this.toastService.showSuccessToastWithLink(`The meal has been successfully registered.`);
        }
        else{
          this.toastService.showErrorToast("An unexpected error occurred while trying to add the meal");
        }
      },
      error : (error) => {
        this.toastService.showErrorToast("An unexpected error occurred while trying to add the meal");
      }
    })
  }

  deleteDish(){
    this.dishService.deleteDish(this.dishDetail!.id).subscribe({
      next: (response) => {
        if (response["code"] == 0){
          this.sessionService.setSession("Success",`The dish ${this.dishDetail?.dish_name} was successfully deleted`);
          this.router.navigate(['/dish']);
        }
        else if (response["code"] == 2){
          this.toastService.showWarningToast("The dish couldn't be deleted since it is in a meal, please deactivate it instead");
        }
        else{
          this.toastService.showErrorToast("Unexpected error occurred when trying to delete dish.")
        }
      },
      error: (error) => {
        this.toastService.showErrorToast("Unexpected error occurred when trying to delete dish.")
      }
    })
  }

  deactivateDish(){
    this.dishService.deactivateDish(this.dishDetail!.id).subscribe({
      next: (response) => {
        if (response["code"] == 0){
          this.sessionService.setSession("Success",`The dish ${this.dishDetail?.dish_name} was successfully deactivated`);
          this.router.navigate(['/dish']);
        }
        else{
          this.toastService.showErrorToast("Unexpected error occurred when trying to deactivate dish.");
        }
      },
      error: (error) => {
        this.toastService.showErrorToast("Unexpected error occurred when trying to deactivate dish.");
      }
    })
  }

  reactivateDish(){
    this.dishService.activateDish(this.dishDetail!.id).subscribe({
      next: (response) => {
        if (response["code"] == 0){
          this.sessionService.setSession("Success",`The dish ${this.dishDetail?.dish_name} was successfully reactivated`);
          this.router.navigate(['/dish']);
        }
        else {
          this.toastService.showErrorToast("Unexpected error occurred when trying to reactivate dish");
        }
      },
      error: (error) => {
        this.toastService.showErrorToast("Unexpected error occurred when trying to reactivate dish.");
      }
    })
  }

  popDeletionConfirmationModal(){
    this.modalTitle = "Dish deletion"
    this.modalText = `You are about to permanently delete the dish ${this.dishDetail?.dish_name}, you won't be able to restore it later, are you sure about your decision ?`;
    this.showDeletionButton = true;
    this.showModal = true;
  }

  popDeactivationConfirmationModal(){
    this.modalTitle = "Dish deactivation"
    this.modalText = `You are about to deactivate the dish ${this.dishDetail?.dish_name}, you will be able to reactivate it anytime.`
    this.showDeactivationButton = true;
    this.showModal = true;
  }

  popReactivationConfirmationModal(){
    this.modalTitle = "Dish reactivation"
    this.modalText = `You are about to reactivate the dish ${this.dishDetail?.dish_name}, you will be able to reactivate it anytime.`
    this.showActivationButton = true;
    this.showModal = true;
  }

  popAddToMealsModal(){
    this.modalTitle = `Add ${this.dishDetail?.dish_name} to meals`
    this.showAddToMealsModal = true;
  }

  hideAddToMealsModal(){
    this.showAddToMealsModal = false;
  }

  hideModal(){
    this.showDeactivationButton = false;
    this.showDeletionButton = false;
    this.showActivationButton = false;
    this.showModal = false;
  }

  updateAddToMealsData(){
    this.data_kcal = Math.round(this.dishDetail!.dish_kcal * (this.quantity/100) * 10) / 10;
    this.data_prot = Math.round(this.dishDetail!.dish_prot * (this.quantity/100) * 10) / 10;
    this.data_lip = Math.round(this.dishDetail!.dish_lip * (this.quantity/100) * 10) / 10;
    this.data_glu = Math.round(this.dishDetail!.dish_glu * (this.quantity/100) * 10) / 10;
  }

}
