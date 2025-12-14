import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStore } from '../../weather.store';
import { FormsModule } from '@angular/forms';
import { City } from '../../weather.model';

@Component({
  selector: 'app-city-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './city-selector.html',
})
export class CitySelector {
  selectedCity: City | null = null;

  constructor(public store: WeatherStore) {}

  onCityChange(selectedCity: City | null) {
    this.store.setCity(selectedCity);
  }
}
