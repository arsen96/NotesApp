import { CommonModule } from '@angular/common';
import { Component, Inject, Input, TemplateRef } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { NotesFormComponent } from '../notes-form/notes-form.component';
import { NoteActionsService } from '../note-actions.service';
import { SideBarItems, SidebarService } from '../services/sidebar.service';
import { isNoteTypeItemsExistPipe } from '../is-pinned-items-exist.pipe';

@Component({
  selector: 'app-manage-notes',
  standalone: true,
  imports: [CommonModule,MatCardModule,isNoteTypeItemsExistPipe,ManageNotesComponent, RouterOutlet,MatIconModule,SidebarComponent,HeaderComponent,MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,MatDividerModule],
  templateUrl: './manage-notes.component.html',
  styleUrl: './manage-notes.component.scss'
})
export class ManageNotesComponent {
  @Input() initialTemplate: TemplateRef<any>;
  filterNotes:Note[];

  public get NoteTypes(){
    return NoteTypes;
  }
  constructor(public dialog: MatDialog,public noteService:NoteActionsService,public sidebarService:SidebarService){
}

  ngOnInit(){
  }







}
