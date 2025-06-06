package com.example.demo.repository.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.repository.entity.Trip;

import jakarta.transaction.Transactional;

@Transactional
@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByItineraryId(Long itineraryId);
}
