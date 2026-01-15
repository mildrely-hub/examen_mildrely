import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'catalogo', 
    component: CatalogoComponent,
    canActivate: [() => {
      const token = localStorage.getItem('token');
      if (token) return true;
      
      // Redirección usando window.location si no tenemos Router disponible
      window.location.href = '/login';
      return false;
    }]
  }
];