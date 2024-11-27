import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    standalone: true,
    template: `
    <div class="main-container flex flex-wrap lg:flex-nowrap p-4 gap-4 max-w-screen h-screen overflow-auto">
      <div class="bg-[rgb(32,43,59)] rounded-lg w-[6rem] menu-container">
        <div class="flex flex-col gap-6">
          <div class="text-center nav-element-logo pt-3 pb-3">
            <i class="fa-solid fa-cloud-sun"></i>
          </div>
          <div class="flex flex-col text-center nav-element" routerLink="/weather" >
            <i class="fa-solid fa-cloud-sun-rain"></i>
            <span routerLinkActive="font-bold">Weather</span>
          </div>
          <div class="flex flex-col text-center nav-element" routerLink="/cities">
            <i class="fa-solid fa-list-check"></i>
            <span routerLinkActive="font-bold">Cities</span>
          </div>
        </div>
      </div>
      
      <div class=" flex-1">
          <router-outlet></router-outlet>
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
    @media screen and (max-width:1200px) {
      .router-container div {
          width: 100%;
      }
    }
    @media screen and (max-width:485px) {
      .menu-container {
          width: 100%;
      }
    }
  `]
})
export class AppComponent {
  title = 'Weather Application';
  private router = inject(Router);

  constructor() {
    this.router.navigateByUrl;
  }
}
