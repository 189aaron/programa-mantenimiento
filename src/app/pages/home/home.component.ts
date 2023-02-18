import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  userAdministrador: boolean = true;//Solo para administradores
  superUsuario: boolean = true;//exclusivo superUsuario, no admins

  constructor(
    private router: Router) { }

  ngOnInit(): void {
    let session = localStorage.getItem('id_token');
    if(session == null || session == undefined){
      this.router.navigate(['/login']);
    }
  }

}
