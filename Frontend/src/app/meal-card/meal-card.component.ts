import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss'],
})
export class MealCardComponent  implements OnInit {

  @Input()
  public id! : number;

  @Input()
  public qt! : number;

  @Input()
  public kcal! : number;

  @Input()
  public prot! : number;

  @Input()
  public lip! : number;

  @Input()
  public glu! : number;

  @Input()
  public name! : string;

  public displayKcal! : number;
  public displayProt! : number;
  public displayLip! : number;
  public displayGlu! : number;


  @Output()
  public updateEmitter = new EventEmitter<any>();

  @Output()
  public deleteEmitter = new EventEmitter<number>();

  constructor(
    private toastService : ToastService
  ) { }

  ngOnInit() {
    this.calculateDisplayVals();
  }

  calculateDisplayVals(){
    this.displayKcal = this.round(this.kcal * (this.qt/100));
    this.displayProt = this.round(this.prot * (this.qt/100));
    this.displayLip = this.round(this.lip * (this.qt/100));
    this.displayGlu = this.round(this.glu * (this.qt/100));
  }

  onUpdate(){
    if (this.qt >= 0){
      this.calculateDisplayVals();
      this.emitUpdate();
    }
    else{
      this.toastService.showErrorToast("Quantity can't be lower than 1 gram");
    }
  }

  emitUpdate(){
    this.updateEmitter.emit({id : this.id, qt: this.qt});
  }

  emitDelete(){
    this.deleteEmitter.emit(this.id);
  }

  round(num : number) : number{
    return Math.round(num * 10) / 10;
  }

}
