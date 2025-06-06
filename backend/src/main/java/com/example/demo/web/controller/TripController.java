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

import com.example.demo.model.dto.TripDTO;
import com.example.demo.service.TripService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;

    @GetMapping("/itinerary/{itineraryId}")
    public List<TripDTO> getTripsByItinerary(@PathVariable Long itineraryId) {
        return tripService.findByItineraryId(itineraryId);
    }

    @GetMapping("/{id}")
    public TripDTO getTrip(@PathVariable Long id) {
        return tripService.findById(id);
    }

    @PostMapping("/itinerary/{itineraryId}")
    public ResponseEntity<TripDTO> createTrip(@PathVariable Long itineraryId, @RequestBody TripDTO dto) {
        return new ResponseEntity<>(tripService.create(itineraryId, dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public TripDTO updateTrip(@PathVariable Long id, @RequestBody TripDTO dto) {
        return tripService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long id) {
        tripService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

