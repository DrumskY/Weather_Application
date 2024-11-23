import { Component, inject } from "@angular/core";
import { WeatherApiService } from "../services/weather.service";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { ComponentListState, LIST_STATE_VALUE } from "../../utils/list-state.type";
import { DailyForecast, WeatherForecast } from "../types/ForecastType";
import { CityDetailsType } from "../types/CityDetailsType";
import { DayAbbreviationPipe } from "../../pipes/day-abbreviation.pipe";
import { UpcomingForecastComponent } from "../components/upcoming-forecast.component";
import { AirConditionsComponent } from "../components/air-conditions.component";
// import { WeekForecastComponent } from "../components/week-forecast.component";

@Component({
    selector: 'app-city-weather-page',
    standalone: true,
    imports:[NgIf, NgFor, DayAbbreviationPipe, UpcomingForecastComponent, AirConditionsComponent, CommonModule ],
    templateUrl: './city-weather-page.component.html',
    styleUrl: './city-weather-page.component.scss'
})
export class CityWeatherPageComponent {
    private weatherService = inject(WeatherApiService)
    public location: { latitude: number; longitude: number } | null = null;
    public listState: ComponentListState<WeatherForecast> = { state: LIST_STATE_VALUE.IDLE };
    public listStateValue = LIST_STATE_VALUE;
    public weekForecast: DailyForecast[] = [];

    ngOnInit(): void {
        this.getLocation()
    }

    getLocation(): void {
        this.listState = { state: LIST_STATE_VALUE.LOADING };
        this.weatherService.getCurrentLocation()
          .then(position => {
            // console.log(position)
            // this.weatherService.getCityForecast('Chicago').subscribe((response: CityDetailsType[])=>{

            //     console.log(response)
            // })
            this.getForecastWeatherData(position.coords.latitude, position.coords.longitude)
          })
          .catch(error => {
            this.weatherService.getCityDetails('Chicago').subscribe((response: CityDetailsType[])=>{
                this.getForecastWeatherData(response[0].lat, response[0].lon)
            })
          });
      }

      getForecastWeatherData(lat: number, lon: number): void {
        this.weatherService.getForecastWeatherData(String(lat), String(lon)).subscribe(
            (response: WeatherForecast)=>{
                this.listState = {
                    state: LIST_STATE_VALUE.SUCCESS,
                    resultObj: response,
                };
                console.log(this.listState)
                this.weekForecast = this.getWeekForcast(this.listState.resultObj.list);
            }
        )
      }

      getIcon(iconCode: string): string {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      }

      getWeekForcast(list: DailyForecast[]): DailyForecast[] {
        const result: DailyForecast[] = [];
        const groupedByDate: { [date: string]: DailyForecast[] } = {};
    
        // Group entries by date
        list.forEach((entry) => {
          const date = entry.dt_txt.split(' ')[0]; // Extract date (YYYY-MM-DD)
          if (!groupedByDate[date]) {
            groupedByDate[date] = [];
          }
          groupedByDate[date].push(entry);
        });
    
        // For each date, find the entry closest to 12:00
        for (const date in groupedByDate) {
          const entries = groupedByDate[date];
          let selectedEntry = entries[0]; // Default to the first entry
          for (const entry of entries) {
            if (entry.dt_txt.includes('12:00:00')) {
              selectedEntry = entry; // Prefer entry at 12:00
              break;
            }
          }
          result.push(selectedEntry);
        }
    
        return result;
      }

      getRainChance(rain?: { [key: string]: string }): number {
        // Jeśli rain jest undefined lub pusty, zwróć '0'
        if (!rain || Object.keys(rain).length === 0) {
          return 0;
        }
  
        // Jeśli rain zawiera dane, zwróć wartość pierwszego klucza
        const firstKey = Object.keys(rain)[0];
        const percent = Number(rain[firstKey]) * 100
        return percent;
      }
}