import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ItineraryService } from '../../services/itinerary.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-itineraries',
  standalone: true,
  templateUrl: './my-itineraries.component.html',
  styleUrls: ['./my-itineraries.component.css'],
  imports: [CommonModule, FormsModule],
})
export class MyItinerariesComponent implements OnInit {
  itineraries: any[] = [];
  publicItineraries: any[] = [];
  filteredPublicItineraries: any[] = [];
  filter: string = '';

  constructor(private itineraryService: ItineraryService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('id');
    if (userId) {
      this.itineraryService.getByUser(userId).subscribe((data) => {
        this.itineraries = [...data].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
      });

      this.itineraryService.getPublicItineraries(+userId).subscribe((data: any[]) => {
        const userIds = Array.from(new Set(data.map(it => it.idUser)));
        const userMap: { [key: number]: string } = {};
        
        Promise.all(
          userIds.map(uid =>
            this.userService.getUserById(uid).toPromise().then(user => {
              userMap[uid] = user.username;
            })
          )
        ).then(() => {
          const sortedData = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          this.publicItineraries = sortedData.map(it => ({
            ...it,
            username: userMap[it.idUser] || it.idUser
          }));
          this.filterPublicItineraries();
        });
      });
    }
  }

  filterPublicItineraries(): void {
    this.filteredPublicItineraries = this.publicItineraries
      .filter(itinerary =>
        itinerary.name.toLowerCase().includes(this.filter.toLowerCase())
      );
  }

  onFilterInput(): void {
    this.filterPublicItineraries();
  }

  nuevo(): void {
    this.router.navigate(['/itineraries/add']);
  }

  verViajes(id: number): void {
    this.router.navigate([`/itineraries/${id}/trips`]);
  }

  editar(id: number): void {
    this.router.navigate([`/itineraries/edit/${id}`]);
  }

  borrar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas borrar este itinerario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.itineraryService.delete(id).subscribe(() => {
          this.itineraries = this.itineraries.filter(i => i.id !== id);
          this.filterPublicItineraries();
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'Itinerario borrado correctamente',
            timer: 1500,
            showConfirmButton: false
          });
        });
      }
    });
  }
}