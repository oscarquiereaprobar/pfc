import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {
    username: '',
    name: '',
    surname: '',
    admin: false
  };

  originalUsername = '';
  newPassword = '';
  currentPassword = '';
  error = '';
  success = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const id = sessionStorage.getItem('id');
    if (id) {
      this.userService.getUserById(+id).subscribe({
        next: (data) => {
          this.user = data;
          this.originalUsername = data.username;
        },
        error: () => {
          this.error = 'Error al cargar los datos del perfil.';
        }
      });
    }
  }

  updateProfile(): void {
    if (this.user.username !== this.originalUsername) {
      this.userService.checkUsernameExists(this.user.username).subscribe({
        next: (exists) => {
          if (exists) {
            this.error = 'El nombre de usuario ya está en uso.';
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'El nombre de usuario ya está en uso.'
            });
          } else {
            this.sendUpdate();
          }
        },
        error: () => {
          this.error = 'Error al verificar el nombre de usuario.';
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al verificar el nombre de usuario.'
          });
        }
      });
    } else {
      this.sendUpdate();
    }
  }

  sendUpdate(): void {
    this.userService.updateProfile(this.user).subscribe({
      next: () => {
        this.success = 'Perfil actualizado correctamente.';
        this.error = '';
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: 'Perfil actualizado correctamente.',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: () => {
        this.error = 'Error al actualizar el perfil.';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar el perfil.'
        });
      }
    });
  }

  changePassword(): void {
    const payload = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    };

    this.userService.changePassword(this.user.id, payload).subscribe({
      next: () => {
        this.success = 'Contraseña cambiada correctamente.';
        this.error = '';
        this.currentPassword = '';
        this.newPassword = '';
        Swal.fire({
          icon: 'success',
          title: 'Contraseña cambiada',
          text: 'Contraseña cambiada correctamente.',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: () => {
        this.error = 'Contraseña actual incorrecta o error al cambiarla.';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Contraseña actual incorrecta o error al cambiarla.'
        });
      }
    });
  }
}

