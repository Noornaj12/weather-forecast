import { Component, signal } from '@angular/core';
import { WeatherContainer } from './components/weather-container/weather-container';
import { CitySelector } from './components/city-selector/city-selector';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CitySelector, WeatherContainer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
