import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TripService } from '../../../services/trip.service';
import { ItineraryService } from '../../../services/itinerary.service';
import { TransportService } from '../../../services/transport.service';
import { MessageService } from '../../../services/message.service';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit {
  trips: any[] = [];
  itineraryId!: number;
  itineraryName: string = '';
  transportCache: Map<number, string> = new Map();
  comments: any[] = [];
  newComment: string = '';
  isOwner: boolean = false;
  userId: number = 0;

  constructor(
    private tripService: TripService,
    private itineraryService: ItineraryService,
    private transportService: TransportService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.itineraryId = +this.route.snapshot.paramMap.get('id')!;
    this.userId = Number(sessionStorage.getItem('id'));
    this.itineraryService.getById(this.itineraryId).subscribe(it => {
      this.itineraryName = it.name;
      this.isOwner = it.idUser === this.userId;
    });
    this.loadTrips();
    this.loadComments();
  }

  loadTrips(): void {
    this.tripService.getByItineraryId(this.itineraryId).subscribe({
      next: (data) => {
        this.trips = data.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        this.enrichTripsWithTransportTypes();
      },
      error: (err) => {
        console.error('Error al cargar viajes:', err);
      }
    });
  }

  enrichTripsWithTransportTypes(): void {
    this.trips.forEach(trip => {
      if (trip.idTransport) {
        if (this.transportCache.has(trip.idTransport)) {
          trip.transportType = this.transportCache.get(trip.idTransport);
        } else {
          this.transportService.getTransport(trip.idTransport).subscribe(transport => {
            this.transportCache.set(trip.idTransport, transport.type);
            trip.transportType = transport.type;
          });
        }
      } else {
        trip.transportType = 'Sin asignar';
      }
    });
  }

  loadComments(): void {
    this.messageService.getByItinerary(this.itineraryId).subscribe(comments => {
      const userIds = Array.from(new Set(comments.map((c: any) => c.userId)))
        .filter(uid => uid !== undefined && uid !== null);
      const userMap: { [key: number]: string } = {};
      Promise.all(
        userIds.map(uid =>
          this.userService.getUserById(uid).toPromise().then(user => {
            userMap[uid] = user.username;
          })
        )
      ).then(() => {
        this.comments = comments.map((c: any) => {
          let adjustedCreatedAt = c.createdAt;
          if (c.createdAt) {
            const date = new Date(c.createdAt);
            date.setHours(date.getHours() + 2);
            adjustedCreatedAt = date.toISOString();
          }
          return {
            ...c,
            username: userMap[c.userId] || c.userId,
            createdAt: adjustedCreatedAt
          };
        });
      });
    });
  }

  addComment(): void {
    if (!this.newComment) return;
    const userId = Number(sessionStorage.getItem('id'));
    this.messageService.create({
    text: this.newComment,
    itineraryId: this.itineraryId,
    userId: userId
  }).subscribe(() => {
      this.newComment = '';
      this.loadComments();
    });
  }

  deleteComment(commentId: number): void {
    Swal.fire({
      title: '¿Deseas borrar este mensaje?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.messageService.delete(commentId).subscribe(() => {
          this.loadComments();
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'Mensaje borrado correctamente',
            timer: 1500,
            showConfirmButton: false
          });
        });
      }
    });
  }

  volver(): void {
    this.router.navigate([`/itineraries/`]);
  }

  nuevo(): void {
    this.router.navigate([`/itineraries/${this.itineraryId}/trips/add`]);
  }

  editar(id: number): void {
    this.router.navigate([`itineraries/${this.itineraryId}/trips/edit/${id}`]);
  }

  borrar(id: number): void {
    Swal.fire({
      title: '¿Deseas borrar este viaje?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.tripService.delete(id).subscribe(() => {
          this.trips = this.trips.filter(t => t.id !== id);
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'Viaje borrado correctamente',
            timer: 1500,
            showConfirmButton: false
          });
        });
      }
    });
  }
}