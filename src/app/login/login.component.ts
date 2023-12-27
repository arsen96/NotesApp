import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatCardModule, RouterOutlet,HttpClientModule, MatFormFieldModule,ReactiveFormsModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public isLogin = true;

  serverMsgError = {email:'',password:''} 

  constructor(public formBuilder:FormBuilder,public http:HttpClient,public router:Router){}

   ngOnInit(){
    this.form = this.formBuilder.group(
      {
        email: [''],
        password: ['']
      },
    );
   }

   get registerFormControl():any {
    return this.form.controls;
  }

 async onSubmit(){
      this.serverMsgError.email = ''
      this.serverMsgError.password = ''
      const data = {
        email:this.form.value.email,
        password:this.form.value.password,
      }

      let url = this.isLogin ? 'http://localhost:3000/login' : 'http://localhost:3000/register';

      try {
        await lastValueFrom(this.http.post(url,data,{ withCredentials: true}))
        this.router.navigateByUrl('/notes')
      }catch(err:any){
        const servErr = err.error?.errors
        if(servErr?.email?.message?.length > 0){
          this.serverMsgError.email = servErr?.email?.message
        }

        if(err.error?.email?.length > 0){
          this.serverMsgError.email = err.error.email
        }

        if(err.error?.password?.length > 0){
          this.serverMsgError.password = err.error.password
        }

        if(servErr?.email?.message?.length > 0){
          this.serverMsgError.email = servErr?.email?.message
        }

        if(servErr?.password?.message?.length > 0){
          this.serverMsgError.password = servErr?.password?.message
        }
      }
  }

  public clearFields(){
    this.serverMsgError.password = "";
    this.serverMsgError.email = "";
    this.form.reset();
  }

}


