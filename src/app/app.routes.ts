import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';

export const routes: Routes = [
  { path: 'notes', component: NotesComponent },
];

