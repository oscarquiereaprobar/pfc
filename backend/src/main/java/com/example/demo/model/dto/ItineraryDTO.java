package com.example.demo.model.dto;

import java.util.Date;

import com.example.demo.repository.entity.Itinerary;
import com.example.demo.repository.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItineraryDTO {
    private Long id;
    private String name;
    private Long idUser;
    private Date startDate;
    private Date endDate;
    private String image;

    public static ItineraryDTO convertToDTO(Itinerary itinerary) {
        ItineraryDTO dto = new ItineraryDTO();
        dto.setId(itinerary.getId());
        dto.setName(itinerary.getName());
        dto.setIdUser(itinerary.getUser().getId());
        dto.setStartDate(itinerary.getStart_date());
        dto.setEndDate(itinerary.getEnd_date());
        dto.setImage(itinerary.getImage());
        return dto;
    }

    public static Itinerary convertToEntity(ItineraryDTO dto, User user) {
        Itinerary itinerary = new Itinerary();
        itinerary.setId(dto.getId());
        itinerary.setName(dto.getName());
        itinerary.setUser(user);
        itinerary.setStart_date(dto.getStartDate());
        itinerary.setEnd_date(dto.getEndDate());
        itinerary.setImage(dto.getImage());
        return itinerary;
    }
}
