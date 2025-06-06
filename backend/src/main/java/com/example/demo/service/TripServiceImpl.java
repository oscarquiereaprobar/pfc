package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.dto.TripDTO;
import com.example.demo.repository.dao.ItineraryRepository;
import com.example.demo.repository.dao.TransportRepository;
import com.example.demo.repository.dao.TripRepository;
import com.example.demo.repository.entity.Itinerary;
import com.example.demo.repository.entity.Transport;
import com.example.demo.repository.entity.Trip;

@Service
public class TripServiceImpl implements TripService {
    @Autowired private TripRepository tripRepository;
    @Autowired private ItineraryRepository itineraryRepository;
    @Autowired private TransportRepository transportRepository;

    @Override
    public List<TripDTO> findByItineraryId(Long itineraryId) {
        return tripRepository.findByItineraryId(itineraryId)
                .stream()
                .map(TripDTO::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TripDTO findById(Long id) {
        return tripRepository.findById(id)
                .map(TripDTO::convertToDTO)
                .orElseThrow();
    }

    @Override
    public TripDTO create(Long itineraryId, TripDTO dto) {
        Itinerary itinerary = itineraryRepository.findById(itineraryId).orElseThrow();
        Transport transport = dto.getIdTransport() != null ? transportRepository.findById(dto.getIdTransport()).orElse(null) : null;
        return TripDTO.convertToDTO(
            tripRepository.save(TripDTO.convertToEntity(dto, itinerary, transport))
        );
    }

    @Override
    public TripDTO update(Long id, TripDTO dto) {
        Trip trip = tripRepository.findById(id).orElseThrow();
        trip.setOrigin_country(dto.getOriginCountry());
        trip.setOrigin_city(dto.getOriginCity());
        trip.setDestination_country(dto.getDestinationCountry());
        trip.setDestination_city(dto.getDestinationCity());
        trip.setStart_date(dto.getStartDate());
        trip.setFinish_date(dto.getFinishDate());
        trip.setTransport(dto.getIdTransport() != null ? transportRepository.findById(dto.getIdTransport()).orElse(null) : null);
        return TripDTO.convertToDTO(tripRepository.save(trip));
    }

    @Override
    public void delete(Long id) {
        tripRepository.deleteById(id);
    }
}

