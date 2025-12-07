import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForecastList } from './forecast-list';
import { ForecastCard } from '../forecast-card/forecast-card';
import { WeatherForecast } from '../../weather.model';

describe('ForecastList (standalone)', () => {
  let fixture: ComponentFixture<ForecastList>;
  let component: ForecastList;

  const mockForecast: WeatherForecast[] = [
    {
      date: '2025-12-06',
      temp: 12.4,
      windSpeed: 4.2,
      description: 'Sunny',
      icon: '/assets/icons/01d.png',
    },
    {
      date: '2025-12-07',
      temp: 9.9,
      windSpeed: 3.1,
      description: 'Cloudy',
      icon: '/assets/icons/03d.png',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastList, ForecastCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastList);
    component = fixture.componentInstance;
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('renders no cards when forecast is empty', () => {
    component.forecast = [];
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll('app-forecast-card');
    expect(cards.length).toBe(0);
  });

  it('renders a ForecastCard for every item in forecast input', () => {
    component.forecast = mockForecast;
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll('app-forecast-card');
    expect(cards.length).toBe(mockForecast.length);
  });

  it('updates rendered list when forecast input changes', () => {
    component.forecast = [mockForecast[0]];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-forecast-card').length).toBe(1);

    component.forecast = mockForecast;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-forecast-card').length).toBe(2);
  });
});
