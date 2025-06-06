package com.example.demo.model.dto;

import com.example.demo.repository.entity.Transport;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransportDTO {
	private Long id;
    private String type;
    
    public static TransportDTO convertToDTO(Transport transport) {
        TransportDTO dto = new TransportDTO();
        dto.setId(transport.getId());
        dto.setType(transport.getType());
        return dto;
    }

    public static Transport convertToEntity(TransportDTO dto) {
        Transport transport = new Transport();
        transport.setId(dto.getId());
        transport.setType(dto.getType());
        return transport;
    }
}
