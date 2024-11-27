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
import { Subscription } from "rxjs";

@Component({
    selector: 'app-city-weather-page',
    imports: [NgIf, UpcomingForecastComponent, AirConditionsComponent, WeekForecastComponent, CommonModule, SearchInputComponent, SeeMoreComponent],
    standalone: true,
    templateUrl: './city-weather-page.component.html',
    styleUrl: './city-weather-page.component.scss'
})
export class CityWeatherPageComponent {
    private weatherService = inject(WeatherApiService)
    private searchService = inject(SearchService)

    private subscription: Subscription = new Subscription();

    public location: { latitude: number; longitude: number } | null = null;
    public listState: ComponentListState<WeatherForecast> = { state: LIST_STATE_VALUE.IDLE };
    public listStateValue = LIST_STATE_VALUE;
    public selectForecastDay: number = 0;
    public showMoreContent = false;

    ngOnInit(): void {
        this.getLocation()
        const searchSub = this.searchService.searchEvent$.subscribe(query => {
          if (query !== '') {
            this.performSearch(query);
          }
        });
    
        this.subscription.add(searchSub);
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    performSearch(query: string): void {
      this.weatherService.getCityDetails(query).subscribe((response: CityDetailsType[])=>{
        if(response.length!=0) {
          this.listState = { state: LIST_STATE_VALUE.IDLE };
          this.getForecastWeatherData(response[0].lat, response[0].lon)
          this.showMoreContent = false
        } else {
          alert('the name you specified was not found')
        }
      })
    }

    handleForecastIndex(index: number): void {
      this.selectForecastDay = index
      this.showMoreContent = false
    }

    handleSeeMore(): void {
      this.showMoreContent = true
    }

    async getLocation(): Promise<void> {
      try {
        this.listState = { state: LIST_STATE_VALUE.LOADING };
    
        const position = await this.weatherService.getCurrentLocation();
    
        await this.getForecastWeatherData(position.coords.latitude, position.coords.longitude);
      } catch (error) {
        console.warn('Nie udało się uzyskać lokalizacji użytkownika.', error);
    
        try {
          const response = await this.weatherService.getCityDetails('Chicago').toPromise();
    
          if (response && response.length > 0) {
            const chicagoDetails = response[0];
            await this.getForecastWeatherData(chicagoDetails.lat, chicagoDetails.lon);
          } else {
            console.error('Nie udało się pobrać danych o mieście');
          }
        } catch (cityError) {
          console.error('Wystąpił błąd podczas ładowania danych dla miasta', cityError);
        }
      }
    }

      getForecastWeatherData(lat: number, lon: number): void {
        this.weatherService.getForecastWeatherData(String(lat), String(lon)).subscribe({
          next: (response) => {
            this.listState = {
              state: LIST_STATE_VALUE.SUCCESS,
              result: response,
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
        if (!rain || Object.keys(rain).length === 0) {
          return 0;
        }
        const firstKey = Object.keys(rain)[0];
        const percent = Number(rain[firstKey]) * 100
        const percentToFixed = Number(percent.toFixed(0))
        return percentToFixed;
      }
}