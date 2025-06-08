import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  currentUserId: number = -1;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const id = sessionStorage.getItem('id');
    this.currentUserId = id ? +id : -1;
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.filter(user => user.id !== this.currentUserId);
      },
      error: (err) => {
        console.error('Error cargando usuarios:', err);
      }
    });
  }

  crearUsuario(): void {
    this.router.navigate(['/users/add']);
  }

  verUsuario(id: number): void {
    this.router.navigate(['/users', id]);
  }

  editarUsuario(id: number): void {
    this.router.navigate(['/users/edit', id]);
  }

  borrarUsuario(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de que deseas borrar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            this.users = this.users.filter(u => u.id !== id);
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Usuario borrado correctamente',
              timer: 1500,
              showConfirmButton: false
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error borrando usuario'
            });
            console.error('Error borrando usuario:', err);
          }
        });
      }
    });
  }
}
