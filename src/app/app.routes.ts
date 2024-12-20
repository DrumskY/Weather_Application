import { Routes } from '@angular/router';
import { CityWeatherPageComponent } from './weather/pages/weather/city-weather-page.component';
import { CitiesPageComponent } from './weather/pages/cities/cities-page.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "weather",
        pathMatch: "full",
    },
    {
        path: "weather",
        component: CityWeatherPageComponent,
    },
    {
        path: "cities",
        component: CitiesPageComponent,
    },
    {
        path: "**",
        redirectTo: "weather",
    },
];
