import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DishListComponent } from './dish-list/dish-list.component';
import { DishCardComponent } from './dish-card/dish-card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiConnectionService } from './api-connection.service';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { DishCreateComponent } from './dish-create/dish-create.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    DishListComponent,
    DishCardComponent,
    NavbarComponent,
    DishDetailComponent,
    DishCreateComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ApiConnectionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
