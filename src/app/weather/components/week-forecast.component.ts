import { NgFor, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { DayAbbreviationPipe } from "../../pipes/day-abbreviation.pipe";
import { ComponentListState, LIST_STATE_VALUE } from "../../utils/list-state.type";
import { WeatherApiService } from "../services/weather.service";
import { WeatherForecast, DailyForecast } from "../types/ForecastType";

@Component({
    selector: 'app-week-forecast',
    standalone: true,
    imports:[NgIf, NgFor, DayAbbreviationPipe],
    template: '',
})
export class WeekForecastComponent {
    private weatherService = inject(WeatherApiService)
    public name: any
    public location: { latitude: number; longitude: number } | null = null;
    listState: ComponentListState<WeatherForecast> = { state: LIST_STATE_VALUE.IDLE };
    listStateValue = LIST_STATE_VALUE;
    weatherIcon: string = ''
    weekForecast: DailyForecast[] = [];

    ngOnInit() {

    }
}