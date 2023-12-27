import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Note, NoteTypes } from './interfaces/note';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TagFormComponent } from './tag-form/tag-form.component';
import { Tag } from './interfaces/tag';
import { Subject, lastValueFrom } from 'rxjs';
import { NotesFormComponent } from './notes-form/notes-form.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface NotesI {
  data: Note[];
}

@Injectable({
  providedIn: 'root'
})
export class NoteActionsService {
  @ViewChild('searchBar') searchBarValue:string;
  allNotes:Note[] = new Array();
  isSearching = false;
  filterNotes:Note[] = new Array()
  currentNote:Note
  allTags:Tag[] = new Array();
  filterSearchBar = new Subject<string>();
  public tagFormSubscription:MatDialogRef<any>;
  constructor(public dialog: MatDialog,public http:HttpClient,public router:Router) { 
  }

  editNote(note:Note){
    this.openDialog(note);
  }

  openDialog(note?:Note): void {
    const dialogRef = this.dialog.open(NotesFormComponent,
    {
      data: note 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.data){
        this.currentNote = result.data;
          if(!result.edition){
            this.http.post("http://localhost:3000/createNote",{data:this.currentNote},{withCredentials:true}).subscribe((note:any) => {
              this.allNotes.push(note);
            })
          }else{
            let index = this.allNotes.findIndex((item:any) => item.id == this.currentNote.id)
            if(index > -1){
              this.allNotes[index] = this.currentNote;
              const data = {
                _id:this.allNotes[index].id,
                ...this.allNotes[index]
              }
              this.http.post("http://localhost:3000/updateNote",{data}).subscribe(() => {})
            }
          }
          this.removeSearch();
      }
     
    });
  }

  openTagModal(){
    const modal = this.dialog.open(TagFormComponent);

    modal.afterClosed().subscribe(() => {
      this.allNotes.forEach((item:any,noteIndex:any) => {
        if(item.tags){
          const tags = item.tags.filter((noteTag:any) => {
            return this.allTags.some((currTag) => {
              return currTag.id == noteTag as any;
            })
          })
          this.allNotes[noteIndex].tags = tags;
        }
      })

    });
  }
  
  public removeSearch(){
    this.isSearching = false;
    this.filterNotes = new Array();
    this.searchBarValue = "";
  }

  pinTemp(id:number){
    const index = this.allNotes.findIndex((item:any) => item.id === id);
    this.allNotes[index].pinned = ! this.allNotes[index].pinned;
    this.allNotes[index].completed = false;
    this.allNotes[index].deleted = false;
    this.allNotes[index].type = NoteTypes.normal
    if(this.allNotes[index].pinned){
      this.allNotes[index].type = NoteTypes.pinned
    }
    this.http.post("http://localhost:3000/updateNote",{data:this.allNotes[index]}).subscribe(() => {})
    this.removeSearch();
  }

  completeTemp(id:number){
    const index = this.allNotes.findIndex((item:any) => item.id === id);
    this.allNotes[index].completed = !this.allNotes[index].completed;
    this.allNotes[index].type = NoteTypes.normal
    if(this.allNotes[index].completed){
      this.allNotes[index].type = NoteTypes.completed
    }
    this.allNotes[index].pinned = false;
    this.http.post("http://localhost:3000/updateNote",{data:this.allNotes[index]}).subscribe(() => {})
    this.removeSearch();
  }

  deleteTemp(id:number){
    const index = this.allNotes.findIndex((item:any) => item.id === id);
    this.allNotes[index].deleted = !this.allNotes[index].deleted;
    this.allNotes[index].pinned = false;
    this.allNotes[index].completed = false;
    this.allNotes[index].type = NoteTypes.archived
    this.http.post("http://localhost:3000/updateNote",{data:this.allNotes[index]}).subscribe(() => {})
    this.removeSearch();
  }

  restoreTemp(id:number){
    const index = this.allNotes.findIndex((item:any) => item.id === id);
    this.allNotes[index].deleted = false;
    this.allNotes[index].type = NoteTypes.normal
    this.http.post("http://localhost:3000/updateNote",{data:this.allNotes[index]}).subscribe(() => {})
    this.removeSearch();
  }

  async getTags(){
    try{
      let data  = await lastValueFrom(this.http.get("http://localhost:3000/tags",{withCredentials:true})) as any;
      if(!data){
        data = new Array();
      }
      this.allTags = data;
      if(this.allTags.length > 0){
          this.allTags.forEach((item:any) => {
            const temp = item._id;
            delete item.id
            item.id = temp;
            item.createdAt = new Date(item.createdAt).toLocaleString()
        })
      }
    }catch(err){
      this.allNotes = new Array();
      console.log("error while recovering notes",err)
    }
  }

  async getNotes(){
        try{
          this.allNotes = await lastValueFrom(this.http.get("http://localhost:3000/notes",{withCredentials:true}) ) as Note[];
          this.allNotes.forEach((item:any) => {
              const temp = item._id;
              delete item.id
              item.id = temp;
              item.createdAt =  new Date(item.createdAt).toLocaleString()
          })
        }catch(err){
          this.allNotes = new Array();
          console.log("error while recovering notes",err)
        }
      }

      logout(){
        this.http.get('http://localhost:3000/logout',{withCredentials:true}).subscribe(() => {
          this.allTags = new Array();
          this.allNotes = new Array();
          this.router.navigateByUrl('/auth');
        })
   }
}
