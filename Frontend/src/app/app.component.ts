import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SessionService } from './session.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  public history : Array<String> = [];

  constructor(
    private navController : NavController,
    private router : Router,
    private sessionService : SessionService
  ) {}

  async ngOnInit(){
    await this.sessionService.setSession("back", false);
    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationStart) {
        //Check if we're going back to know if we add it to the pile or not
        const back = await this.sessionService.getSession("back");

        if (!back){
          this.history.push(event.url);
        }
        else{
          await this.sessionService.setSession("back", false);
        }
      }
    });
  }

  popHistory(){
    this.history.pop();
  }

  async goBack(){
    await this.sessionService.setSession("back", true);
    this.popHistory();
    this.navController.back();
  }
}
