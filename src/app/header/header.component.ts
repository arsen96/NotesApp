import { Component, ViewChild } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NoteActionsService } from '../note-actions.service';
import {MatMenuModule} from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Note, NoteTypes } from '../interfaces/note';
import { take } from 'rxjs';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AuthService } from '../auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatInputModule,MatCheckboxModule,MatNativeDateModule,HttpClientModule, MatDatepickerModule,MatNativeDateModule,ReactiveFormsModule,MatFormFieldModule,FormsModule,MatIconModule,MatButtonModule,MatToolbarModule,MatMenuModule,
    MatIconModule,
    MatRadioModule,
    MatChipsModule,
    MatDividerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  form: FormGroup = new FormGroup({
    types: new FormControl(),
    date:new FormControl(),
    tags: new FormControl(),
  });

  formTypesArray:FormArray;

  public types = [{
    name: 'Sans status',
    value: NoteTypes.normal
  }, {
      name: 'Épingler',
      value: NoteTypes.pinned
  }, {
    name: 'Archive',
    value: NoteTypes.archived
  },
   {
    name: 'Terminer',
    value: NoteTypes.completed
  } 

];
  constructor(public noteService:NoteActionsService,public formBuilder:FormBuilder,public router:Router, public auth:AuthService,public http:HttpClient){}

  ngOnInit(){
    this.form = this.formBuilder.group(
      {
        types:this.formBuilder.array([]),
        date:this.formBuilder.array([]),
        tags:this.formBuilder.array([])
      },
    );
  }

  onTagChange(event:any){
    this.noteService.isSearching = true;
    const tagFormArray = this.form.get('tags') as FormArray;
    tagFormArray.valueChanges.pipe(take(1)).subscribe((matChipResult:Array<string>) => {
      let values = new Array()
      let arrayType = this.noteService.allNotes;
      let dateValues = (this.form.get('date') as FormArray).getRawValue() 
      if(matChipResult.length === 0){
        if(dateValues.length > 0){
          const {start,end} = dateValues[0];
          this.noteService.filterNotes = this.filterByDate(this.noteService.allNotes,start,end);
        }else{
          this.noteService.isSearching = false;
        }
        return;
      }
 
      if(dateValues.length > 0){
        const {start,end} = dateValues[0];
        values = this.filterByDate(this.noteService.allNotes,start,end);
        arrayType = values;
      }
      this.noteService.filterNotes = this.filterByTag(arrayType,matChipResult)
    })

    console.log("event",event)
    if(event.selected){
      tagFormArray.push(new FormControl(String(event.source.value)));
    }  else{
      let i: number = 0;
  
      tagFormArray.controls.forEach((ctrl: any) => {
        if(ctrl.value == event.source.value) {
          tagFormArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
  }

  public filterByTag(arrayType:Note[],searchBoxResult:Array<string>){
    return arrayType.filter((note) => {
      return searchBoxResult?.every((currentTag:any) => {
          return note.tags?.includes(currentTag)
      })
    })
  }

  onCheckChange(event:any){
    this.noteService.isSearching = true;
    this.formTypesArray = this.form.get('types') as FormArray;
    this.formTypesArray.valueChanges.pipe(take(1)).subscribe((searchBoxResult) => {
      let arrayType = this.noteService.allNotes;
      let dateValues = (this.form.get('date') as FormArray).getRawValue() 
      let tags = (this.form.get('tags') as FormArray).getRawValue() 
      if(searchBoxResult.length === 0){
        if(dateValues.length > 0 || tags.length > 0){
          let dateResult = new Array();
          if(dateValues.length > 0){
            const {start,end} = dateValues[0];
            dateResult = this.filterByDate(this.noteService.allNotes,start,end);
          }

          if(tags.length > 0){
            if(dateResult.length > 0){
              this.noteService.filterNotes = this.filterByTag(dateResult,tags);
            }else{
              this.noteService.filterNotes = this.filterByTag(this.noteService.allNotes,tags);
            }
          }else{
            this.noteService.filterNotes = dateResult;
          }

        }else{
          this.noteService.isSearching = false;
        }
        return;
      }

      if(tags.length > 0){
        arrayType = this.filterByTag(this.noteService.allNotes,tags);
      }
      
      if(dateValues.length > 0){
        const {start,end} = dateValues[0];
        arrayType = this.filterByDate(arrayType,start,end);
      }
      this.noteService.filterNotes = arrayType.filter((note) => searchBoxResult.includes(note.type))
    })
    if(event.checked){
      this.formTypesArray.push(new FormControl(event.source.value));
    }  else{
      let i: number = 0;
  
      this.formTypesArray.controls.forEach((ctrl: any) => {
        if(ctrl.value == event.source.value) {
          this.formTypesArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
  }

  public filterByDate(arrayFiltered:Note[],start:number,end:number){
    return arrayFiltered.filter((item) => {
      const formattedDateString = item.createdAt.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3');
      const createdDateAsTimestamp = Date.parse(formattedDateString)
      if(start && end){
        return createdDateAsTimestamp >= start && createdDateAsTimestamp <= end
      }else if(start){
        return createdDateAsTimestamp >= start 
      }else if(end){
        return createdDateAsTimestamp <= end 
      }else{
        return true;
      }
    })  
  }


  dateChange(end:boolean,event:any){
    let dateArray = this.form.get('date') as FormArray;
    const timestamp = Date.parse(event.target.value);
    dateArray.valueChanges.pipe(take(1)).subscribe((date) => {
      const {start,end} = date[0];

      let typeValues = new Array();
      if(this.formTypesArray){
        typeValues = this.formTypesArray.getRawValue() 
      }
      let tags = (this.form.get('tags') as FormArray).getRawValue() 
    
      let arrayFiltered:Note[] = this.noteService.allNotes
      this.noteService.isSearching = true;
        const filteredTypeNotes = this.noteService.allNotes.filter((note) => typeValues.includes(note.type))
        if(filteredTypeNotes.length > 0){
          arrayFiltered = filteredTypeNotes;
        }
        if(tags.length > 0){
          arrayFiltered = this.filterByTag(arrayFiltered,tags);
        }
        this.noteService.filterNotes = this.filterByDate(arrayFiltered,start,end) ;
    })
    if(!end){
      if(dateArray.value.length === 0){
        dateArray.push(new FormControl({start:timestamp}))
      }else{
       let result =  dateArray.value[0];
       dateArray.setValue([{ start: timestamp, end: result.end }]);
      }
    }else{
      if(dateArray.value.length === 0){
        dateArray.push(new FormControl({end:timestamp}))
      }else{
       let result =  dateArray.value[0];
       dateArray.setValue([{ start: result.start, end: timestamp }]);
      }
    }

   
  }

  onInput($event:any){
    this.noteService.isSearching = true;
    const value = $event.target.value
    if(value.length > 0){
      this.noteService.filterSearchBar.next(value);
    }else{
      this.removeSearch();
    }
  }


  removeSearch(){
    this.noteService.removeSearch();
  }

}
