import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/@models/credentials.model';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginError: string = "";

  loginForm = this.formBuilder.group({
    email: [
      "",
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      "",
      [
        Validators.required
      ]
    ],
  });


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { }


  loginPress(){
    if (this.loginForm.valid){
      this.loginService.login(this.loginForm.value as Credentials)
        .subscribe({
          // next: (res) =>{ console.log(res) },
          error: (errData: string) =>{
            this.loginError = errData;
          },
          complete: () =>{
            console.log("Login Completo");
            this.router.navigateByUrl('lobby');
            this.loginForm.reset();
          }
        });
    } else {
      this.loginForm.markAllAsTouched();
      alert("Usuario No Valido.")
    }
  }

  // get email(){
  //   return this.loginForm.controls.email;
  // }

  // get password(){
  //   return this.loginForm.controls.password;
  // }
}
