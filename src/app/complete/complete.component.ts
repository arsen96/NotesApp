import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Note, NoteTypes } from '../interfaces/note';
import { ManageNotesComponent } from '../manage-notes/manage-notes.component';
import { NoteActionsService } from '../note-actions.service';
import { SideBarItems, SidebarService } from '../services/sidebar.service';
@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [CommonModule,MatCardModule,ManageNotesComponent, RouterOutlet,MatIconModule,SidebarComponent,HeaderComponent,MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,MatDividerModule],
  templateUrl: './complete.component.html',
  styleUrl: './complete.component.scss'
})
export class CompleteComponent {
  @Input() initialTemplate: TemplateRef<any>;
  public get NoteTypes(){
    return NoteTypes;
  }
  constructor(public noteService:NoteActionsService,public sidebarService:SidebarService){
  }

  ngOnInit(){
  }
}
