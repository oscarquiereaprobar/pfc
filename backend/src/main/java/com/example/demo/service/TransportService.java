package com.example.demo.service;

import java.util.List;

import com.example.demo.model.dto.TransportDTO;

public interface TransportService {
    List<TransportDTO> findAll();
    TransportDTO findById(Long id);
    TransportDTO create(TransportDTO dto);
    TransportDTO update(Long id, TransportDTO dto);
    void delete(Long id);
}

