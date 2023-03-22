import { Component } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'programa_mantenimiento';
  
  constructor(private loginService: AuthServiceService) { }

  ngOnDestroy(){
    this.loginService.logout();
  }
}
