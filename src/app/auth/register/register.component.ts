import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { NewCredentials } from 'src/@models/credentials.model';
import { LoginService } from 'src/app/services/auth/login.service';


const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const password2 = control.get('password2');

  if (password && password2 && password.value !== password2.value) {
    return { passwordsDoNotMatch: true };
  }
  return null;
};


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerError: string = "";

  RegisterForm = this.formBuilder.group({
    name: [
      "",
      [
        Validators.required
      ]
    ],
    email: [
      "username.1@gmail.com",
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      "username123",
      [
        Validators.required
      ]
    ],
    password2: [
      "username123",
      [
        Validators.required,
      ]
    ],
    tc: [
      false,
      [
        Validators.requiredTrue
      ]
    ]
  });


  constructor( private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }
  ngOnInit(): void { }


  RegisterPress(){
    if (this.RegisterForm.valid){
      this.loginService.createAccount(this.RegisterForm.value as NewCredentials).subscribe({
        // next: (answer) =>{ console.log(answer) },
        error: (errData: string) =>{
          console.log(errData);
          this.registerError = errData;
        },
        complete: () =>{
          console.log("Creacion de Cuenta Completada!");
          this.router.navigateByUrl('lobby');
          this.RegisterForm.reset();
        }
      });
    } else {
      this.RegisterForm.markAllAsTouched();
      alert("Usuario No Valido.")
    }
  }
}
