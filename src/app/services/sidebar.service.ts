import { Injectable, computed, signal,effect } from '@angular/core';

export enum SideBarItems {
  notes,
  tags,
  archives,
  completed,
  profile
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  selected:SideBarItems = SideBarItems.notes;
  constructor() { }
}
