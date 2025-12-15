import { Injectable, signal, computed, effect } from '@angular/core';
import { WeatherService } from './weather.service';
import { City, WeatherForecast } from './weather.model';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, filter, of, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherStore {
  // State signals
  city = signal<City | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  cities: City[] = ['Birmingham', 'London', 'Cardiff'];

  forecast = toSignal(
    toObservable(this.city).pipe(
      filter((city): city is City => !!city),
      tap(() => {
        this.loading.set(true);
        this.error.set(null);
      }),
      switchMap((city) => {
        return this.api.getForecast(city).pipe(
          catchError((err) => {
            this.error.set(err?.message || 'Failed to load weather');
            return of([]);
          })
        );
      }),
      tap(() => this.loading.set(false)),
      takeUntilDestroyed()
    )
  );
  constructor(private api: WeatherService) {}

  setCity(city: City | null) {
    this.city.set(city);
  }
}
