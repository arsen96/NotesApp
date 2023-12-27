import { Tag } from "./tag";

export enum NoteTypes{
    normal = 'normal',
    pinned  = 'pinned',
    archived = 'archived',
    completed = 'completed',
}

export interface Note {
    id:string,
    title:string;
    description:string;
    createdAt:string;
    tags:Array<Tag>
    type:NoteTypes;
    pinned:boolean;
    completed:boolean
    deleted:boolean
}
