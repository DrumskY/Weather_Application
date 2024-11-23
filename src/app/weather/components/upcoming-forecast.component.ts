import { NgFor } from "@angular/common";
import { Component, Input } from "@angular/core";
import { DailyForecast } from "../types/ForecastType";
import { FormatDateTimePipe } from "../../pipes/format-date-time.pipe";

@Component({
    selector: 'app-upcoming-forecast',
    standalone: true,
    imports:[NgFor, FormatDateTimePipe],
    template: `
        <h1 class="pl-4 subtitles color-grey">Upcomming Forecast</h1>
        <div class="flex flex-row justify-between items-center h-5/6 flex-nowrap">
            <div *ngFor="let forecast of upcomingForecast; let last = last" class="flex flex-col justify-center items-center p-4">
                <div>
                    <span class="block subtitles color-grey">{{ forecast.dt_txt | formatDateTime }}</span>
                </div>
                <div>
                    <img [src]="getIcon(forecast.weather[0].icon)" alt="Weather Icon"  />
                </div>
                <div class="block subtitles color-grey">
                    <span>{{ forecast.main.temp }}°C</span>
                </div>
            </div>
        </div>
        
    `,
    styles:[
        `.titles {
            font-family: "Rubik" sans-serif;
            font-weight: 700;
            font-size: 40px;
            line-height: 46px;
        }
        .color-white {
            color: #D1D5DB;
        }
        .color-grey {
            color: #4B5563;
        }
        .subtitles {
            font-family: "Rubik" sans-serif;
            font-weight: 600;
            font-size: 20px;
            line-height: 46px;
        }`
    ]
})
export class UpcomingForecastComponent {
    @Input() upcomingForecast: DailyForecast[] = []

    getIcon(iconCode: string): string {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }
}