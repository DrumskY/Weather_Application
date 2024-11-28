import { NgFor, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { DayAbbreviationPipe } from "../../pipes/day-abbreviation.pipe";
import { DailyForecast } from "../types/ForecastType";

@Component({
    selector: 'app-week-forecast',
    imports: [NgIf, NgFor, DayAbbreviationPipe],
    standalone: true,
    template: `
       <h1 class="text-white text-lg font-semibold mb-4 pl-10 pt-5 subtitles color-grey" *ngIf="!limitToThree">5-Day Forecast</h1>
       <h1 class="text-white text-lg font-semibold mb-4 pl-5 pt-5 subtitles color-grey" *ngIf="limitToThree">3-Day Forecast</h1>
        <div class="space-y-4 flex flex-col justify-between  p-5">
            <div *ngFor="let forecast of weekForecast; let last = last" (click)="findForecastIndex(forecast)" class="forecast-container flex flex-wrap items-center justify-between border-b border-gray-700 pb-2 last:border-none h-1/5"
                [class.forecast-day]="!limitToThree">
                <div class="">
                    <span class="block subtitles color-grey">{{ forecast.dt_txt | dayAbbreviation }}</span>
                </div>
                <div class="flex flex-wrap items-center gap-2  justify-center">
                    <img [src]="getIcon(forecast.weather[0].icon)" alt="Weather Icon"  />
                    <span class="subtitles color-white">{{ forecast.weather[0].main }}</span>
                </div>
                <div class="subtitles color-white text-right">
                    <span>{{ forecast.main.temp }}°C</span>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .titles {
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
        }
        .forecast-day {
            cursor: pointer
        }
        .forecast-day:hover div span {
            color: #D1D5DB;
            text-shadow: 1px 1px 2px #000, 0 0 1em #000, 0 0 0.2em #000;
            font-size: 21px;
        }
        @media screen and (max-width: 500px) {
            .forecast-container {
                justify-content: center
            }
        }
    `]
})
export class WeekForecastComponent {
    @Input() forecastList: DailyForecast[] = []
    @Input() limitToThree: boolean = false
    @Output() forecastIndex = new EventEmitter<number>()
    public weekForecast: DailyForecast[] = []

    ngOnInit() {
        this.weekForecast = this.getWeekForcast(this.forecastList, this.limitToThree)
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['forecastList'] || changes['limitToThree']) {
          this.weekForecast = this.getWeekForcast(this.forecastList, this.limitToThree);
        }
      }

    getWeekForcast(list: DailyForecast[], limitToThree: boolean): DailyForecast[] {
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
      
          if (limitToThree && result.length === 3) {
            break;
          }
        }

      
        return result;
      }
    
    getIcon(iconCode: string): string {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }

    findForecastIndex(forecast: DailyForecast) {
        let findForecast: number = this.forecastList.findIndex((item) => {
            return item.dt_txt === forecast.dt_txt;
        });
        this.forecastIndex.emit(findForecast)
    }
}