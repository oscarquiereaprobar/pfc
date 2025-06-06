package com.example.demo.repository.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "trip")
public class Trip {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_itinerary", nullable = false)
    private Itinerary itinerary;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_transport")
    private Transport transport;

    @Column(nullable = false)
    private String origin_country;

    @Column(nullable = false)
    private String origin_city;

    @Column(nullable = false)
    private String destination_country;

    @Column(nullable = false)
    private String destination_city;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date start_date;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date finish_date;
	
}
