import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  categorias = signal<Categoria[]>([]);
  productos = signal<Producto[]>([]);

  ngOnInit() {
    this.catalogoService.getCategorias().subscribe(data => this.categorias.set(data));
  }

  onCategoriaChange(event: Event) {
    const id = (event.target as HTMLSelectElement).value;
    if (id) {
      this.catalogoService.getProductosPorCategoria(Number(id)).subscribe(data => this.productos.set(data));
    }
  }
}