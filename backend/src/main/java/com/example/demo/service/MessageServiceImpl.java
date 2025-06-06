package com.example.demo.service;

import com.example.demo.model.dto.MessageDTO;
import com.example.demo.repository.dao.ItineraryRepository;
import com.example.demo.repository.dao.MessageRepository;
import com.example.demo.repository.dao.UserRepository;
import com.example.demo.repository.entity.Itinerary;
import com.example.demo.repository.entity.Message;
import com.example.demo.repository.entity.User;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final ItineraryRepository itineraryRepository;
    private final UserRepository userRepository;

    @Override
    public List<MessageDTO> getMessagesByItineraryId(Long itineraryId) {
        return messageRepository.findByItineraryId(itineraryId).stream()
                .map(MessageDTO::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MessageDTO createMessage(MessageDTO dto) {
        Itinerary itinerary = itineraryRepository.findById(dto.getItineraryId())
                .orElseThrow(() -> new RuntimeException("Itinerario no encontrado"));

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Message message = MessageDTO.convertToEntity(dto, itinerary, user);
        Message saved = messageRepository.save(message);
        return MessageDTO.convertToDTO(saved);
    }

    @Override
    public void deleteMessage(Long id) {
        if (!messageRepository.existsById(id)) {
            throw new RuntimeException("Mensaje no encontrado");
        }
        messageRepository.deleteById(id);
    }
}

