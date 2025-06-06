package com.example.demo.model.dto;

import java.time.LocalDateTime;

import com.example.demo.repository.entity.Itinerary;
import com.example.demo.repository.entity.Message;
import com.example.demo.repository.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageDTO {

	private Long id;
	private String text;
    private LocalDateTime created_at;
    private Long itineraryId;
    private Long userId;
	
    public static MessageDTO convertToDTO(Message message) {
        return MessageDTO.builder()
                .id(message.getId())
                .text(message.getText())
                .itineraryId(message.getItinerary().getId())
                .userId(message.getUser().getId())
                .created_at(message.getCreated_at())
                .build();
    }

    public static Message convertToEntity(MessageDTO dto, Itinerary itinerary, User user) {
        return Message.builder()
                .id(dto.getId())
                .text(dto.getText())
                .itinerary(itinerary)
                .user(user)
                .created_at(dto.getCreated_at() != null ? dto.getCreated_at() : LocalDateTime.now())
                .build();
    }
    
}
