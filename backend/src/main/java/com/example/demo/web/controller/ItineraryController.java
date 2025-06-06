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

import com.example.demo.model.dto.ItineraryDTO;
import com.example.demo.service.ItineraryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/itineraries")
@RequiredArgsConstructor
public class ItineraryController {

    private final ItineraryService itineraryService;

    @GetMapping("/user/{userId}")
    public List<ItineraryDTO> getItinerariesByUser(@PathVariable Long userId) {
        return itineraryService.findByUserId(userId);
    }
    
    @GetMapping("/public/{userId}")
    public List<ItineraryDTO> getPublicItineraries(@PathVariable Long userId) {
        return itineraryService.findPublicItinerariesExcludingUser(userId);
    }
    
    @GetMapping("/{id}")
    public ItineraryDTO getItinerary(@PathVariable Long id) {
        return itineraryService.findById(id);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<ItineraryDTO> createItinerary(@PathVariable Long userId, @RequestBody ItineraryDTO dto) {
        return new ResponseEntity<>(itineraryService.create(userId, dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ItineraryDTO updateItinerary(@PathVariable Long id, @RequestBody ItineraryDTO dto) {
        return itineraryService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItinerary(@PathVariable Long id) {
        itineraryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

