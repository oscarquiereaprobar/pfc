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

  countries: string[] = [];
  citiesOrigin: string[] = [];
  citiesDestination: string[] = [];

  filteredCountries: string[] = [];
  cities: string[] = [];
  filteredCities: string[] = [];

  filteredOriginCountries: string[] = [];
  filteredOriginCities: string[] = [];
  filteredDestinationCountries: string[] = [];
  filteredDestinationCities: string[] = [];

  allCountries: string[] = [];
  countryCityMap: { [country: string]: string[] } = {};

  isOwner: boolean = false;
  userId: number = 0;

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

    this.isOwner = false;
    this.itineraryService.getById(this.itineraryId).subscribe((itinerary: any) => {
      this.isOwner = itinerary.idUser === this.userId;

      const tripIdParam = this.route.snapshot.paramMap.get('tripId');
      if (tripIdParam) {
        this.isEdit = true;
        this.tripId = +tripIdParam;
        this.tripService.getById(this.tripId).subscribe(trip => {
          this.trip = trip;
          if (!this.isOwner) {
            alert('No tienes permiso para editar este viaje.');
            this.router.navigate([`/itineraries/`]);
          } else {
            if (trip.originCountry) {
              this.loadCities(trip.originCountry, 'origin', () => {
                this.filteredOriginCities = this.citiesOrigin;
              });
            }
            if (trip.destinationCountry) {
              this.loadCities(trip.destinationCountry, 'destination', () => {
                this.filteredDestinationCities = this.citiesDestination;
              });
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
      this.countries = [...this.allCountries];
      this.filteredCountries = [...this.allCountries];
      this.countryCityMap = {};
      this.filteredOriginCountries = [...this.allCountries];
      this.filteredDestinationCountries = [...this.allCountries];
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

  loadCities(country: string, type: 'origin' | 'destination', callback?: () => void): void {
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
          if (callback) callback();
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
      if (callback) callback();
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
