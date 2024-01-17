import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { Question } from '../../models/questions.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-fragenkatalog',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent {
  items: Question[] = [];

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {}
  addCategory() {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {});
  }
  selectCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {});
  }

  onFileSelect(event: any) {
    let file = event.target.files[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result, file) => {
        console.log('Parsed: ', result);
        this.items = result.data.map((item: any) => {
          let question = new Question();
          question.kategorie = item.kategorie;
          question.frage = item.frage;
          question.antworten.antwort1 = item.antwort1;
          question.antworten.antwort2 = item.antwort2;
          question.antworten.antwort3 = item.antwort3;
          question.antworten.antwort4 = item.antwort4;
          question.korrekteAntwort = item.korrekteAntwort;
          return question;
        });
      },
    });
  }

  async speichern() {
    for (let item of this.items) {
      if (this.eingabePruefen(item)) {
        item.user = this.authService.getCurrentUser()
        const response = await this.http
          .post('https://iu-quiz-ki0i.onrender.com/posts/newQuestion', item, {
            observe: 'response',
          })
          .toPromise();
      }
    }
    this.snackbar.open('Speichern Erfolgreich!', 'Schließen', {
      duration: 2000,
    });
  }

  eingabePruefen(item: any): boolean {
    let rueckgabe = false;
    item.frage != '' &&
    item.antworten.antwort1 != '' &&
    item.antworten.antwort2 != '' &&
    item.antworten.antwort3 != '' &&
    item.antworten.antwort4 != '' &&
    item.korrekteAntwort != '' &&
    item.korrekteAntwort >= 1 &&
    item.korrekteAntwort <= 4
      ? (rueckgabe = true)
      : (rueckgabe = false);
    return rueckgabe;
  }
}
