import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('rol');
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        sessionStorage.setItem('id', response.id);
        sessionStorage.setItem('username', response.username);
        sessionStorage.setItem('rol', response.admin);

        if (sessionStorage.getItem('rol') === 'true') {
          this.router.navigate(['/users']).then(() => {
            window.location.reload();
          });
        } else {
          this.router.navigate(['/itineraries']).then(() => {
            window.location.reload();
          });
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Credenciales inválidas. Intente nuevamente.'
        });
        this.error = 'Credenciales inválidas. Intente nuevamente.';
      }
    });
  }
}