import { TestBed } from '@angular/core/testing';

import { NoteActionsService } from './note-actions.service';

describe('NoteActionsService', () => {
  let service: NoteActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
