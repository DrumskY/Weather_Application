import { Component, inject } from "@angular/core";
import { SearchService } from "../../services/search.service";

@Component({
    selector: 'app-cities-page',
    standalone: true,
    imports:[],
    templateUrl: './cities-page.component.html',
    styleUrl: './cities-page.component.scss'
})
export class CitiesPageComponent {
    private searchService = inject(SearchService)
    
    ngOnInit() {
        this.searchService.searchEvent$.subscribe((query)=>{
            console.log(query)
        })
    }
}