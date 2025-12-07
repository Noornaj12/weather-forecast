import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastCard } from '../forecast-card/forecast-card';
import { WeatherStore } from '../../weather.store';
import { WeatherForecast } from '../../weather.model';

@Component({
  selector: 'app-forecast-list',
  standalone: true,
  imports: [CommonModule, ForecastCard],
  templateUrl: './forecast-list.html',
})
export class ForecastList {
  @Input() forecast: WeatherForecast[] = [];
}
