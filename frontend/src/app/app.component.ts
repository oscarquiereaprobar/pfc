import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { HeaderService } from './services/header.service';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  showHeader = true;

  private routesWithoutHeader: string[] = [
    '/',
    '/login',
    '/register',
    '/unauthorized'
  ];

  constructor(private router: Router, private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.showHeader$.subscribe((show) => {
      this.showHeader = show;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const currentRoute = this.router.url;

        if (this.routesWithoutHeader.includes(currentRoute)) {
          this.headerService.setShowHeader(false);
        } else {
          this.headerService.setShowHeader(true);
        }
      });
  }
}