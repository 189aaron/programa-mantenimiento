import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: AuthServiceService) { }

  ngOnInit(): void {
    let session = localStorage.getItem('id_token');
    if(session != null || session != undefined){
      this.router.navigate(['/home']);
    }
  }

  login(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.loginService.login(email, password);
  }

}
