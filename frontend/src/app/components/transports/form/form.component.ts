import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransportService } from '../../../services/transport.service';

@Component({
  selector: 'app-transport-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class TransportFormComponent implements OnInit {
  transport: any = { type: '', name: '' };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transportService: TransportService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.transportService.getTransportById(+id).subscribe(t => {
        this.transport = t;
      });
    }
  }

  saveTransport(): void {
    const req = this.isEdit
      ? this.transportService.updateTransport(this.transport.id, this.transport)
      : this.transportService.createTransport(this.transport);

    req.subscribe({
      next: () => this.router.navigate(['/transports']),
      error: (err) => console.error('Error guardando transporte:', err)
    });
  }

  cancel(): void {
    this.router.navigate(['/transports']);
  }
}

