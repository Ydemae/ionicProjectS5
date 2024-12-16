import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { DishService } from '../dish.service';
import { ActivatedRoute } from '@angular/router';
import { Dish } from '../types/dishType';
import { ToastService } from '../toast.service';

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

  public showNotFoundError = false;
  public modalTitle = "";
  public modalText = "";

  constructor(
    private dishService : DishService,
    private route : ActivatedRoute,
    private toastService : ToastService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.dishService.getDishById(Number.parseInt(id!)).subscribe(
      {
        next: (response) => {
          this.dishDetail = response;
          if(this.dishDetail){
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

  addToMeals(){
    
  }

  deleteDish(){
    this.dishService.deactivateDish(this.dishDetail!.id).subscribe({
      next: (response) => {
        this.toastService.showErrorToast("Unexpected error occurred when trying to deactivate dish.")
      },
      error: (error) => {
        this.toastService.showErrorToast("Unexpected error occurred when trying to delete dish.")
      }
    })
  }

  deactivateDish(){
    this.dishService.deactivateDish(this.dishDetail!.id).subscribe({
      next: (response) => {
        
      },
      error: (error) => {
        this.toastService.showErrorToast("Unexpected error occurred when trying to deactivate dish.")
      }
    })
  }

  reactivateDish(){
    this.dishService.deactivateDish(this.dishDetail!.id).subscribe({
      next: (response) => {
        if (response["code"] == 0){
          //TO DO - Manage success
        }
        else {
          
        }
      },
      error: (error) => {
        this.toastService.showErrorToast("Unexpected error occurred when trying to deactivate dish.")
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
    this.showDeactivationButton = true;
    this.showModal = true;
  }

  hideModal(){
    this.showDeactivationButton = false;
    this.showDeletionButton = false;
    this.showModal = false;
  }

}
