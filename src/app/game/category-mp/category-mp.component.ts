import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category-mp.component.html',
  styleUrl: './category-mp.component.scss',
})
export class MultiplayerCategoryComponent {
  categories: any;
  selectedCategory: any;
  constructor(private router: Router, private authService: AuthService) {}
  async ngOnInit() {
    let posts = async () => {
      let response = await fetch(`http://localhost:5050/posts/getKategorien`, {
        headers: {
          Authorization: `Bearer ${this.authService.getCurrentUser()}`,
        },
      });
      let results = await response.json();
      return results;
    };
    this.categories = await posts();
  }

  getCategory() {
    if (this.selectedCategory != null) {
      this.router.navigate(['/game', this.selectedCategory]);
    }
  }
}
