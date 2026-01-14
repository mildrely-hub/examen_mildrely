package com.example.demo.controller;

import com.example.demo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> user) {
        // En un examen real, aquí validarías contra la DB
        if ("admin".equals(user.get("username")) && "1234".equals(user.get("password"))) {
            String token = jwtUtil.generateToken(user.get("username"));
            return Map.of("token", token);
        }
        throw new RuntimeException("Credenciales inválidas");
    }
}