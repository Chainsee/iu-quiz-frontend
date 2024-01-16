import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient) {}

  isActivate(): Observable<boolean> {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      console.log(`Sending request with JWT token: ${jwtToken}`);
      return from(
        fetch(''https://iu-quiz-ki0i.onrender.com/posts/validate', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
      ).pipe(
        map(response => {
          if (response.status === 200) {
            this.router.navigate(['/home']);
            return true;
          } else {
            return false;
          }
        }),
        catchError(error => {
          console.error(error);
          return of(false);
        })
      );
    } else {
      return of(false);
    }
  }

  canActivate(): Observable<boolean> {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      console.log(`Sending request with JWT token: ${jwtToken}`);
      return from(
        fetch(''https://iu-quiz-ki0i.onrender.com/posts/validate', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
      ).pipe(
        map(response => {
          if (response.status === 200) {
            return true;
          } else {
            this.router.navigate(['/start']);
            return false;
          }
        }),
        catchError(error => {
          console.error(error);
          this.router.navigate(['/start']);
          return of(false);
        })
      );
    } else {
      this.router.navigate(['/start']);
      return of(false);
    }
  }
}
