import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: false,

  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  counterIndex = 0;

  onIncrement(): void {
    this.counterIndex += 1;
  }

  onDecrement(): void {
    if(this.counterIndex > 0) {
      this.counterIndex -= 1;
    }
  }
}
