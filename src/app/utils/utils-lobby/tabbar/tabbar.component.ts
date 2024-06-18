import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/@models/user.model';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-tabbar',
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss']
})
export class TabbarComponent implements OnInit, OnDestroy {
  @Output() nameComponent = new EventEmitter<string>();
  isAdmin: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  enableComponent(child :string) {
    this.nameComponent.emit(child);
  }

  logOut() { this.loginService.logout() }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.loginService.UserRequest().subscribe({
        next: (data: User) => {
          this.isAdmin = data.is_admin ? true : false;
        }
      })
    }
  }

  ngOnDestroy(): void { }

}
