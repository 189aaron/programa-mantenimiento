import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-refresh-token',
  templateUrl: './refresh-token.component.html'
})
export class RefreshTokenComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: AuthServiceService) { }

  ngOnInit(): void {
    let session = localStorage.getItem('id_token');
    if (session == null || session == undefined) {
      this.router.navigate(['/login']);
    }
  }

  refreshToken(form: NgForm) {
    const email = form.value.email;
    this.loginService.refreshToken(email);
  }

}
