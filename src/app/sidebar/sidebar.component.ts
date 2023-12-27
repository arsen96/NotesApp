import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { SideBarItems, SidebarService } from '../services/sidebar.service';
import { NoteActionsService } from '../note-actions.service';
import {MatBadgeModule} from '@angular/material/badge';
import { NoteTypes } from '../interfaces/note';
import { NumberItemsPipe } from '../number-items.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule,CommonModule,MatBadgeModule,NumberItemsPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
  public get SideBarItems(){
    return SideBarItems;
  }

  public get NoteTypes(){
    return NoteTypes;
  }
  public items = [
    {
      type:SideBarItems.notes,
      text:'Notes',
      fontIcon:'note'
    },
    {
      type:SideBarItems.tags,
      text:'Modifier les libellés',
      fontIcon:'mode_edit'
    },
    {
      type:SideBarItems.archives,
      text:'Archive',
      fontIcon:'archive'
    },
    {
      type:SideBarItems.completed,
      text:'Terminer',
      fontIcon:'check_circle'
    },
    {
      type:SideBarItems.profile,
      text:'Profile',
      fontIcon:'perm_identity'
    }
  ]

  public constructor(public sideBarService:SidebarService,public noteService:NoteActionsService){}
  get getNotesCount(){
    const notedCount = this.noteService.allNotes.filter((item:any) => {
      return item.type === NoteTypes.normal || item.type === NoteTypes.pinned
    })?.length;
    return notedCount;
  }
  select(type:SideBarItems){
    this.noteService.removeSearch();
    if(type === SideBarItems.tags){
      this.noteService.openTagModal()
      return;
    }
    this.sideBarService.selected = type;
  }
}
