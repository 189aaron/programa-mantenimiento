import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  userAdministrador: boolean = false;//Solo para administradores
  superUsuario: boolean = false;//exclusivo superUsuario, no admins

  constructor(
    private router: Router) { }

  ngOnInit(): void {
    let session = localStorage.getItem('id_token');
    if(session == null || session == undefined){
      this.router.navigate(['/login']);
    }
    let superAdmin = localStorage.getItem('position');
    if( superAdmin == 'SUPERUSUARIO'){
      this.superUsuario = true;
    }else if( superAdmin == 'CAPITAN' || superAdmin == 'JEFE DE MAQUINAS'){
      this.userAdministrador = true;
    }
  }

}
