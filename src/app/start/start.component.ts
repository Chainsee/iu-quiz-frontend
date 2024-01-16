import { Component } from '@angular/core';

@Component({
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
export class StartComponent {
  canActivateResult!: boolean;
  ngOnInit(): void {
  }
}
