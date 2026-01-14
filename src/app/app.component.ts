import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CatalogoService } from './services/catalogo.service';
import { Categoria } from './models/categoria.model';
import { Producto } from './models/producto.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {
  private catalogoService = inject(CatalogoService);
  private http = inject(HttpClient);

  isLoggedIn = false;
  credentials = { username: '', password: '' };
  
  categorias = signal<Categoria[]>([]);
  productos = signal<Producto[]>([]);

  ngOnInit() {
    // Si ya inició sesión antes, entrar directo
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
      this.cargarCategorias();
    }
  }

  login() {
    this.http.post<any>('http://localhost:8080/api/auth/login', this.credentials)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.isLoggedIn = true;
          this.cargarCategorias();
        },
        error: () => alert('Credenciales inválidas (admin/admin)')
      });
  }

  cargarCategorias() {
    this.catalogoService.getCategorias().subscribe({
      next: (data) => this.categorias.set(data),
      error: (err) => console.error("Error backend:", err)
    });
  }

  onCategoryChange(event: Event) {
    const id = (event.target as HTMLSelectElement).value;
    if (id) {
      this.catalogoService.getProductosPorCategoria(Number(id)).subscribe({
        next: (data) => this.productos.set(data)
      });
    } else {
      this.productos.set([]);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.productos.set([]);
  }
}