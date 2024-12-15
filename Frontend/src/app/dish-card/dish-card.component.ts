import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss'],
})
export class DishCardComponent  implements OnInit {

  @Input()
  name : string = "";

  @Input()
  imageUrl : string = "";

  @Input()
  id : number = 0;

  constructor() { }

  ngOnInit() {}

}
