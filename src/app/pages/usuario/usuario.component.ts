import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: AuthServiceService) { }

  ngOnInit(): void {
    let session = localStorage.getItem('id_token');
    if (session == null || session == undefined) {
      this.router.navigate(['/login']);
    }
  }

  registerUser(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const department_or_base = form.value.departamento;
    const ship = form.value.buque;
    const position = form.value.cargo;

    this.loginService.registerUser(name, email, password, department_or_base, ship, position);
  }

}
