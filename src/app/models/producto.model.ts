import { Categoria } from './categoria.model';

export interface Producto {
    id: number;
    name: string;
    price: number;
    categoria: Categoria;
}