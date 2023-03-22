import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  user_cargo:string = '';
  ship:string = '';

  constructor(public loginService:AuthServiceService,) { }

  id_token = localStorage.getItem('id_token');

  ngOnInit(): void {
    let cargoAux = localStorage.getItem('position');
    if(cargoAux != null){
      this.user_cargo = cargoAux;
    }
    let shipAux = localStorage.getItem('ship');
    if(shipAux != null){
      if (shipAux == 'AMBOS'){
        shipAux = 'AMBOS BUQUES';
      }
      this.ship = shipAux;
    }
    
  }

  logout(){
    return this.loginService.logout();
  }
  

}
