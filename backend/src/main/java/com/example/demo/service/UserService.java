package com.example.demo.service;

import java.util.List;

import com.example.demo.model.dto.UserDTO;

public interface UserService {
    List<UserDTO> findAll();
    UserDTO findById(Long id);
    boolean existsByUsername(String username);
    UserDTO createUser(UserDTO userDTO);
    UserDTO updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);
    void changePassword(Long id, String currentPassword, String newPassword);
}

