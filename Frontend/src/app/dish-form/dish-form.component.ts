import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dish } from '../types/dishType';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.scss'],
})
export class DishFormComponent  implements OnInit {

  @Input()
  public dishData! : Dish;

  public nameErrorMessage = "";
  public kcalErrorMessage = "";
  public protErrorMessage = "";
  public lipErrorMessage = "";
  public gluErrorMessage = "";

  @Output()
  public dataEmitter = new EventEmitter<Dish>();

  @Output()
  public cancelEmitter = new EventEmitter<any>();

  constructor(
    private toastService : ToastService
  ) { }

  ngOnInit() {}

  validateName(){
    this.nameErrorMessage = "";
    if (this.dishData.dish_name == ""){
      this.nameErrorMessage = "The dish name can't be null"
      return false;
    }
    return true;
  }

  validateFloat(float : number){
    if (float <= 0){
      return "Please provide a valid float (greater or equal than 0)";
    }
    return "";
  }

  validateKcal(){
    const errorMessage = this.validateFloat(this.dishData.dish_kcal);
    this.kcalErrorMessage = errorMessage;
    return errorMessage;
  }
  validateProt(){
    const errorMessage = this.validateFloat(this.dishData.dish_prot);
    this.protErrorMessage = errorMessage;
    return errorMessage;
  }
  validateLip(){
    const errorMessage = this.validateFloat(this.dishData.dish_lip);
    this.lipErrorMessage = errorMessage;
    return errorMessage;
  }
  validateGlu(){
    const errorMessage = this.validateFloat(this.dishData.dish_glu);
    this.gluErrorMessage = errorMessage;
    return errorMessage;
  }

  onSubmit(){
    if (this.validateName() == false || this.validateKcal() != "" || this.validateProt() != "" || this.validateLip() != "" || this.validateGlu() != ""){
      this.toastService.showErrorToast("Couldn't submit the data since it still contains some errors");
    }
    else{
      this.dataEmitter.emit(this.dishData);
    }
  }
  onCancel(){
    this.cancelEmitter.emit(null);
  }

}
