import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TransportService } from '../../services/transport.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transports.component.html',
  styleUrls: ['./transports.component.css']
})
export class TransportsComponent implements OnInit {
  transports: any[] = [];

  constructor(private transportService: TransportService, private router: Router) {}

  ngOnInit(): void {
    this.loadTransports();
  }

  loadTransports(): void {
    this.transportService.getAllTransports().subscribe({
      next: (data) => {
        this.transports = data;
      },
      error: (err) => {
        console.error('Error cargando transportes:', err);
      }
    });
  }

  nuevoTransporte(): void {
    this.router.navigate(['/transports/add']);
  }

  editarTransporte(id: number): void {
    this.router.navigate(['/transports/edit', id]);
  }

  borrarTransporte(id: number): void {
    Swal.fire({
      title: '¿Deseas borrar este transporte?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.transportService.deleteTransport(id).subscribe({
          next: () => {
            this.transports = this.transports.filter(t => t.id !== id);
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Transporte borrado correctamente',
              timer: 1500,
              showConfirmButton: false
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al borrar transporte'
            });
            console.error('Error al borrar transporte:', err);
          }
        });
      }
    });
  }
}
