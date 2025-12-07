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
    tempMin: 10.2,
    tempMax: 20.5,
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

  it('renders the date, temperatures, wind and description in the template', () => {
    component.day = mockForecastData;
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;

    const dateEl = el.querySelector('.date');
    expect(dateEl).toBeTruthy();
    // date pipe formats to dd/MM/yy -> '06/12/25'
    expect(dateEl!.textContent).toContain('06/12/25');

    const iconEl = el.querySelector('img.icon') as HTMLImageElement | null;
    expect(iconEl).toBeTruthy();
    expect(iconEl!.src).toContain('/assets/icons/02d.png');

    // strong contains temperature label and rounded temp
    const strong = el.querySelector('strong');
    expect(strong).toBeTruthy();
    expect(strong!.textContent).toContain('Temprature:');
    expect(strong!.textContent).toMatch(/\d+\s*°C/);

    const windDiv = Array.from(el.querySelectorAll('div')).find((d) =>
      d.textContent?.includes('Wind:')
    );
    expect(windDiv).toBeTruthy();
    expect(windDiv!.textContent).toContain('Wind:');

    const desc = el.textContent || '';
    expect(desc).toContain('Partly Cloudy');
  });

  it('uses RoundPipe to round numeric values in the template', () => {
    component.day = {
      ...mockForecastData,
      temp: 15.7,
      tempMin: 10.2,
      tempMax: 20.5,
      windSpeed: 8.3,
    };
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    // Expect rounded values (15.7 -> 16, 10.2 -> 10, 20.5 -> 21, 8.3 -> 8)
    expect(el.textContent).toMatch(/16\s*°C/);
    expect(el.textContent).toMatch(/10\s*°C/);
    expect(el.textContent).toMatch(/21/);
    expect(el.textContent).toMatch(/Wind:\s*8\s*m\/s/);
  });
});
