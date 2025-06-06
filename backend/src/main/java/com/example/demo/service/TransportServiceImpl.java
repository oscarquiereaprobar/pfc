package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.dto.TransportDTO;
import com.example.demo.repository.dao.TransportRepository;
import com.example.demo.repository.entity.Transport;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TransportServiceImpl implements TransportService {
    @Autowired private TransportRepository transportRepository;

    @Override
    public List<TransportDTO> findAll() {
        return transportRepository.findAll()
                .stream()
                .map(TransportDTO::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public TransportDTO findById(Long id) {
        Transport transport = transportRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Transporte no encontrado con ID: " + id));
        return TransportDTO.convertToDTO(transport);
    }

    
    @Override
    public TransportDTO create(TransportDTO dto) {
        return TransportDTO.convertToDTO(
            transportRepository.save(TransportDTO.convertToEntity(dto))
        );
    }

    @Override
    public TransportDTO update(Long id, TransportDTO dto) {
        Transport transport = transportRepository.findById(id).orElseThrow();
        transport.setType(dto.getType());
        return TransportDTO.convertToDTO(transportRepository.save(transport));
    }

    @Override
    public void delete(Long id) {
        transportRepository.deleteById(id);
    }
}

