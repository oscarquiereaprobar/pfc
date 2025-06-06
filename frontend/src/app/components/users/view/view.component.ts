import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class UserViewComponent implements OnInit {
  user: any;
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Error cargando el usuario:', err);
      }
    });
  }

  volver(): void {
    this.router.navigate(['/users']);
  }

  editar(id: number): void {
    this.router.navigate(['/users/edit', id]);
  }

  borrar(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.error('Error borrando el usuario:', err);
      }
    });
  }
}

