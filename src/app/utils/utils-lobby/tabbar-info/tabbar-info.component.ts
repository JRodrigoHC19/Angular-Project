import { FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabbar-info',
  templateUrl: './tabbar-info.component.html',
  styleUrls: ['./tabbar-info.component.scss']
})
export class TabbarInfoComponent {
  @Input() hiddenChilden: boolean[] = [true, true, true];
  @Output() suiEvent = new EventEmitter<number>();

  hiddenConfigChilden: boolean[] = [false, true, true, true];
  formErrors: string = "";

  form = this.formBuilder.group({
    password: [ '', [
      Validators.required, Validators.minLength(8)
    ]],
    password2: [ '', [
      Validators.required, Validators.minLength(8)
    ]],
  });

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  enable_Children(hiddenChildren: boolean[]){
    this.hiddenConfigChilden = [true, ...hiddenChildren]
  }

  backPage(){
    this.hiddenConfigChilden = [false, true, true, true];
  }

  getUserId(id: number) { this.suiEvent.emit(id) }

  changePassword() {
    let pwd = this.form.controls.password.value;
    let pwd2 = this.form.controls.password2.value;
    if (this.form.valid && pwd == pwd2) {
      const newPwd = { password: pwd ?? '', password2: pwd2 ?? '' };
      this.loginService.changePassword(newPwd).subscribe({
        // next: () =>
      });
      this.router.navigateByUrl("/")
    } else {
      this.formErrors = "Las contrasenas no son validas o no coinciden";
    }
  }
}
