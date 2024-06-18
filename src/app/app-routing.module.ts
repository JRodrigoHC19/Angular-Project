import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from "./products/products.component";
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginGuard } from './auth/login/login.custom.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'login',component: LoginComponent },
  { path: 'register',component: RegisterComponent },

  { path: 'lobby',component: DashboardComponent, canActivate: [LoginGuard] },

  { path: 'products', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
