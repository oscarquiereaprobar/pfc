import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-started',
  imports: [],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.css'
})
export class GetStartedComponent {

  constructor(private router: Router) {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('rol');
  }

  register(): void {
    this.router.navigate(['/register']);
  }

  login(): void {
    this.router.navigate(['/login']);
  }

}
