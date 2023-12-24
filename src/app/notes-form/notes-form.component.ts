import {Component, Inject} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import { Tag } from '../interfaces/tag';
import { Note, NoteTypes } from '../interfaces/note';
import { NoteActionsService } from '../note-actions.service';
@Component({
  selector: 'app-notes-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatRadioModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './notes-form.component.html',
  styleUrl: './notes-form.component.scss'
})
export class NotesFormComponent {
  public note:Note;
  submitted = false;
  public get NoteTypes(){
    return NoteTypes
  }
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    completed: new FormControl(false),
    pinned: new FormControl(false),
    tags:new FormControl([]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) data:any,public formBuilder:FormBuilder,public http:HttpClient,public dialogRef: MatDialogRef<any>,
              public noteService:NoteActionsService){
                this.note = data;
              }

  ngOnInit(){
    this.noteService.allTags.forEach((item) => item.selected = false)
      this.form = this.formBuilder.group(
        {
          title: [this.note?.title || '', Validators.required],
          description: [this.note?.description || '', Validators.required],
          completed:[this.note?.type === NoteTypes.completed ? true : false],
          pinned: [this.note?.type === NoteTypes.pinned ? true : false],
          tags: []
        },
      );
      this.form.valueChanges.subscribe(x => {
        this.submitted = false;
    })
    if(this.note){
      this.noteService.allTags.forEach((tag) => {
        const found = this.note.tags?.find((noteTag:any) => tag.id == noteTag)
        if(found){
          tag.selected = true;
        }
      })
      const values = this.noteService.allTags.filter((tag) => {
        return tag.selected;
      })
      this.form.controls["tags"].setValue([...values.map((val) => String(val.id))])
    }

  }
  

  get registerFormControl():any {
    return this.form.controls;
  }

  onSubmit(edition:boolean) {
    this.submitted = true;
    if(this.form.valid){
      let type = "";
      const pinned = typeof(this.form.value.pinned) === "string" ? this.form.value.pinned == "false" ? false : true : this.form.value.pinned
      if(this.note){
        type = this.note.type
      }else{
        type = pinned ? NoteTypes.pinned : NoteTypes.normal;
      }
      const data = {
        id:this.note?.id || Date.now(),
        title:this.form.value.title,
        description:this.form.value.description,
        type,
        tags:this.form.value.tags,
        createdDate: new Date().toLocaleString()
      } as Note

      this.dialogRef.close({edition,data});

    }
  }
}
