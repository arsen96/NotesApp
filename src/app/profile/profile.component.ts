import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet,Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { NoteActionsService } from '../note-actions.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,MatCardModule, RouterOutlet,HttpClientModule, MatFormFieldModule,ReactiveFormsModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  form: FormGroup = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
  });


  serverMsgError = {currentPassword:'',newPassword:''} 
  constructor(public formBuilder:FormBuilder,public router:Router,public http:HttpClient,public noteService:NoteActionsService){}

  ngOnInit(){
    this.form = this.formBuilder.group(
      {
        currentPassword: [''],
        newPassword: ['']
      },
    );
   }


   async onSubmit(){
    this.serverMsgError.currentPassword = ''
    this.serverMsgError.newPassword = ''
    const data = {
      currentPassword:this.form.value.currentPassword,
      newPassword:this.form.value.newPassword,
    }

    console.log("data",data)
    try {
      await lastValueFrom(this.http.post('http://localhost:3000/changepwd',data,{ withCredentials: true}))
      this.noteService.logout();
    }catch(err:any){
      if(err.error?.currentPassword.length > 0){
        this.serverMsgError.currentPassword = err.error.currentPassword
      }
    }
  }
}
