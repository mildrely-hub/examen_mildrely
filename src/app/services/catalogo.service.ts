import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Categoria } from '../models/categoria.model';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api';

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`).pipe(
      catchError(error => {
        console.error('Error al obtener categorías:', error);
        return throwError(() => error);
      })
    );
  }

  getProductosPorCategoria(id: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/productos/categoria/${id}`).pipe(
      catchError(error => {
        console.error('Error al obtener productos:', error);
        return throwError(() => error);
      })
    );
  }
}