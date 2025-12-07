import { TestBed, ComponentFixture } from '@angular/core/testing';
import { App } from './app';
import { CitySelector } from './components/city-selector/city-selector';
import { WeatherContainer } from './components/weather-container/weather-container';
import { WeatherStore } from './weather.store';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;
  let mockWeatherStore: jasmine.SpyObj<WeatherStore>;

  beforeEach(async () => {
    mockWeatherStore = jasmine.createSpyObj('WeatherStore', ['setCity']);

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: WeatherStore, useValue: mockWeatherStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create the app', () => {
      expect(app).toBeTruthy();
    });
  });
});
