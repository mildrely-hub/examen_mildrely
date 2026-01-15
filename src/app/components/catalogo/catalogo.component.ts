import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogoService } from '../../services/catalogo.service';
import { Categoria } from '../../models/categoria.model';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './catalogo.component.html'
})
export class CatalogoComponent implements OnInit {
  private catalogoService = inject(CatalogoService);
  private router = inject(Router);
  
  categorias = signal<Categoria[]>([]);
  productos = signal<Producto[]>([]);
  isLoading = signal<boolean>(false);
  selectedCategory = signal<string>('');

  ngOnInit() {
    // Verificar autenticación al cargar el componente
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.loadCategorias();
  }

  loadCategorias() {
    this.isLoading.set(true);
    this.catalogoService.getCategorias().subscribe({
      next: (data) => {
        this.categorias.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        this.isLoading.set(false);
        // Si hay error de autenticación, redirigir al login
        if (err.status === 401 || err.status === 403) {
          this.logout();
        }
      }
    });
  }

  onCategoriaChange(event: Event) {
    const id = (event.target as HTMLSelectElement).value;
    this.selectedCategory.set(id);
    
    if (id) {
      this.isLoading.set(true);
      this.catalogoService.getProductosPorCategoria(Number(id)).subscribe({
        next: (data) => {
          this.productos.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error al cargar productos:', err);
          this.productos.set([]);
          this.isLoading.set(false);
        }
      });
    } else {
      this.productos.set([]);
    }
  }

  logout() {
    // Limpiar localStorage
    localStorage.removeItem('token');
    
    // Mostrar mensaje de confirmación
    alert('Sesión cerrada exitosamente');
    
    // Redirigir al login
    this.router.navigate(['/login']);
  }
}