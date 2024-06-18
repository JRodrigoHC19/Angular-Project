import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../services/database/database.service';
import { LoginService } from '../services/auth/login.service';

import { User } from 'src/@models/user.model';
import { Message } from 'src/@models/message.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  client: User = { id: -1, name: "", email: "", is_admin: 0 };
  hiddenComponent: boolean[] = [true, true, true];
  chat: Message[] = [];
  IamAdmin: boolean = false;

  constructor(
    private loginService: LoginService,
    private databaseService: DatabaseService
  ) {}

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  enableComponent(child: string) {
    switch (child) {
      case 'config':
        this.hiddenComponent = [false, true, true];
        break;
      case 'qrcode':
        this.hiddenComponent = [true, false, true];
        break;
      case 'users':
        this.hiddenComponent = [true, true, false];
        break;
    }
  }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.loginService.UserRequest().subscribe({
        next: (data: User) => {
          if (!data.is_admin) {
            this.databaseService.getChat_One(data.id).subscribe({
              next: (data) => this.chat = data
            });
          } else {
            this.IamAdmin = true;
          }
        },
      });
    }
  }

  showUserChat(id: number) {
    this.IamAdmin = false;
    this.databaseService.getUser_One(id).subscribe({
      next: (data: User[]) => { this.client = data[0] }
    });

    this.databaseService.getChat_One(id).subscribe({
      next: (data) => this.chat = data
    });
  }

}
