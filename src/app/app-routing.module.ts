import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from './auth/login/login.custom.guard';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { LobbyComponent } from './home/lobby/lobby.component';
import { ProductsComponent } from "./home/products/products.component";

const routes: Routes = [
  { path: '', component: LobbyComponent },

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
