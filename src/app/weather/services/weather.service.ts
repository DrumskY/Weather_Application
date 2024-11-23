import { Injectable, computed, inject, signal } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { EMPTY, Observable, catchError, delay, map, tap } from "rxjs";
import { WeatherForecast } from "../types/ForecastType";
import { CityDetailsType } from "../types/CityDetailsType";

export type TaskUpdatePayload = { done?: boolean; name?: string; urgent?: boolean };

export type LoadingState = {
  idle: boolean;
  loading: boolean;
  error:  null;
};

@Injectable({
  providedIn: "root",
})
export class WeatherApiService {
    private KEY = "2f7032e704615af4e6b7fc0df7eba04f"
    private forecastWeatherDataUrl = "https://api.openweathermap.org/data/2.5/forecast";
    private cityDetailsUrl = "http://api.openweathermap.org/geo/1.0/direct"

    // private iconUrl = "https://openweathermap.org/img/wn/"
    // private iconUrl = "http://api.openweathermap.org/data/2.5/weather"

    private http = inject(HttpClient);

    getCityDetails(name: string) {
        return this.http.get<CityDetailsType[]>(this.cityDetailsUrl + '?q=' + name +'&appid=' + this.KEY)
    }

    // getCityForecast(name: string) {
    //   return this.http.get<any>(this.iconUrl + '?q=' + name +'&appid=' + this.KEY)
    // }

    getIcon(iconCode: string): Observable<string> {
      const url = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
      return this.http.get(url, { responseType: 'blob' }).pipe(
        map((blob) => {
          // Convert the blob into an object URL
          return URL.createObjectURL(blob);
        })
      );
    }

    getForecastWeatherData(lat: string, lon: string) {
      return this.http.get<WeatherForecast>(this.forecastWeatherDataUrl + '?lat=' + lat + '&lon=' + lon + '&cnt=40&units=metric' + '&appid=' + this.KEY)
    }

    getCurrentLocation(): Promise<GeolocationPosition> {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported by your browser'));
        } else {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => reject(error)
          );
        }
      });
    }
}