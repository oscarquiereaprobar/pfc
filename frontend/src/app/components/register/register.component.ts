import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterComponent {

  usuario: any = {
    username: '',
    name: '',
    surname: '',
    password: ''
  };

  formData: FormData = new FormData();

  constructor(private authService: AuthService, private router: Router) {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('rol');
  }

  ngOnInit(): void { }

  registro(): void {
    this.formData = new FormData();
    this.formData.append('username', this.usuario.username);
    this.formData.append('name', this.usuario.name);
    this.formData.append('surname', this.usuario.surname);
    this.formData.append('password', this.usuario.password);
    this.formData.append('admin', 'false');

    this.authService.registro(this.formData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: '¡Ya puedes iniciar sesión!',
          timer: 1800,
          showConfirmButton: false
        });
        this.router.navigate(['/login']);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar el usuario. Intenta con otro nombre de usuario.'
        });
      }
    });
  }
}

