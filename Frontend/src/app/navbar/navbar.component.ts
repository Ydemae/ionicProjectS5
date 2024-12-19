import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SessionService } from '../session.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  @Input()
  public displayBackButton : boolean = false;

  @Output()
  public backEmitter = new EventEmitter<any>();

  constructor() { }

  goBack(){
    this.backEmitter.emit(null);
  }

  async ngOnInit(){};
}
