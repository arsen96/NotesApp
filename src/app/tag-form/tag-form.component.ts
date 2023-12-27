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
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
MatChip
@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [CommonModule,RouterOutlet,MatChipsModule,MatIconModule,MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,MatDividerModule],
  templateUrl: './tag-form.component.html',
  styleUrl: './tag-form.component.scss'
})
export class TagFormComponent {

  constructor(public noteService:NoteActionsService,public dialogRef: MatDialogRef<any>,public http:HttpClient){

  }

  ngOnInit(){

  }
  async deleteTag(id:string){
    await lastValueFrom(this.http.get("http://localhost:3000/deleteTag?id="+id)) as any;
    this.noteService.getTags();
  }

  async add(item:HTMLInputElement){
      if(item.value.length > 0){
        const data = {
          name:item.value
        }
        item.value = "";
        await lastValueFrom(this.http.post("http://localhost:3000/createTag",{data},{withCredentials:true})) as any;
        await this.noteService.getTags();
      }
  }
}
