import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherApiService } from './weather/services/weather.service';
import { SearchInputComponent } from "./weather/ui/search-input.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchInputComponent],
  template: `
    <div class="flex h-screen p-4 gap-4">
      <div class="bg-[rgb(32,43,59)] rounded-lg  w-[6rem]">
        <div class="flex flex-col gap-6">
          <div class="text-center nav-element-logo pt-3 pb-3">
            <i class="fa-solid fa-cloud-sun"></i>
          </div>
          <div class="flex flex-col text-center nav-element">
            <i class="fa-solid fa-cloud-sun-rain"></i>
            <a routerLink="/tasks" routerLinkActive="font-bold">Weather</a>
          </div>
          <div class="flex flex-col text-center nav-element">
            <i class="fa-solid fa-list-check"></i>
            <a routerLink="/tasks" routerLinkActive="font-bold">Cities</a>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col w-full gap-4">
        <div class="bg-[rgb(32,43,59)] rounded-lg p-2 pl-4 w-1/2">
           <app-search-input
           ></app-search-input>
        </div>
        <div class="flex-1 overflow-hidden">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .nav-element-logo {
      font-weight: bold;
      font-size:35px;
      color: #D1D5DB;
    }
    .nav-element {
      cursor: pointer;
      color: #4B5563;
      font-weight: bold;
      font-size:15px
    }  
    .nav-element:hover {
      color: #D1D5DB;
    }
  `],
})
export class AppComponent {
  title = 'Weather Application';
}
