package com.example.demo.model.dto;

import java.util.Date;

import com.example.demo.repository.entity.Itinerary;
import com.example.demo.repository.entity.Transport;
import com.example.demo.repository.entity.Trip;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripDTO {
	private Long id;
    private Long idItinerary;
    private Long idTransport;
    private String originCountry;
    private String originCity;
    private String destinationCountry;
    private String destinationCity;
    private Date startDate;
    private Date finishDate;
    
    public static TripDTO convertToDTO(Trip trip) {
        TripDTO dto = new TripDTO();
        dto.setId(trip.getId());
        dto.setIdItinerary(trip.getItinerary().getId());
        dto.setIdTransport(trip.getTransport() != null ? trip.getTransport().getId() : null);
        dto.setOriginCountry(trip.getOrigin_country());
        dto.setOriginCity(trip.getOrigin_city());
        dto.setDestinationCountry(trip.getDestination_country());
        dto.setDestinationCity(trip.getDestination_city());
        dto.setStartDate(trip.getStart_date());
        dto.setFinishDate(trip.getFinish_date());
        return dto;
    }

    public static Trip convertToEntity(TripDTO dto, Itinerary itinerary, Transport transport) {
        Trip trip = new Trip();
        trip.setId(dto.getId());
        trip.setItinerary(itinerary);
        trip.setTransport(transport);
        trip.setOrigin_country(dto.getOriginCountry());
        trip.setOrigin_city(dto.getOriginCity());
        trip.setDestination_country(dto.getDestinationCountry());
        trip.setDestination_city(dto.getDestinationCity());
        trip.setStart_date(dto.getStartDate());
        trip.setFinish_date(dto.getFinishDate());
        return trip;
    }
}
