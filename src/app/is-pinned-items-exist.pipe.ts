import { Pipe, PipeTransform } from '@angular/core';
import { Note, NoteTypes } from './interfaces/note';

@Pipe({
  name: 'isNoteTypeItemsExist',
  pure:false,
  standalone: true
})
export class isNoteTypeItemsExistPipe implements PipeTransform {
    transform(notes:  Note[], ...types:Array<NoteTypes>) {
      if(Array.isArray(notes)){
       return notes.filter((note) => types.includes(note.type)).length > 0
      }
      return false;
  }
}
