package com.example.demo.repository;

import com.example.demo.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Método para filtrar productos por el ID de la categoría [cite: 16]
    List<Producto> findByCategoriaId(Long categoriaId);
}