import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class UserFormComponent implements OnInit {

  user: any = {
    username: '',
    name: '',
    surname: '',
    password: '',
    admin: false
  };

  isEdit = false;
  userId: number | null = null;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.userService.getUserById(+id).subscribe(user => {
        this.user = user;
      });
    }
  }

  saveUser(): void {
    if (this.isEdit && this.userId !== null) {
      this.userService.updateUser(this.userId, this.user).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Usuario actualizado correctamente',
            timer: 1500,
            showConfirmButton: false
          });
          this.router.navigate(['/users']);
        },
        error: (err) => {
          this.error = 'Error al actualizar usuario';
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al actualizar usuario'
          });
        }
      });
    } else {
      this.userService.createUser(this.user).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Creado',
            text: 'Usuario creado correctamente',
            timer: 1500,
            showConfirmButton: false
          });
          this.router.navigate(['/users']);
        },
        error: (err) => {
          this.error = 'Error al crear usuario';
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al crear usuario'
          });
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
