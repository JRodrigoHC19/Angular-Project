import { Component, OnDestroy, OnInit } from '@angular/core';

import { LoginService } from "../../../services/auth/login.service";
import { User } from 'src/@models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userMain?: User;

  constructor(private loginService: LoginService) { }


  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.loginService.UserRequest().subscribe({
        next: (ud) => {
          this.userMain = ud;
        }
      });
    }
  }

  ngOnDestroy(): void { }

  logOut(){
    this.loginService.logout();
  }
}
