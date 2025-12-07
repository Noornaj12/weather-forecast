export type City = 'London' | 'Birmingham' | 'Cardiff';

export type WeatherForecast = {
  date: string;
  temp: number;
  windSpeed: number;
  description: string;
  icon: string;
};

export type OpenWeatherResponse = {
  list: Array<{
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
  }>;
};
