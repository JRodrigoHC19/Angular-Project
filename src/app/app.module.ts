import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { UtilsModule } from './utils/utils.module';
import { LoginGuard } from './auth/login/login.custom.guard';
import { ProductsComponent } from './home/products/products.component';

import { CookieService } from 'ngx-cookie-service';
import { LobbyComponent } from './home/lobby/lobby.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProductsComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ReactiveFormsModule,
    HttpClientModule,
    UtilsModule,
  ],
  providers: [LoginGuard, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
