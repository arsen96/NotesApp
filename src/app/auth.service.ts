import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(private cookieService: CookieService,public router:Router) { }

  getToken(): string {
    return this.cookieService.get('note_user');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }


}
