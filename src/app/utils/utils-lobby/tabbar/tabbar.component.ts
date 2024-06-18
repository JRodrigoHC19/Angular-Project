import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { LoginService } from 'src/app/services/auth/login.service';

import { User } from 'src/@models/user.model';


@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss']
})
export class TabbarComponent implements OnInit {
  @Output() nameComponent = new EventEmitter<string>();
  isAdmin: boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.loginService.UserRequest().subscribe({
        next: (data: User) => {
          this.isAdmin = data.is_admin ? true : false;
        }
      })
    }
  }


  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  enableComponent(child :string) {
    this.nameComponent.emit(child);
  }

  logOut() { this.loginService.logout() }

}
