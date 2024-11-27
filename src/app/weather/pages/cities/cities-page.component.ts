import { Component, inject } from "@angular/core";
import { SearchService } from "../../services/search.service";
import { SearchInputComponent } from "../../ui/search-input.component";
import { CityCardItemComponent } from "../../components/city-card-item.component";
import { Subscription } from "rxjs";
import { ComponentListState, LIST_STATE_VALUE } from "../../../utils/list-state.type";
import { CityDetailsType } from "../../types/CityDetailsType";
import { WeatherForecast } from "../../types/ForecastType";
import { WeatherApiService } from "../../services/weather.service";
import { LocalStorageService } from "../../services/local-storage.service";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { UpcomingForecastComponent } from "../../components/upcoming-forecast.component";
import { WeekForecastComponent } from "../../components/week-forecast.component";

@Component({
    selector: 'app-cities-page',
    standalone: true,
    imports: [NgIf, NgFor, SearchInputComponent, CityCardItemComponent, UpcomingForecastComponent, CommonModule, WeekForecastComponent],
    templateUrl: './cities-page.component.html',
    styleUrl: './cities-page.component.scss'
})
export class CitiesPageComponent {
    private weatherService = inject(WeatherApiService)
    private searchService = inject(SearchService)
    private localStorageService = inject(LocalStorageService)
    
    private subscription: Subscription = new Subscription();

    public location: { latitude: number; longitude: number } | null = null;
    public listState: ComponentListState<WeatherForecast> = { state: LIST_STATE_VALUE.IDLE };
    public listStateValue = LIST_STATE_VALUE;
    public citiesArray:WeatherForecast[] = []
    public selectedIndex: number = 0;
    
    ngOnInit() {
        this.loadData()
        if(this.citiesArray.length===0) {
            this.getLocation()
        } else {
          this.listState = {
            state: LIST_STATE_VALUE.ARRAY_SUCCESS,
            result: this.citiesArray,
          };
        }
        const searchSub = this.searchService.searchEvent$.subscribe((query)=>{
          this.performSearch(query)
        })

        this.subscription.add(searchSub);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    onCardSelected(index: number): void {
      this.selectedIndex = index
      const selectedCity = this.citiesArray[index];
    }

    performSearch(query: string): void {
      this.weatherService.getCityDetails(query).subscribe((response: CityDetailsType[])=>{
        if(response.length!=0) {
          this.listState = { state: LIST_STATE_VALUE.IDLE };
          this.getForecastWeatherData(response[0].lat, response[0].lon)
        } else {
          alert('the name you specified was not found')
        }
      })
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
            const isCityExist = this.citiesArray.some((city) => city.city.coord.lat === response.city.coord.lat && city.city.coord.lon === response.city.coord.lon);
            if (!isCityExist) {
              if (this.citiesArray.length >= 4) {
                this.citiesArray.shift();
              }
              this.citiesArray.push(response);
      
              this.listState = {
                state: LIST_STATE_VALUE.ARRAY_SUCCESS,
                result: this.citiesArray,
              };
      
              this.saveData();
            } else {
              this.listState = {
                state: LIST_STATE_VALUE.ARRAY_SUCCESS,
                result: this.citiesArray,
              };
            }
          },
          error: (err) => {
            this.listState = {
              state: LIST_STATE_VALUE.ERROR,
              error: err,
            };
          },
        })
    }

    getTimeFromTimezone(offsetInSeconds: number): string {
      const now = new Date();
    
      // Oblicz przesunięcie w milisekundach
      const offsetInMilliseconds = offsetInSeconds * 1000;
    
      // Dodaj przesunięcie do aktualnego czasu UTC
      const localTime = new Date(now.getTime() + offsetInMilliseconds);
    
      // Wyciągnij godziny i minuty
      const hours = localTime.getUTCHours();
      const minutes = localTime.getUTCMinutes();
    
      // Sformatuj do HH:MM
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;
    
      return formattedTime;
    }

    getRainChance(rain?: { [key: string]: string }): number {
      // Jeśli rain jest undefined lub pusty, zwróć '0'
      if (!rain || Object.keys(rain).length === 0) {
        return 0;
      }

      // Jeśli rain zawiera dane, zwróć wartość pierwszego klucza
      const firstKey = Object.keys(rain)[0];
      const percent = Number(rain[firstKey]) * 100
      const percentToFixed = Number(percent.toFixed(0))
      return percentToFixed;
    }

    getIcon(iconCode: string): string {
      return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    }

    saveData() {
        this.localStorageService.saveArray(this.citiesArray);
    }

    loadData() {
        this.citiesArray = this.localStorageService.getArray();
    }
    
    clearData() {
        this.localStorageService.clearArray();
    }
}