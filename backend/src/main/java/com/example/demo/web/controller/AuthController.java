package com.example.demo.web.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.UserDTO;
import com.example.demo.service.UserServiceImpl;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/registro")
    public HttpStatus register(@RequestParam("username") String username,
                               @RequestParam("name") String name,
                               @RequestParam("surname") String surname,
                               @RequestParam("password") String password,
                               @RequestParam("admin") Boolean admin) throws IOException {

        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(username);
        userDTO.setName(name);
        userDTO.setSurname(surname);
        userDTO.setPassword(password);
        userDTO.setAdmin(admin);

        userService.register(userDTO);

        return HttpStatus.OK;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        try {
            UserDTO userDTO = userService.login(username, password);
            return ResponseEntity.ok(userDTO);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas");
        }
    }
}

