import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripService } from '../../../../services/trip.service';
import { TransportService } from '../../../../services/transport.service';
import { LocationService } from '../../../../services/location.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService,
    private transportService: TransportService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.itineraryId = +this.route.snapshot.paramMap.get('id')!;
    this.trip.idItinerary = this.itineraryId;

    const tripIdParam = this.route.snapshot.paramMap.get('tripId');
    if (tripIdParam) {
      this.isEdit = true;
      this.tripId = +tripIdParam;
      this.tripService.getById(this.tripId).subscribe(trip => {
        this.trip = trip;
      });
    }

    this.transportService.getAllTransports().subscribe(data => {
      this.transports = data;
    });

    this.locationService.getCountries().subscribe(res => {
      this.allCountries = res.data.map((c: any) => c.name);
      this.countries = [...this.allCountries];
      this.filteredCountries = [...this.allCountries];
      this.countryCityMap = {};
    });
  }

  onCountryInput(value: string, type: 'origin' | 'destination'): void {
    const list = this.allCountries.filter(c => c.toLowerCase().includes(value.toLowerCase()));
    if (type === 'origin') {
      this.filteredOriginCountries = list;
      this.trip.originCountry = value;
      if (this.allCountries.includes(value)) {
        if (!this.countryCityMap[value]) {
          this.locationService.getCities(value).subscribe(res => {
            this.countryCityMap[value] = res.data || [];
            this.citiesOrigin = this.countryCityMap[value];
            this.filteredOriginCities = [...this.citiesOrigin];
          });
        } else {
          this.citiesOrigin = this.countryCityMap[value];
          this.filteredOriginCities = [...this.citiesOrigin];
        }
      } else {
        this.citiesOrigin = [];
        this.filteredOriginCities = [];
      }
    } else {
      this.filteredDestinationCountries = list;
      this.trip.destinationCountry = value;
      if (this.allCountries.includes(value)) {
        if (!this.countryCityMap[value]) {
          this.locationService.getCities(value).subscribe(res => {
            this.countryCityMap[value] = res.data || [];
            this.citiesDestination = this.countryCityMap[value];
            this.filteredDestinationCities = [...this.citiesDestination];
          });
        } else {
          this.citiesDestination = this.countryCityMap[value];
          this.filteredDestinationCities = [...this.citiesDestination];
        }
      } else {
        this.citiesDestination = [];
        this.filteredDestinationCities = [];
      }
    }
  }

  onCityInput(value: string, type: 'origin' | 'destination'): void {
    if (type === 'origin') {
      this.filteredOriginCities = this.citiesOrigin.filter(c => c.toLowerCase().includes(value.toLowerCase()));
      this.trip.originCity = value;
      const foundCountry = Object.keys(this.countryCityMap).find(country =>
        (this.countryCityMap[country] || []).includes(value)
      );
      if (foundCountry) {
        this.trip.originCountry = foundCountry;
        this.filteredOriginCountries = [foundCountry];
        this.citiesOrigin = this.countryCityMap[foundCountry];
        this.filteredOriginCities = this.citiesOrigin.filter(c => c.toLowerCase().includes(value.toLowerCase()));
      }
    } else {
      this.filteredDestinationCities = this.citiesDestination.filter(c => c.toLowerCase().includes(value.toLowerCase()));
      this.trip.destinationCity = value;
      const foundCountry = Object.keys(this.countryCityMap).find(country =>
        (this.countryCityMap[country] || []).includes(value)
      );
      if (foundCountry) {
        this.trip.destinationCountry = foundCountry;
        this.filteredDestinationCountries = [foundCountry];
        this.citiesDestination = this.countryCityMap[foundCountry];
        this.filteredDestinationCities = this.citiesDestination.filter(c => c.toLowerCase().includes(value.toLowerCase()));
      }
    }
  }

  loadCities(country: string, type: 'origin' | 'destination'): void {
    if (!this.countryCityMap[country]) {
      this.locationService.getCities(country).subscribe(res => {
        this.countryCityMap[country] = res.data || [];
        if (type === 'origin') {
          this.citiesOrigin = this.countryCityMap[country];
          this.filteredOriginCities = [...this.citiesOrigin];
        } else {
          this.citiesDestination = this.countryCityMap[country];
          this.filteredDestinationCities = [...this.citiesDestination];
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

  save(): void {
    if (this.isEdit && this.tripId !== null) {
      this.tripService.update(this.tripId, this.trip).subscribe({
        next: () => this.router.navigate([`/itineraries/${this.itineraryId}/trips`]),
        error: () => this.error = 'Error al actualizar el viaje'
      });
    } else {
      this.tripService.create(this.itineraryId, this.trip).subscribe({
        next: () => this.router.navigate([`/itineraries/${this.itineraryId}/trips`]),
        error: () => this.error = 'Error al crear el viaje'
      });
    }
  }

  cancelar(): void {
    this.router.navigate([`/itineraries/${this.itineraryId}/trips`]);
  }
}
