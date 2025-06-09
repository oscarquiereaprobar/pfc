import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { ItineraryService } from '../../services/itinerary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
messages: any[] = [];
  loading = false;

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private itineraryService: ItineraryService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading = true;
    this.messageService.getAll().subscribe({
      next: async (msgs) => {
        const userIds = Array.from(new Set(msgs.map((m: any) => m.userId)));
        const itineraryIds = Array.from(new Set(msgs.map((m: any) => m.itineraryId)));
        const userMap: { [key: number]: string } = {};
        const itineraryMap: { [key: number]: string } = {};

        await Promise.all(userIds.map(uid =>
          this.userService.getUserById(uid).toPromise().then(user => {
            userMap[uid] = user.username;
          })
        ));
        await Promise.all(itineraryIds.map(iid =>
          this.itineraryService.getById(iid).toPromise().then(it => {
            itineraryMap[iid] = it.name;
          })
        ));

        this.messages = msgs.map((m: any) => ({
          ...m,
          username: userMap[m.userId] || m.userId,
          itinerary: itineraryMap[m.itineraryId] || m.itineraryId
        }));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron cargar los mensajes.' });
      }
    });
  }

  deleteMessage(id: number): void {
    Swal.fire({
      title: '¿Eliminar mensaje?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.messageService.delete(id).subscribe(() => {
          this.messages = this.messages.filter(m => m.id !== id);
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'Mensaje eliminado correctamente',
            timer: 1500,
            showConfirmButton: false
          });
        });
      }
    });
  }
}
