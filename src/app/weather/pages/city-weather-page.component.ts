import { Component, inject } from "@angular/core";
import { WeatherApiService } from "../services/weather.service";
import { NgFor, NgIf } from "@angular/common";
import { ComponentListState, LIST_STATE_VALUE } from "../../utils/list-state.type";
import { DailyForecast, WeatherForecast } from "../types/ForecastType";
import { CityDetailsType } from "../types/CityDetailsType";
import { DayAbbreviationPipe } from "../../pipes/day-abbreviation.pipe";
import { WeekForecastComponent } from "../components/week-forecast.component";

@Component({
    selector: 'app-city-weather-page',
    standalone: true,
    imports:[NgIf, NgFor, DayAbbreviationPipe, WeekForecastComponent],
    templateUrl: './city-weather-page.component.html',
    styleUrl: './city-weather-page.component.scss'
})
export class CityWeatherPageComponent {
    private weatherService = inject(WeatherApiService)
    public name: any
    public location: { latitude: number; longitude: number } | null = null;
    listState: ComponentListState<WeatherForecast> = { state: LIST_STATE_VALUE.IDLE };
    listStateValue = LIST_STATE_VALUE;
    weatherIcon: string = ''
    weekForecast: DailyForecast[] = [];

    ngOnInit() {
        this.getLocation()
        console.log(this.getIcon('04d'))
        // const iconCode = '10d';
        // this.weatherIcon = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
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

      getForecastWeatherData(lat: number, lon: number) {
        this.weatherService.getForecastWeatherData(String(lat), String(lon)).subscribe(
            (response: WeatherForecast)=>{
                console.log(response)
                this.listState = {
                    state: LIST_STATE_VALUE.SUCCESS,
                    resultObj: response,
                };
                console.log(this.listState)
                this.weekForecast = this.getWeekForcast(this.listState.resultObj.list);
                console.log(this.weekForecast)
                this.weatherService.getIcon(response.list[0].weather[0].icon).subscribe(
                    (weatherIcon: string)=>{
                        this.weatherIcon = weatherIcon
                    }
                )
            }
        )
      }

      getIcon(iconCode: string): string {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      }

      getWeekForcast(list: any[]): any[] {
        const result: any[] = [];
        const groupedByDate: { [date: string]: any[] } = {};
    
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
}