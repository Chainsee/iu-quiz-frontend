import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss',
})
export class ScoreComponent {
  message: any;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    let posts = async () => {
      let response = await fetch(`http://localhost:5050/posts/getUserScore`, {
        headers: {
          Authorization: `Bearer ${this.authService.getCurrentUser()}`,
        },
      });
      let results = await response.json();
      return results;
    };
    this.message = await posts();
  }
}
