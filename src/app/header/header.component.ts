import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NoteActionsService } from '../note-actions.service';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,FormsModule,MatIconModule,MatButtonModule,MatToolbarModule,MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public noteService:NoteActionsService){}

  onKey($event:any){
    // const value = $event.target.value.toLowerCase();
    // if(value.length > 0){
    //   this.noteService.filterSearchBar.next(value);
    // }else{
    //   this.removeSearch();
    // }
  }

  onInput($event:any){
    const value = $event.target.value
    if(value.length > 0){
      this.noteService.filterSearchBar.next(value);
    }else{
      this.removeSearch();
    }
  }

  removeSearch(){
    this.noteService.filterNotes = new Array();
  }
}
