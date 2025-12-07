import { Injectable, signal, computed, effect } from '@angular/core';
import { WeatherService } from './weather.service';
import { City, WeatherForecast } from './weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherStore {
  // State signals
  city = signal<City | null>(null);
  forecast = signal<WeatherForecast[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private api: WeatherService) {
    // Effect: when city changes → load weather
    effect(() => {
      const selectedCity = this.city();
      if (!selectedCity) {
        this.forecast.set([]);
        return;
      }

      this.loadWeather(selectedCity);
    });
  }

  setCity(city: City | null) {
    this.city.set(city);
  }

  private loadWeather(city: City) {
    this.loading.set(true);
    this.error.set(null);

    this.api.getForecast(city).subscribe({
      next: (data:WeatherForecast[]) => {
        this.forecast.set(data);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err?.message || 'Failed to load weather');
        this.loading.set(false);
      }
    });
  }
}
