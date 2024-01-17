export class Question {
  kategorie: string;
  frage: string;
  antworten: {
    antwort1: string;
    antwort2: string;
    antwort3: string;
    antwort4: string;
  };
  korrekteAntwort: string;
  user: string;

  constructor() {
    this.kategorie = '';
    this.frage = '';
    this.antworten = {
      antwort1: '',
      antwort2: '',
      antwort3: '',
      antwort4: '',
    };
    this.korrekteAntwort = '';
    this.user = '';
  }
}
