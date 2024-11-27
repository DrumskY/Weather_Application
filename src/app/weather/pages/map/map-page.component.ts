import { Component, inject } from "@angular/core";
import { SearchService } from "../../services/search.service";
import { WeatherApiService } from "../../services/weather.service";
import { LocalStorageService } from "../../services/local-storage.service";

@Component({
    selector: 'app-map-page',
    standalone: true,
    imports: [],
    templateUrl: './map-page.component.html',
    styleUrl: './map-page.component.scss'
})
export class MapPageComponent {
    private weatherService = inject(WeatherApiService)
    private searchService = inject(SearchService)
    private localStoreService = inject(LocalStorageService)

    ngOnInit(): void {
        console.log('siema')
    }
}