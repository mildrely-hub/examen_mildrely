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
  isLoading = false;
  errorMessage = '';

  onLogin() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/catalogo']);
      },
      error: (error) => {
        this.errorMessage = 'Usuario o contraseña incorrectos';
        this.isLoading = false;
      }
    });
  }
}