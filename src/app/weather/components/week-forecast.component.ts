import { NgFor } from "@angular/common";
import { Component, Input } from "@angular/core";
import { DayAbbreviationPipe } from "../../pipes/day-abbreviation.pipe";
import { DailyForecast } from "../types/ForecastType";

@Component({
    selector: 'app-week-forecast',
    standalone: true,
    imports:[NgFor, DayAbbreviationPipe],
    template: `
        <div *ngFor="let forecast of weekForecast; let last = last" class="flex items-center justify-between border-b border-gray-700 pb-2 last:border-none h-1/5">
            <div class="w-1/3">
                <span class="block subtitles color-grey">{{ forecast.dt_txt | dayAbbreviation }}</span>
            </div>
            <div class="flex items-center gap-2 w-1/3 justify-center">
                <!-- <img [src]="getIcon(forecast.weather[0].icon)" alt="Weather Icon"  /> -->
                <span class="subtitles color-white">{{ forecast.weather[0].main }}</span>
            </div>
            <div class="subtitles color-white w-1/3 text-right">
                <span>{{ forecast.main.temp }}°C</span>
            </div>
        </div>
    `,
})
export class WeekForecastComponent {
    @Input() weekForecast: DailyForecast[] = []
    // private weatherService = inject(WeatherApiService)
    // public name: any
    // public location: { latitude: number; longitude: number } | null = null;
    // listState: ComponentListState<WeatherForecast> = { state: LIST_STATE_VALUE.IDLE };
    // listStateValue = LIST_STATE_VALUE;
    // weatherIcon: string = ''
    // weekForecast: DailyForecast[] = [];

    ngOnInit() {
        // this.weekForecast = this.getWeekForcast()
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
}