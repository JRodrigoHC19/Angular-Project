import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewCredentials } from 'src/@models/credentials.model';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerError: string = "";

  RegisterForm = this.formBuilder.group({
    name: [
      "",
      [ Validators.required ]
    ],
    email: [
      "",
      [ Validators.required, Validators.email ]
    ],
    password: [
      "",
      [ Validators.required ]
    ],
    password2: [
      "",
      [ Validators.required ]
    ],
    tc: [
      false,
      [ Validators.requiredTrue ]
    ]
  });


  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }


  RegisterPress(){
    if (this.RegisterForm.valid){
      this.loginService.createAccount(this.RegisterForm.value as NewCredentials)
        .subscribe({
          // next: (res) =>{ console.log(res) },
          error: (errData: string) => {
            this.registerError = errData;
          },
          complete: () => {
            console.log("Creacion de Cuenta Completada!");
            this.router.navigateByUrl('lobby');
            this.RegisterForm.reset();
          }
        });
    } else {
      this.registerError = "Las contrasenas no son validas o no coinciden";
      this.RegisterForm.markAllAsTouched();
      alert("Credenciales no Validas.");
    }
  }
}
