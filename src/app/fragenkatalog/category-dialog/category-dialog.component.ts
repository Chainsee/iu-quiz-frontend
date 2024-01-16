import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss'
})
export class CategoryDialogComponent {
  form: FormGroup;
  categories: any;
  selectedCategory: any;
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


  constructor(
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) {
      this.form = this.formBuilder.group({
        categoryName: '',
      });
    }

    getCategory() {
      this.router.navigate(['/fragenbearbeiten', this.selectedCategory]);
      this.dialogRef.close();
    }

  back() {
    this.dialogRef.close();
  }
}
