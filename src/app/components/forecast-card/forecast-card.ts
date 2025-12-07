import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundPipe } from '../../pipes/round.pipe';

@Component({
  selector: 'app-forecast-card',
  standalone: true,
  imports: [CommonModule,RoundPipe],
  templateUrl:'./forecast-card.html'
  
})
export class ForecastCard {
  @Input() day!: any;
}
