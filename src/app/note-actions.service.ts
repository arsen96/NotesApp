import { Injectable } from '@angular/core';
import { Note, NoteTypes } from './interfaces/note';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TagFormComponent } from './tag-form/tag-form.component';
import { Tag } from './interfaces/tag';
import { Subject } from 'rxjs';
import { NotesFormComponent } from './notes-form/notes-form.component';

interface NotesI {
  data: Note[];
}

@Injectable({
  providedIn: 'root'
})
export class NoteActionsService {
  allNotes: NotesI = { data: [] };
  filterNotes:Note[] = new Array()
  currentNote:Note
  allTags:Tag[] = new Array()
  filterSearchBar = new Subject<string>();
  public tagFormSubscription:MatDialogRef<any>;
  constructor(public dialog: MatDialog) { 
    if(!localStorage.getItem("notes")){
      localStorage.setItem("notes",JSON.stringify({data:[]}));
    }else{
      this.allNotes =  JSON.parse(localStorage.getItem("notes") as string) as NotesI;
    }
    if(!localStorage.getItem("tags")){
      localStorage.setItem("tags",JSON.stringify([]));
    }else{
      this.allTags =  JSON.parse(localStorage.getItem("tags") as string) as Tag[];
    }
  }

  delete(id:number){
    const index = this.allNotes.data.findIndex((item:any) => item.id === id);
    this.allNotes.data[index].deleted = !this.allNotes.data[index].deleted;
    this.allNotes.data[index].pinned = false;
    this.allNotes.data[index].completed = false;
    this.allNotes.data[index].type = NoteTypes.archived
    localStorage.setItem('notes',JSON.stringify(this.allNotes));
    this.filterNotes = new Array();
  }


  complete(id:number){
    const index = this.allNotes.data.findIndex((item:any) => item.id === id);
    this.allNotes.data[index].completed = !this.allNotes.data[index].completed;
    this.allNotes.data[index].type = NoteTypes.normal
    if(this.allNotes.data[index].completed){
      this.allNotes.data[index].type = NoteTypes.completed
    }
    this.allNotes.data[index].pinned = false;
   
    localStorage.setItem('notes',JSON.stringify(this.allNotes));
    this.filterNotes = new Array();
  }

  pin(id:number){
    const index = this.allNotes.data.findIndex((item:any) => item.id === id);
    this.allNotes.data[index].pinned = !this.allNotes.data[index].pinned;
    this.allNotes.data[index].type = NoteTypes.normal
    if(this.allNotes.data[index].pinned){
      this.allNotes.data[index].type = NoteTypes.pinned
    }
    localStorage.setItem('notes',JSON.stringify(this.allNotes));
    this.filterNotes = new Array();
  }

  restore(id:number){
    const noteId = this.allNotes.data.findIndex((item:any) => item.id === id);
    this.allNotes.data[noteId].deleted = false;
    this.allNotes.data[noteId].type = NoteTypes.normal
    localStorage.setItem('notes',JSON.stringify(this.allNotes))
    this.filterNotes = new Array();
  }

  editNote(note:Note){
    this.openDialog(note);
  }

  openDialog(note?:Note): void {
    const dialogRef = this.dialog.open(NotesFormComponent,
    {
      data: note 
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result?.data){
        this.currentNote = result.data;
        let notes = JSON.parse(localStorage.getItem("notes") as string);
        if(notes){
          this.allNotes = notes;
          if(!result.edition){
            this.allNotes.data.push(this.currentNote);
          }else{
            let dataIndex = this.allNotes.data.findIndex((item:any) => item.id == this.currentNote.id)
            if(dataIndex > -1){
              this.allNotes.data[dataIndex] = this.currentNote;
            }
          }
          localStorage.setItem('notes',JSON.stringify(this.allNotes));
          this.filterNotes = new Array();
        }
      }
     
    });
  }

  openTagModal(){
    const modal = this.dialog.open(TagFormComponent);

    modal.afterClosed().subscribe(() => {
      this.allNotes.data.forEach((item:any,noteIndex:any) => {
        if(item.tags){
          const tags = item.tags.filter((noteTag:any) => {
            return this.allTags.some((currTag) => {
              return currTag.id == noteTag as any;
            })
          })
          this.allNotes.data[noteIndex].tags = tags;
        }
      })
      localStorage.setItem('notes',JSON.stringify(this.allNotes));
    });
  }
  
}
