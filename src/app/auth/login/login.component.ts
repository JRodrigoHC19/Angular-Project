import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/@models/credentials.model';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginError: string = "";

  loginForm = this.formBuilder.group({
    email: [
      "rodrigo@gmail.com",
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      "rodrigo",
      [
        Validators.required
      ]
    ],
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void { }

  get email(){
    return this.loginForm.controls.email;
  }

  get password(){
    return this.loginForm.controls.password;
  }


  loginPress(){
    if (this.loginForm.valid){
      this.loginService.login(this.loginForm.value as Credentials).subscribe({
        // next: (answer) =>{ console.log(answer) },
        error: (errData: string) =>{
          console.log(errData);
          this.loginError = errData;
        },
        complete: () =>{
          console.log("Login Completo");
          this.router.navigateByUrl('lobby');
          this.loginForm.reset();     // <- resetea el formulario
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert("Usuario No Valido.")
    }
  }

}
