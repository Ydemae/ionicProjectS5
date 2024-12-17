import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SessionService } from '../session.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  public displayBackButton = false;

  @Output()
  public backEmitter = new EventEmitter<any>();

  constructor(
    private sessionService : SessionService,
    private router : Router
  ) { }

  goBack(){
    this.backEmitter.emit(null);
  }

  async ngOnInit(){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.sessionService.getSession("HistoryNotEmpty").then(
          (historyNotEmpty) => {
            console.log(historyNotEmpty);
            if (historyNotEmpty){
              this.displayBackButton = true;
            }
            else{
              this.displayBackButton = false;
            }
          }
        )
        }
      }
    )
  };
}
