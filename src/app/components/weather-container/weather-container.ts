import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStore } from '../../weather.store';
import { ForecastList } from '../forecast-list/forecast-list';
import { Loader } from '../loader/loader';

@Component({
  selector: 'app-weather-container',
  standalone: true,
  imports: [CommonModule, ForecastList, Loader],
  templateUrl: './weather-container.html',
})
export class WeatherContainer {
  constructor(public store: WeatherStore) {}
}
