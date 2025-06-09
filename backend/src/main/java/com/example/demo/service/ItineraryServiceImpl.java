package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.dto.ItineraryDTO;
import com.example.demo.repository.dao.ItineraryRepository;
import com.example.demo.repository.dao.UserRepository;
import com.example.demo.repository.entity.Itinerary;
import com.example.demo.repository.entity.User;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ItineraryServiceImpl implements ItineraryService {
    @Autowired private ItineraryRepository itineraryRepository;
    @Autowired private UserRepository userRepository;

    @Override
    public List<ItineraryDTO> findByUserId(Long userId) {
        return itineraryRepository.findByUserId(userId)
                .stream()
                .map(ItineraryDTO::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ItineraryDTO> findPublicItinerariesExcludingUser(Long userId) {
        return itineraryRepository.findByUserIdNot(userId)
                .stream()
                .map(ItineraryDTO::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public ItineraryDTO findById(Long id) {
        return itineraryRepository.findById(id)
                .map(ItineraryDTO::convertToDTO)
                .orElseThrow(() -> new EntityNotFoundException("Itinerary not found"));
    }

    @Override
    public ItineraryDTO create(Long userId, ItineraryDTO dto) {
        User user = userRepository.findById(userId) .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + userId));
        return ItineraryDTO.convertToDTO(
            itineraryRepository.save(ItineraryDTO.convertToEntity(dto, user))
        );
    }

    @Override
    public ItineraryDTO update(Long id, ItineraryDTO dto) {
        Itinerary itinerary = itineraryRepository.findById(id).orElseThrow();
        itinerary.setName(dto.getName());
        itinerary.setStart_date(dto.getStartDate());
        itinerary.setEnd_date(dto.getEndDate());
        itinerary.setImage(dto.getImage());
        return ItineraryDTO.convertToDTO(itineraryRepository.save(itinerary));
    }

    @Override
    public void delete(Long id) {
        itineraryRepository.deleteById(id);
    }
}

