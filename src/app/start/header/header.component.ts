import { Component } from '@angular/core';
import { AuthGuard } from './../../../services/authGuard.service';
import { Observable } from 'rxjs';

@Component({  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  auth!: Observable<boolean>;
  constructor(private authGuard: AuthGuard) {}
  ngOnInit(): void {
    this.auth = this.authGuard.canActivate();
  }
}
