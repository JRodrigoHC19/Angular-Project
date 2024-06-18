import { Component, OnDestroy, OnInit } from '@angular/core';

import { LoginService } from '../services/auth/login.service';
import { Message } from 'src/@models/message.model';
import { DatabaseService } from '../services/database/database.service';
import { User } from 'src/@models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  hiddenComponent: boolean[] = [true, true, true];
  chat!: Message[];
  userId?: number;

  constructor(
    private loginService: LoginService,
    private databaseService: DatabaseService
  ) { }

  isLoggedIn(): boolean { return this.loginService.isLoggedIn() }

  enableComponent(child :string) {
    switch (child) {
      case "config":
        this.hiddenComponent = [false, true, true];
        break;
      case "qrcode":
        this.hiddenComponent = [true, false, true];
        break;
      case "users":
        this.hiddenComponent = [true, true, false];
        break;
    }
  }

  ngOnInit(): void {
    console.log("Dashboard initialized!");

    if (this.isLoggedIn()) {
      this.loginService.UserRequest().subscribe({
        next: (data: User) => {
          if (!data.is_admin) {
            this.databaseService.getChat_One(data.id).subscribe({
              next: (data) => { this.chat = data }
            });
          }
        }
      })
    }
  }

  ngOnDestroy(): void { }

  showUserChat(id: number) {
    this.userId = id;
    this.databaseService.getChat_One(id).subscribe({
      next: (data) => { this.chat = data; }
    });
  }
}
