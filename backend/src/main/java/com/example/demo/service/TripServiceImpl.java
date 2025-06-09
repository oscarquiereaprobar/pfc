package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Comparator;
import java.util.Date;

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
        Trip savedTrip = tripRepository.save(TripDTO.convertToEntity(dto, itinerary, transport));
        updateItineraryDates(itinerary);
        return TripDTO.convertToDTO(savedTrip);
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
        Trip updatedTrip = tripRepository.save(trip);
        updateItineraryDates(trip.getItinerary());
        return TripDTO.convertToDTO(updatedTrip);
    }

    @Override
    public void delete(Long id) {
        Trip trip = tripRepository.findById(id).orElse(null);
        if (trip != null) {
            Itinerary itinerary = trip.getItinerary();
            tripRepository.deleteById(id);
            updateItineraryDates(itinerary);
        } else {
            tripRepository.deleteById(id);
        }
    }

    private void updateItineraryDates(Itinerary itinerary) {
        List<Trip> trips = tripRepository.findByItineraryId(itinerary.getId());
        if (trips.isEmpty()) return;

        Date minStart = trips.stream().min(Comparator.comparing(Trip::getStart_date)).get().getStart_date();
        Date maxEnd = trips.stream().max(Comparator.comparing(Trip::getFinish_date)).get().getFinish_date();

        boolean changed = false;
        if (!minStart.equals(itinerary.getStart_date())) {
            itinerary.setStart_date(minStart);
            changed = true;
        }
        if (!maxEnd.equals(itinerary.getEnd_date())) {
            itinerary.setEnd_date(maxEnd);
            changed = true;
        }
        if (changed) {
            itineraryRepository.save(itinerary);
        }
    }
}