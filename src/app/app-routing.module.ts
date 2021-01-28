import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {HomeComponent} from './home/home.component';
import {OrderComponent} from './order/order.component';
import {ViewComponent} from "./view/view.component";
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'OrderForm', component: OrderComponent},
  {path: 'View', component: ViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
