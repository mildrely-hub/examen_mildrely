import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8080/api';

  // Obtener categorías para el combo-box
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/categorias`);
  }

  // Filtrar productos por ID de categoría
  getProductosPorCategoria(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/productos/categoria/${id}`);
  }
}