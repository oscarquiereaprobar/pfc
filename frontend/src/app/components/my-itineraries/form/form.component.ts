import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItineraryService } from '../../../services/itinerary.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itineraryService: ItineraryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const storedUserId = sessionStorage.getItem('id');

    if (storedUserId) {
      this.userId = +storedUserId;
    } 

    if (id) {
      this.isEdit = true;
      this.itineraryService.getById(+id).subscribe(i => this.itinerary = i);
    }
  }


  save(): void {
    const req = this.isEdit
      ? this.itineraryService.update(this.itinerary.id, this.itinerary)
      : this.itineraryService.create(this.userId, this.itinerary);

    req.subscribe({
      next: () => this.router.navigate(['/itineraries']),
      error: err => console.error('Error al guardar itinerario:', err)
    });
  }

  cancel(): void {
    this.router.navigate(['/itineraries']);
  }
}
