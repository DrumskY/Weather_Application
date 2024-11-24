import { Component, inject } from "@angular/core"
import { SearchService } from "../services/search.service";

@Component({
    selector: 'app-search-input',
    standalone: true,
    imports:[],
    template: `
        <input 
            type="text" 
            placeholder="Search for cities" 
            class="search-input" 
            (keyup.enter)="emitInputValue($event)"
        />
    `,
    styles:[`
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
    `]
})
export class SearchInputComponent {
    private searchService = inject(SearchService)

    emitInputValue(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const inputValue = inputElement.value;

        // Emit the input value
        this.searchService.emitSearch(inputValue);

        // Clear the input field
        inputElement.value = '';
    }
}