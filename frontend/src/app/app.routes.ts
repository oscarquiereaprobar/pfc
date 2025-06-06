import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { MyItinerariesComponent } from './components/my-itineraries/my-itineraries.component';
import { ItineraryFormComponent } from './components/my-itineraries/form/form.component';
import { TripsComponent } from './components/my-itineraries/trips/trips.component';
import { TripFormComponent } from './components/my-itineraries/trips/form/form.component';
import { UsersComponent } from './components/users/users.component';
import { TransportsComponent } from './components/transports/transports.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserFormComponent } from './components/users/form/form.component';
import { UserViewComponent } from './components/users/view/view.component';
import { TransportFormComponent } from './components/transports/form/form.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

export const routes: Routes = [
  { path: '', component: GetStartedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  // 🔒 USER ONLY
  { path: 'itineraries', component: MyItinerariesComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'itineraries/add', component: ItineraryFormComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'itineraries/edit/:id', component: ItineraryFormComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'itineraries/:id/trips', component: TripsComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'itineraries/:id/trips/add', component: TripFormComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'itineraries/:id/trips/edit/:tripId', component: TripFormComponent, canActivate: [AuthGuard, UserGuard] },

  // 🔒 ADMIN ONLY
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'users/add', component: UserFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'users/edit/:id', component: UserFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'users/:id', component: UserViewComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'transports', component: TransportsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'transports/add', component: TransportFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'transports/edit/:id', component: TransportFormComponent, canActivate: [AuthGuard, AdminGuard] },

  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: 'unauthorized' }
];
