package com.example.demo.repository.dao;

import com.example.demo.repository.entity.Message;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Transactional
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByItineraryId(Long itineraryId);
}
