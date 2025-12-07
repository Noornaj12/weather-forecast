import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherContainer } from './weather-container';
import { WeatherStore } from '../../weather.store';
import { WeatherForecast } from '../../weather.model';

describe('WeatherContainer (standalone)', () => {
  let fixture: ComponentFixture<WeatherContainer>;
  let component: WeatherContainer;

  const mockForecastData: WeatherForecast[] = [
    {
      date: '2025-12-06',
      temp: 15.7,
      tempMin: 10.2,
      tempMax: 20.5,
      windSpeed: 8.3,
      description: 'Partly Cloudy',
      icon: '/assets/icons/02d.png',
    },
  ];

  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      loading: jasmine.createSpy('loading').and.returnValue(false),
      error: jasmine.createSpy('error').and.returnValue(null),
      forecast: jasmine.createSpy('forecast').and.returnValue([]),
      city: jasmine.createSpy('city').and.returnValue('London'),
    };

    await TestBed.configureTestingModule({
      imports: [WeatherContainer],
      providers: [{ provide: WeatherStore, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('shows loading message when store.loading() is true', () => {
    mockStore.loading.and.returnValue(true);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent || '';
    expect(text).toContain('Loading...');
  });

  it('shows error when store.error() returns a message', () => {
    mockStore.loading.and.returnValue(false);
    mockStore.error.and.returnValue('Network error');
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent || '';
    expect(text).toContain('Network error');
  });

  it('renders forecast heading and forecast-list when store.forecast() has items', () => {
    mockStore.error.and.returnValue(null);
    mockStore.loading.and.returnValue(false);
    mockStore.city.and.returnValue('Cardiff');
    mockStore.forecast.and.returnValue(mockForecastData);

    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const h2 = el.querySelector('h2');
    expect(h2).toBeTruthy();
    expect(h2!.textContent).toContain('Forecast for Cardiff');
    expect(el.querySelector('app-forecast-list')).toBeTruthy();
  });

  it('does not throw when template is rendered for different store states', () => {
    mockStore.loading.and.returnValue(false);
    mockStore.error.and.returnValue(null);
    mockStore.forecast.and.returnValue([]);
    fixture.detectChanges();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
