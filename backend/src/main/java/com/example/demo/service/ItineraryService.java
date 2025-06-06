package com.example.demo.service;

import java.util.List;

import com.example.demo.model.dto.ItineraryDTO;

public interface ItineraryService {
    List<ItineraryDTO> findByUserId(Long userId);
    List<ItineraryDTO> findPublicItinerariesExcludingUser(Long userId);
    ItineraryDTO findById(Long id);
    ItineraryDTO create(Long userId, ItineraryDTO dto);
    ItineraryDTO update(Long id, ItineraryDTO dto);
    void delete(Long id);
}

