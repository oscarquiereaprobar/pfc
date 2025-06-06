import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TransportService } from '../../services/transport.service';

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
    if (confirm('¿Deseas borrar este transporte?')) {
      this.transportService.deleteTransport(id).subscribe({
        next: () => {
          this.transports = this.transports.filter(t => t.id !== id);
        },
        error: (err) => {
          console.error('Error al borrar transporte:', err);
        }
      });
    }
  }
}
