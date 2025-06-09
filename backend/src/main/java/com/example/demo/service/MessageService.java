package com.example.demo.service;

import com.example.demo.model.dto.MessageDTO;

import java.util.List;

public interface MessageService {
    List<MessageDTO> getAllMessages();
	List<MessageDTO> getMessagesByItineraryId(Long itineraryId);
    MessageDTO createMessage(MessageDTO dto);
    void deleteMessage(Long id);
}

