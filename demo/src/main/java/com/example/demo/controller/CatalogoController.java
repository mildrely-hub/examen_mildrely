package com.example.demo.controller;

import com.example.demo.entity.Categoria;
import com.example.demo.entity.Producto;
import com.example.demo.service.CatalogoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Permite la conexión con Angular
public class CatalogoController {

    @Autowired
    private CatalogoService catalogoService;

    // Endpoint para cargar categorías en el select [cite: 4]
    @GetMapping("/categorias")
    public List<Categoria> listarCategorias() {
        return catalogoService.obtenerTodasLasCategorias();
    }

    // Endpoint para mostrar productos asociados a una categoría [cite: 4]
    @GetMapping("/productos/categoria/{id}")
    public List<Producto> listarProductosPorCategoria(@PathVariable Long id) {
        return catalogoService.obtenerProductosPorCategoria(id);
    }
}