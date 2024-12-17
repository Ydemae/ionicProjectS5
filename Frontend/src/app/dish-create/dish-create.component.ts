import { Component, OnInit } from '@angular/core';
import { Dish } from '../types/dishType';
import { Router } from '@angular/router';
import { DishService } from '../dish.service';
import { SessionService } from '../session.service';
import { ToastService } from '../toast.service';

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

  constructor(
    private router : Router,
    private dishService : DishService,
    private sessionService : SessionService,
    private toastService : ToastService
  ) { }

  ngOnInit() {}

  receiveDishData(data : Dish){
    this.dishService.createDish(data).subscribe(
      {
        next: (response) => {
          console.log(response);
          if (response["code"] == 0){
            this.sessionService.setSession("Success", "Dish was successfully created");
            this.router.navigate(["/dish"]);
          }
          else{
            this.toastService.showErrorToast("An unexpected error occurred while creating dish")
          }
        },
        error: (error) => {
          this.toastService.showErrorToast("An unexpected error occurred while creating dish")
        }
      }
    )
  }

  cancel(){
    this.router.navigate(['/dish']);
  }

}
