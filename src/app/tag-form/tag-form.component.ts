import { Component } from '@angular/core';
import { NoteActionsService } from '../note-actions.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogRef } from '@angular/material/dialog';
import {MatChip, MatChipsModule} from '@angular/material/chips';
MatChip
@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [CommonModule,RouterOutlet,MatChipsModule,MatIconModule,MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,MatDividerModule],
  templateUrl: './tag-form.component.html',
  styleUrl: './tag-form.component.scss'
})
export class TagFormComponent {

  constructor(public noteService:NoteActionsService,public dialogRef: MatDialogRef<any>){

  }

  ngOnInit(){

  }
  deleteTag(id:number){
    this.noteService.allTags = this.noteService.allTags.filter((item) => item.id !== id)
    localStorage.setItem("tags",JSON.stringify(this.noteService.allTags));
  }
  add(item:HTMLInputElement){
      if(item.value.length > 0){
        this.noteService.allTags.push({id:Date.now(),name:item.value});
        localStorage.setItem("tags",JSON.stringify(this.noteService.allTags));
        item.value = "";
      }
  }
}
