import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitySelector } from './city-selector';
import { WeatherStore } from '../../weather.store';
import { City } from '../../weather.model';

describe('CitySelector (standalone)', () => {
  let fixture: ComponentFixture<CitySelector>;
  let component: CitySelector;
  let mockStore: jasmine.SpyObj<WeatherStore>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('WeatherStore', ['setCity']);

    await TestBed.configureTestingModule({
      imports: [CitySelector],
      providers: [{ provide: WeatherStore, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(CitySelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('initializes with null selectedCity and correct cities list', () => {
    expect(component.selectedCity).toBeNull();
    expect(component.cities).toEqual(['Birmingham', 'London', 'Cardiff']);
  });

  it('calls store.setCity when onCityChange is invoked programmatically', () => {
    component.onCityChange('London');
    expect(mockStore.setCity).toHaveBeenCalledWith('London');

    component.onCityChange(null);
    expect(mockStore.setCity).toHaveBeenCalledWith(null);
  });
});
