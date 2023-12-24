import { Pipe, PipeTransform, SimpleChanges } from '@angular/core';
import { Note, NoteTypes } from './interfaces/note';

@Pipe({
  name: 'numberItems',
  pure: false,
  standalone: true
})
export class NumberItemsPipe implements PipeTransform {

  transform(notes:  Note[], ...types:Array<NoteTypes>) {
    if(Array.isArray(notes)){
      return notes.filter((note) => types.includes(note.type)).length
    }
    return 0;
}

}
