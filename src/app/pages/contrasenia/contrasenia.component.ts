import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-contrasenia',
  templateUrl: './contrasenia.component.html'
})
export class ContraseniaComponent implements OnInit {
  submitted = false;

  restablecerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: AuthServiceService) { }

  ngOnInit(): void {
    let session = localStorage.getItem('id_token');
    if (session == null || session == undefined) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.restablecerForm.invalid) {
      return;
    }

    const email = this.restablecerForm.controls['email'].value;
    const password = this.restablecerForm.controls['password'].value;

    if(email != null && password != null){
      this.loginService.changePassword(email, password);
    }
    
   
  }


}
