import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherApiService } from './weather/services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
          <input type="text" placeholder="Search for cities" class="search-input">
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
    .search-input {
      background: transparent;
      border: none;
      color: #D1D5DB;
      font-size: 16px;
      outline: none; 
      width: 100%
    }
    .search-input::placeholder{
      color: #D1D5DB;
      opacity: 0.7
    }
  `],
})
export class AppComponent {
  title = 'Weather Application';
}
