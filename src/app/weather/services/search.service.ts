import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchEvent = new Subject<string>();

  // Observable do subskrybowania
  searchEvent$ = this.searchEvent.asObservable();

  // Metoda do publikowania wartości
  emitSearch(name: string) {
    this.searchEvent.next(name);
  }
}
