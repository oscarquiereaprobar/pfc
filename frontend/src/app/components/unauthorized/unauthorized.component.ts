import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css'],
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}
  goHome() {
    if (sessionStorage.getItem('rol') === 'true') {
      this.router.navigate(['/users']);
    } else if (sessionStorage.getItem('rol') === 'false') {
      this.router.navigate(['/itineraries']);
    } else {
      this.router.navigate(['/']);
    }
  }
}

