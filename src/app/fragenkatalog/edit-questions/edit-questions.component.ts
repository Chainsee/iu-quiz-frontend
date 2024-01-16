import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrl: './edit-questions.component.scss',
})
export class EditQuestionsComponent {
  message: any;
  choosenCategory: any;
  formArray!: FormArray;
  category: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    let category = this.route.snapshot.paramMap.get('category');
    this.category = category;
    this.formArray = this.formBuilder.array([]);
    let posts = async () => {
      let response = await fetch(
        `https://iu-quiz-ki0i.onrender.com/posts/getKat?kat=${category}`,
        {
          headers: {
            'Authorization': `Bearer ${this.authService.getCurrentUser()}`
          }
        }
      );
      let results = await response.json();
      console.log(results);
      return results;
    };
    this.message = await posts();
    this.choosenCategory = category;
    this.formArray = this.formBuilder.array([]);
    this.message.forEach((item: any) => {
      const group = this.formBuilder.group({
        frage: [item.frage],
        antworten: this.formBuilder.group({
          antwort1: [item.antworten.antwort1],
          antwort2: [item.antworten.antwort2],
          antwort3: [item.antworten.antwort3],
          antwort4: [item.antworten.antwort4],
        }),
        korrekteAntwort: [item.korrekteAntwort],
        kategorie: [item.kategorie],
      });
      this.formArray.push(group);
    });
  }

  form = new FormGroup({
    frage: new FormControl('', Validators.required),
    antworten: new FormGroup({
      antwort1: new FormControl('', Validators.required),
      antwort2: new FormControl('', Validators.required),
      antwort3: new FormControl('', Validators.required),
      antwort4: new FormControl('', Validators.required),
    }),
    korrekteAntwort: new FormControl('', Validators.required),
    kategorie: new FormControl('', Validators.required),
    user: new FormControl('', Validators.required),
  });

  getFormGroup(index: number): FormGroup {
    return this.formArray.controls[index] as FormGroup;
  }

  async speichern() {
    const item = this.form.value;
    if (this.eingabePruefen(item)) {
      item.kategorie = this.choosenCategory;
      item.user = this.authService.getCurrentUser()
      const response = await this.http
        .post('https://iu-quiz-ki0i.onrender.com/posts/newQuestion', item)
        .toPromise();
    this.router.navigate(['/fragenbearbeiten', this.category]);
    } else {
      alert('Bitte alle Felder korrekt ausfüllen!');
    }
  }

  async update(form: FormGroup, index: number) {
    const item = form.value;
    if (this.eingabePruefen(item)) {
      let _id = this.message[index]._id;
      item.user = this.authService.getCurrentUser()
      const response = await this.http
        .put(`https://iu-quiz-ki0i.onrender.com/posts/update/${_id}`, item)
        .toPromise();
      this.router.navigate(['/fragenbearbeiten', this.category]);
    } else {
      alert('Bitte alle Felder korrekt ausfüllen!');
    }
  }

  async loeschen(index: number) {
    let item = this.message[index];
    let _id = item._id;
    const response = await this.http
      .delete(`https://iu-quiz-ki0i.onrender.com/posts/delete/${_id}`)
      .toPromise();
    this.router.navigate(['/fragenbearbeiten', this.category]);
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
