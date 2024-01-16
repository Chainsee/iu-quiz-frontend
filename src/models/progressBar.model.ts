import { Observable, of } from 'rxjs';

export class ProgressBar {
  isStart = false;
  res: Observable<null | string> = of(null);
  loadingPercent = 0;
  intervalId = {} as any;
  startLoading() {
    this.isStart = true;
    this.intervalId = setInterval(() => {
      if (this.loadingPercent < 100) {
        this.loadingPercent += 1;
      }
    }, 250);
  }
  progressInLoading() {
    if (this.loadingPercent === 100) {
      clearInterval(this.intervalId);
      this.res = of("Item Loaded");
    }
    console.log('Loading: ' + this.loadingPercent + '% completed.');
  }
}
