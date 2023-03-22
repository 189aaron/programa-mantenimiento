import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  user_cargo:string = '';

  constructor(public loginService:AuthServiceService,) { }

  id_token = localStorage.getItem('id_token');

  ngOnInit(): void {
    let cargoAux = localStorage.getItem('position');
    if(cargoAux != null || cargoAux != cargoAux){
      this.user_cargo = cargoAux;
    }
    
  }

  logout(){
    return this.loginService.logout();
  }
  

}
