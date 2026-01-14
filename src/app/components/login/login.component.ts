import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  credentials = { username: '', password: '' };

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        // Guardamos el token para los puntos de seguridad
        localStorage.setItem('token', res.token);
        // Redirigimos al catálogo que ya tenías funcionando
        this.router.navigate(['/catalogo']);
      },
      error: () => alert('Usuario o clave incorrectos')
    });
  }
}