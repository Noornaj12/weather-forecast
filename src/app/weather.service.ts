import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { City, OpenWeatherResponse, WeatherForecast } from './weather.model';
import { API_URL, API_KEY, UNIT } from './constants';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}

  getForecast(city: City): Observable<WeatherForecast[]> {
    return this.http
      .get<OpenWeatherResponse>(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: UNIT,
        },
      })
      .pipe(map((response) => this.toDailySummary(response)));
  }

  toDailySummary(data: OpenWeatherResponse): WeatherForecast[] {
    const map: { [key: string]: WeatherForecast } = {};

    data.list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!map[date]) {
        map[date] = {
          date,
          temp: item.main.temp,
          windSpeed: item.wind.speed,
          description: item.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        };
      }
    });

    return Object.values(map).slice(0, 5);
  }
}
