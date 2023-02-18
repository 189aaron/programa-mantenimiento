import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public loginService:AuthServiceService,) { }

  id_token = localStorage.getItem('id_token');

  ngOnInit(): void {
  }

  logout(){
    return this.loginService.logout();
  }
  

}
