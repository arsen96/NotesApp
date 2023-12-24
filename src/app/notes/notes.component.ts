import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import {MatButtonModule} from '@angular/material/button';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatDialog,
} from '@angular/material/dialog'
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { Note, NoteTypes } from '../interfaces/note';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { SideBarItems, SidebarService } from '../services/sidebar.service';
import { ManageNotesComponent } from '../manage-notes/manage-notes.component';
import { CompleteComponent } from '../complete/complete.component';
import { ArchivedComponent } from '../archived/archived.component';
import { TagFormComponent } from '../tag-form/tag-form.component';
import { NoteActionsService } from '../note-actions.service';


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule,MatCardModule,TagFormComponent,ArchivedComponent,CompleteComponent,ManageNotesComponent, RouterOutlet,MatIconModule,SidebarComponent,HeaderComponent,MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,MatDividerModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  public searchResult:Note[] = new Array();
  public get Array(){
    return Array();
  }

  public get NoteTypes(){
    return NoteTypes;
  }

  public get SideBarItems(){
    return SideBarItems;
  }
  constructor(public dialog: MatDialog,public sidebarService:SidebarService,public noteService:NoteActionsService) {

  }
  
  ngOnInit(){
    this.noteService.filterSearchBar.subscribe((value) => {
      this.noteService.filterNotes = this.noteService.allNotes.data.filter((item:any) => item.title.includes(value))
      console.log("this.filterNotes",this.noteService.filterNotes)
      console.log("this.noteService.allNotes.data",this.noteService.allNotes.data)
    })
  }

}


