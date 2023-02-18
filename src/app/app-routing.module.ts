import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistrarEquipoComponent } from './pages/equipos/registrar-equipo/registrar-equipo.component';
import { ConsutarEquipoComponent } from './pages/equipos/consutar-equipo/consutar-equipo.component';
import { ListarUsuariosComponent } from './pages/usuario/listar-usuarios/listar-usuarios.component';
import { RefreshTokenComponent } from './pages/usuario/refresh-token/refresh-token.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UsuarioComponent },
  { path: 'home', component: HomeComponent },
  { path: 'equipos/registrar', component: RegistrarEquipoComponent },
  { path: 'equipos/consultar', component: ConsutarEquipoComponent },
  { path: 'usuarios/consultar', component: ListarUsuariosComponent },
  { path: 'usuarios/renviar_token', component: RefreshTokenComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }