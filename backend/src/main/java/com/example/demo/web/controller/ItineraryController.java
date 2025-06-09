package com.example.demo.web.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.dto.ItineraryDTO;
import com.example.demo.service.ItineraryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/itineraries")
@RequiredArgsConstructor
public class ItineraryController {

    private final ItineraryService itineraryService;

    @GetMapping("/user/{userId}")
    public List<ItineraryDTO> getItinerariesByUser(@PathVariable Long userId) {
        return itineraryService.findByUserId(userId);
    }
    
    @GetMapping("/public/{userId}")
    public List<ItineraryDTO> getPublicItineraries(@PathVariable Long userId) {
        return itineraryService.findPublicItinerariesExcludingUser(userId);
    }
    
    @GetMapping("/{id}")
    public ItineraryDTO getItinerary(@PathVariable Long id) {
        return itineraryService.findById(id);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<ItineraryDTO> createItinerary(@PathVariable Long userId, @RequestBody ItineraryDTO dto) {
        return new ResponseEntity<>(itineraryService.create(userId, dto), HttpStatus.CREATED);
    }
    
    private static final String IMAGE_DIR = "uploads/itinerary_images/";

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No file selected");
        }
        String ext = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String uniqueName = "img_" + System.currentTimeMillis() + "." + (ext != null ? ext : "png");
        try {
            Path dirPath = Paths.get(IMAGE_DIR).toAbsolutePath().normalize();
            Files.createDirectories(dirPath);
            Path filePath = dirPath.resolve(uniqueName);
            file.transferTo(filePath.toFile());
            return ResponseEntity.ok(uniqueName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar la imagen: " + e.getMessage());
        }
    }

    @GetMapping("/imagen/{nombreArchivo}")
    public ResponseEntity<Resource> obtenerImagen(@PathVariable String nombreArchivo) {
        try {
            String rutaBase = System.getProperty("user.dir");
            String rutaCompleta = rutaBase + File.separator + IMAGE_DIR;
            Path rutaArchivo = Paths.get(rutaCompleta).resolve(nombreArchivo).normalize();
            Resource recurso = new UrlResource(rutaArchivo.toUri());

            if (!recurso.exists()) {
                throw new RuntimeException("No se pudo encontrar el archivo: " + nombreArchivo);
            }

            // Detecta el tipo de imagen (jpg/png)
            String contentType = Files.probeContentType(rutaArchivo);
            MediaType mediaType = contentType != null && contentType.equals("image/png")
                    ? MediaType.IMAGE_PNG
                    : MediaType.IMAGE_JPEG;

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(recurso);
        } catch (Exception e) {
            return ResponseEntity.status(404).build();
        }
    }

    @PutMapping("/{id}")
    public ItineraryDTO updateItinerary(@PathVariable Long id, @RequestBody ItineraryDTO dto) {
        return itineraryService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItinerary(@PathVariable Long id) {
        itineraryService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @DeleteMapping("/imagen/{nombreArchivo}")
    public ResponseEntity<?> borrarImagen(@PathVariable String nombreArchivo) {
        try {
            String rutaBase = System.getProperty("user.dir");
            String rutaCompleta = rutaBase + File.separator + IMAGE_DIR;
            Path rutaArchivo = Paths.get(rutaCompleta).resolve(nombreArchivo).normalize();
            File file = rutaArchivo.toFile();
            if (file.exists() && file.isFile()) {
                file.delete();
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(404).body("Archivo no encontrado");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al borrar la imagen");
        }
    }
}

