import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  signupUsers: any[] = [];
  signupObj: any = {
    username: '',
    email: '',
    password: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onSignUp() {
    this.http
      .post('https://iu-quiz-ki0i.onrender.com/posts/register', this.signupObj)
      .subscribe(
        (response: any) => {
          if (response && response.jwtToken) {
            localStorage.setItem('jwtToken', response.jwtToken);
            localStorage.setItem('userId', response.userId);
            this.snackbar.open('Registrierung erfolgreich', 'Schließen', {
              duration: 2000,
            });
            this.authService.setCurrentUser(this.signupObj.username);
            this.router.navigate(['/home']);
          } else {
          }
        },
        (error) => {
          this.snackbar.open('Registrierung fehlgeschlagen', 'Schließen', {
            duration: 2000,
          });
        }
      );
  }
}
