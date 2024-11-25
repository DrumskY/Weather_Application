import { Component, inject } from "@angular/core"
import { SearchService } from "../services/search.service";

@Component({
    selector: 'app-search-input',
    standalone: true,
    imports:[],
    template: `
    <div class="bg-[rgb(32,43,59)] rounded-lg p-2 pl-4">
        <input 
            type="text" 
            placeholder="Search for cities" 
            class="search-input" 
            (keyup.enter)="emitInputValue($event)"
        />
    </div>
    `,
    styles:[`
        .search-input {
            background: transparent;
            border: none;
            color: #D1D5DB;
            font-size: 16px;
            outline: none; 
            width: 100%;
            box-sizing: border-box;
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