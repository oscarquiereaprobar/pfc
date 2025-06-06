package com.example.demo.web.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.dto.TransportDTO;
import com.example.demo.service.TransportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/transports")
@RequiredArgsConstructor
public class TransportController {

    private final TransportService transportService;

    @GetMapping
    public List<TransportDTO> getAllTransports() {
        return transportService.findAll();
    }

    @GetMapping("/{id}")
    public TransportDTO getTransportById(@PathVariable Long id) {
        return transportService.findById(id);
    }
    
    @PostMapping
    public ResponseEntity<TransportDTO> createTransport(@RequestBody TransportDTO dto) {
        return new ResponseEntity<>(transportService.create(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public TransportDTO updateTransport(@PathVariable Long id, @RequestBody TransportDTO dto) {
        return transportService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransport(@PathVariable Long id) {
        transportService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

