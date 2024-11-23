export interface WeatherForecast {
    city: City;
    cod: string;
    message: number;
    cnt: number;
    list: DailyForecast[];
  }
  
  export interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
  }
  
  export interface Coord {
    lon: number;
    lat: number;
  }
  
  export interface DailyForecast {
    dt: number; // Unix timestamp]
    dt_txt: string;
    main: Main;
    sunrise: number; // Unix timestamp
    sunset: number; // Unix timestamp
    temp: Temperature;
    feels_like: FeelsLike;
    pressure: number;
    humidity: number;
    weather: Weather[];
    speed: number;
    deg: number;
    gust: number;
    clouds: number;
    pop: number;
    rain?: {
      [key: string]: string;
    };
    wind: Wind;
  }

  export interface Wind {
    deg: number;
    gust: number;
    speed: number;
  }

  export interface Main {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  }
  
  export interface Temperature {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  }
  
  export interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
  }
  
  export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }