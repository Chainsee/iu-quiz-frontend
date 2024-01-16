import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  categories: any;
  selectedCategory: any;
  constructor(private router: Router, private authService: AuthService) {}
  async ngOnInit() {
    let posts = async () => {
      let response = await fetch(`https://iu-quiz-ki0i.onrender.com/posts/getKategorien`, {
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
