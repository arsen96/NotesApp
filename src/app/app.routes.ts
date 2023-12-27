import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: LoginComponent},
  { path: 'notes', component: NotesComponent,canActivate:[AuthGuard]},
  { path: 'profile', component: ProfileComponent,canActivate:[AuthGuard]},
];

