import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

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
          } else {
            this.sendUpdate();
          }
        },
        error: () => this.error = 'Error al verificar el nombre de usuario.'
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
      },
      error: () => this.error = 'Error al actualizar el perfil.'
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
      },
      error: () => this.error = 'Contraseña actual incorrecta o error al cambiarla.'
    });
  }
}

