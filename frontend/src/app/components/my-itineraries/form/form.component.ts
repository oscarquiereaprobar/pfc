import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItineraryService } from '../../../services/itinerary.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-itinerary-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class ItineraryFormComponent implements OnInit {
  itinerary: any = {};
  isEdit = false;
  userId = 0;
  imageFile: File | null = null;
  previousImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itineraryService: ItineraryService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const storedUserId = sessionStorage.getItem('id');
    if (storedUserId) {
      this.userId = +storedUserId;
    }
    if (id) {
      this.isEdit = true;
      this.itineraryService.getById(+id).subscribe(i => {
        if (i.idUser !== this.userId) {
          Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'No tienes permiso para editar este itinerario.'
          });
          this.router.navigate(['/itineraries']);
        } else {
          this.itinerary = i;
          this.previousImage = i.image || null;
        }
      });
    }
  }

  onImageSelected(event: any): void {
    if (event?.target?.files && event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      if (!file) return;
      this.imageFile = file;
      const ext = file.name.split('.').pop() ?? 'png';
      const uniqueName = `img_${Date.now()}.${ext}`;

      if (this.isEdit && this.previousImage && this.previousImage.startsWith('img_')) {
        this.http.delete(`http://http://desplieguedaw-hhhsfvaxa0ggardh.spaincentral-01.azurewebsites.net/api/itineraries/imagen/${this.previousImage}`).subscribe();
      }

      const formData = new FormData();
      formData.append('file', file, uniqueName);

      this.http.post('http://http://desplieguedaw-hhhsfvaxa0ggardh.spaincentral-01.azurewebsites.net/api/itineraries/upload', formData, { responseType: 'text' })
        .subscribe({
          next: (res: any) => {
            if (typeof res === 'string') {
              this.itinerary.image = res;
              this.previousImage = res;
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Respuesta inesperada del servidor al subir la imagen'
              });
              this.itinerary.image = 'img_default.png';
            }
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo subir la imagen'
            });
            this.itinerary.image = 'img_default.png';
            console.error('Error al subir imagen:', err);
          }
        });
    }
  }

  save(): void {
    if (!this.itinerary.image) {
      this.itinerary.image = 'img_default.png';
    }

    const req = this.isEdit
      ? this.itineraryService.update(this.itinerary.id, this.itinerary)
      : this.itineraryService.create(this.userId, this.itinerary);

    req.subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: this.isEdit ? 'Actualizado' : 'Creado',
          text: this.isEdit ? 'Itinerario actualizado correctamente' : 'Itinerario creado correctamente',
          timer: 1500,
          showConfirmButton: false
        });
        this.router.navigate(['/itineraries']);
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar itinerario'
        });
        console.error('Error al guardar itinerario:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/itineraries']);
  }

  removeImage(): void {
    if (this.isEdit && this.itinerary.image && this.itinerary.image.startsWith('img_')) {
      this.http.delete(`http://http://desplieguedaw-hhhsfvaxa0ggardh.spaincentral-01.azurewebsites.net/api/itineraries/imagen/${this.itinerary.image}`).subscribe();
    }
    this.itinerary.image = 'img_default.png';
    this.imageFile = null;
    this.previousImage = null;
  }
}
