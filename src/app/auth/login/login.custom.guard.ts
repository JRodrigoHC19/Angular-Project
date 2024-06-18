import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from 'src/app/services/auth/login.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.isLoggedIn()){
      return true;
    } else {
      this.router.navigateByUrl("login");
      return false;
    }
  }

}
