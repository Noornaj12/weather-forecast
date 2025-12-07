import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForecastCard } from './forecast-card';
import { RoundPipe } from '../../pipes/round.pipe';
import { WeatherForecast } from '../../weather.model';

describe('ForecastCard (standalone)', () => {
  let fixture: ComponentFixture<ForecastCard>;
  let component: ForecastCard;

  const mockForecastData: WeatherForecast = {
    date: '2025-12-06',
    temp: 15.7,
    windSpeed: 8.3,
    description: 'Partly Cloudy',
    icon: '/assets/icons/02d.png',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastCard, RoundPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastCard);
    component = fixture.componentInstance;
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('binds input data and updates when changed', () => {
    component.day = mockForecastData;
    fixture.detectChanges();

    expect(component.day).toEqual(mockForecastData);

    const updated = { ...mockForecastData, temp: 20.2 };
    component.day = updated;
    fixture.detectChanges();
    expect(component.day.temp).toBeCloseTo(20.2, 3);
  });
});
