package com.example.demo.service;

import java.util.List;

import com.example.demo.model.dto.TripDTO;

public interface TripService {
    List<TripDTO> findByItineraryId(Long itineraryId);
    TripDTO findById(Long id);
    TripDTO create(Long itineraryId, TripDTO dto);
    TripDTO update(Long id, TripDTO dto);
    void delete(Long id);
}

