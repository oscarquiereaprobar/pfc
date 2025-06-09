import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripService } from '../../../../services/trip.service';
import { TransportService } from '../../../../services/transport.service';
import { LocationService } from '../../../../services/location.service';
import { ItineraryService } from '../../../../services/itinerary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class TripFormComponent implements OnInit {
  trip: any = {
    originCity: '',
    originCountry: '',
    destinationCity: '',
    destinationCountry: '',
    startDate: '',
    finishDate: '',
    idTransport: null,
    idItinerary: null
  };

  itineraryId!: number;
  isEdit = false;
  tripId: number | null = null;
  transports: any[] = [];
  error = '';

  allCountries: string[] = [];
  countryCityMap: { [country: string]: string[] } = {};
  filteredOriginCountries: string[] = [];
  filteredOriginCities: string[] = [];
  filteredDestinationCountries: string[] = [];
  filteredDestinationCities: string[] = [];
  citiesOrigin: string[] = [];
  citiesDestination: string[] = [];

  isOwner: boolean = false;
  userId: number = 0;
  existingTrips: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService,
    private transportService: TransportService,
    private locationService: LocationService,
    private itineraryService: ItineraryService
  ) {}

  ngOnInit(): void {
    this.itineraryId = +this.route.snapshot.paramMap.get('id')!;
    this.trip.idItinerary = this.itineraryId;
    this.userId = Number(sessionStorage.getItem('id'));

    this.tripService.getByItineraryId(this.itineraryId).subscribe(trips => {
      this.existingTrips = trips;
    });

    this.itineraryService.getById(this.itineraryId).subscribe((itinerary: any) => {
      this.isOwner = itinerary.idUser === this.userId;
      const tripIdParam = this.route.snapshot.paramMap.get('tripId');
      if (tripIdParam) {
        this.isEdit = true;
        this.tripId = +tripIdParam;
        this.tripService.getById(this.tripId).subscribe(trip => {
          this.trip = trip;
          if (!this.isOwner) {
            Swal.fire({
              icon: 'error',
              title: 'Sin permiso',
              text: 'No tienes permiso para editar este viaje.'
            });
            this.router.navigate([`/itineraries/`]);
          } else {
            if (trip.originCountry) {
              this.loadCities(trip.originCountry, 'origin');
            }
            if (trip.destinationCountry) {
              this.loadCities(trip.destinationCountry, 'destination');
            }
          }
        });
      }
    });

    this.transportService.getAllTransports().subscribe(data => {
      this.transports = data;
    });

    this.locationService.getCountries().subscribe(res => {
      this.allCountries = res.data.map((c: any) => c.country);
      this.filteredOriginCountries = [...this.allCountries];
      this.filteredDestinationCountries = [...this.allCountries];
      this.countryCityMap = {};
    });
  }

  onCountryInput(value: string, type: 'origin' | 'destination'): void {
    const list = this.allCountries.filter(c => c.toLowerCase().includes(value.toLowerCase()));
    if (type === 'origin') {
      this.filteredOriginCountries = list;
      this.trip.originCountry = value;
      if (this.allCountries.includes(value)) {
        this.loadCities(value, 'origin');
      } else {
        this.citiesOrigin = [];
        this.filteredOriginCities = [];
      }
    } else {
      this.filteredDestinationCountries = list;
      this.trip.destinationCountry = value;
      if (this.allCountries.includes(value)) {
        this.loadCities(value, 'destination');
      } else {
        this.citiesDestination = [];
        this.filteredDestinationCities = [];
      }
    }
  }

  loadCities(country: string, type: 'origin' | 'destination'): void {
    this.error = '';
    if (!this.countryCityMap[country]) {
      this.locationService.getCities(country).subscribe({
        next: res => {
          this.countryCityMap[country] = res.data || [];
          if (type === 'origin') {
            this.citiesOrigin = this.countryCityMap[country];
            this.filteredOriginCities = [...this.citiesOrigin];
          } else {
            this.citiesDestination = this.countryCityMap[country];
            this.filteredDestinationCities = [...this.citiesDestination];
          }
        },
        error: err => {
          this.error = 'No se pudieron cargar las ciudades para este país. Puede que el servicio externo no esté disponible.';
        }
      });
    } else {
      if (type === 'origin') {
        this.citiesOrigin = this.countryCityMap[country];
        this.filteredOriginCities = [...this.citiesOrigin];
      } else {
        this.citiesDestination = this.countryCityMap[country];
        this.filteredDestinationCities = [...this.citiesDestination];
      }
    }
  }

  onCityInput(value: string, type: 'origin' | 'destination'): void {
    if (type === 'origin') {
      this.filteredOriginCities = this.citiesOrigin.filter(c => c.toLowerCase().includes(value.toLowerCase()));
      this.trip.originCity = value;
    } else {
      this.filteredDestinationCities = this.citiesDestination.filter(c => c.toLowerCase().includes(value.toLowerCase()));
      this.trip.destinationCity = value;
    }
  }

  save(): void {
    const newStart = new Date(this.trip.startDate);
    const newEnd = new Date(this.trip.finishDate);

    const tripsToCheck = this.isEdit && this.tripId
      ? this.existingTrips.filter(trip => trip.id !== this.tripId)
      : this.existingTrips;

    const overlap = tripsToCheck.some(trip => {
      const start = new Date(trip.startDate);
      const end = new Date(trip.finishDate);
      return (newStart < end && newEnd > start);
    });

    if (overlap) {
      Swal.fire({
        icon: 'error',
        title: 'Fechas solapadas',
        text: 'Ya existe un viaje en ese intervalo de fechas.'
      });
      return;
    }

    const allTrips = [...tripsToCheck, { ...this.trip }];
    allTrips.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    for (let i = 1; i < allTrips.length; i++) {
      const prevEnd = new Date(allTrips[i - 1].finishDate);
      const currStart = new Date(allTrips[i].startDate);
      if (currStart < prevEnd) {
        Swal.fire({
          icon: 'error',
          title: 'Orden incorrecto',
          text: 'El inicio de un viaje debe ser igual o posterior al fin del viaje anterior.'
        });
        return;
      }
    }

    if (this.isEdit && this.tripId !== null) {
      this.tripService.update(this.tripId, this.trip).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Viaje actualizado correctamente',
            timer: 1500,
            showConfirmButton: false
          });
          this.router.navigate([`/itineraries/${this.itineraryId}/trips`]);
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al actualizar el viaje'
          });
          this.error = 'Error al actualizar el viaje';
        }
      });
    } else {
      this.tripService.create(this.itineraryId, this.trip).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Creado',
            text: 'Viaje creado correctamente',
            timer: 1500,
            showConfirmButton: false
          });
          this.router.navigate([`/itineraries/${this.itineraryId}/trips`]);
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al crear el viaje'
          });
          this.error = 'Error al crear el viaje';
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate([`/itineraries/${this.itineraryId}/trips`]);
  }
}
