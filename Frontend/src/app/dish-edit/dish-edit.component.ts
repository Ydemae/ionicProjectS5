import { Component, OnInit } from '@angular/core';
import { Dish } from '../types/dishType';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DishService } from '../dish.service';
import { SessionService } from '../session.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-dish-edit',
  templateUrl: './dish-edit.component.html',
  styleUrls: ['./dish-edit.component.scss'],
})
export class DishEditComponent {

 public dishDetail! : Dish;
 public showNotFoundError : boolean = false;
 public isFetched : boolean = false;


   constructor(
     private router : Router,
     private dishService : DishService,
     private sessionService : SessionService,
     private toastService : ToastService,
     private route : ActivatedRoute
   ) { }
 

    ionViewWillEnter(): void {
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
 
   receiveDishData(data : Dish){
     this.dishService.updateDish(data).subscribe(
       {
         next: (response) => {
          console.log(response);
           if (response["code"] == 0){
             this.sessionService.setSession("Success", "Dish was successfully updated");
             this.router.navigate(["/dish"]);
           }
           else{
             this.toastService.showErrorToast("An unexpected error occurred while updating dish")
           }
         },
         error: (error) => {
           this.toastService.showErrorToast("An unexpected error occurred while updating dish")
         }
       }
     )
   }
 
   cancel(){
     this.router.navigate(['/dish']);
   }
}
