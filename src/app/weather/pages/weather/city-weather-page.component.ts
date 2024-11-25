import { Component, inject } from "@angular/core";
import { WeatherApiService } from "../../services/weather.service";
import { CommonModule, NgIf } from "@angular/common";
import { ComponentListState, LIST_STATE_VALUE } from "../../../utils/list-state.type";
import { WeatherForecast } from "../../types/ForecastType";
import { CityDetailsType } from "../../types/CityDetailsType";
import { UpcomingForecastComponent } from "../../components/upcoming-forecast.component";
import { AirConditionsComponent } from "../../components/air-conditions.component";
import { WeekForecastComponent } from "../../components/week-forecast.component";
import { SearchService } from "../../services/search.service";
import { SearchInputComponent } from "../../ui/search-input.component";
import { SeeMoreComponent } from "../../components/see-more.component";

@Component({
    selector: 'app-city-weather-page',
    standalone: true,
    imports: [NgIf, UpcomingForecastComponent, AirConditionsComponent, WeekForecastComponent, CommonModule, SearchInputComponent, SeeMoreComponent],
    templateUrl: './city-weather-page.component.html',
    styleUrl: './city-weather-page.component.scss'
})
export class CityWeatherPageComponent {
    private weatherService = inject(WeatherApiService)
    private searchService = inject(SearchService)

    public location: { latitude: number; longitude: number } | null = null;
    public listState: ComponentListState<WeatherForecast> = { state: LIST_STATE_VALUE.IDLE };
    public listStateValue = LIST_STATE_VALUE;
    public selectForecastDay: number = 0;
    public showMoreContent = false;

    ngOnInit(): void {
        this.getLocation()
        this.searchService.searchEvent$.subscribe(query => {
          if(query!='') {
            this.listState = { state: LIST_STATE_VALUE.IDLE };
            this.performSearch(query);
          }
        });
    }

    performSearch(query: string): void {
      this.weatherService.getCityDetails(query).subscribe((response: CityDetailsType[])=>{
        this.getForecastWeatherData(response[0].lat, response[0].lon)
        this.showMoreContent = false
      })
    }

    handleForecastIndex(index: number): void {
      this.selectForecastDay = index
      this.showMoreContent = false
    }

    handleSeeMore(): void {
      this.showMoreContent = true
    }

    getLocation(): void {
        this.listState = { state: LIST_STATE_VALUE.LOADING };
        this.weatherService.getCurrentLocation()
          .then(position => {
            this.getForecastWeatherData(position.coords.latitude, position.coords.longitude)
          })
          .catch(error => {
            this.weatherService.getCityDetails('Chicago').subscribe((response: CityDetailsType[])=>{
                this.getForecastWeatherData(response[0].lat, response[0].lon)
            })
          });
      }

      getForecastWeatherData(lat: number, lon: number): void {
        this.weatherService.getForecastWeatherData(String(lat), String(lon)).subscribe({
          next: (response) => {
            this.listState = {
              state: LIST_STATE_VALUE.SUCCESS,
              resultObj: response,
            };
            console.log(this.listState)
          },
          error: (err) => {
            this.listState = {
              state: LIST_STATE_VALUE.ERROR,
              error: err,
            };
          },
        })
      }

      getIcon(iconCode: string): string {
        return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
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