import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  submitted = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: AuthServiceService) { }

  ngOnInit(): void {
    let session = localStorage.getItem('id_token');
    if (session != null || session != undefined) {
      this.router.navigate(['/home']);
    }

    /*this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });*/

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  get form() { return this.loginForm.controls; }

  login(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.loginService.login(email, password);
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    if(email != null && password != null){
      this.loginService.login(email, password);
    }
    
   
  }

}
