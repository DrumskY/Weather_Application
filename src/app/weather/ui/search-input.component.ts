import { Component, EventEmitter, Output } from "@angular/core"

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
    `
})
export class SearchInputComponent {
    @Output() name = new EventEmitter<{ name: string }>();

    emitInputValue(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value;
        this.name.emit({ name: inputValue });
    }
}