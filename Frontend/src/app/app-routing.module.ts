import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DishListComponent } from './dish-list/dish-list.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { DishCreateComponent } from './dish-create/dish-create.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dish',
    component: DishListComponent
  },
  {
    path: 'dish/:id',
    component: DishDetailComponent
  },
  {
    path: 'dish_create',
    component: DishCreateComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
