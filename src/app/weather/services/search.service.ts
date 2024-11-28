import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchEvent = new Subject<string>();

  searchEvent$ = this.searchEvent.asObservable();

  emitSearch(name: string) {
    this.searchEvent.next(name);
  }
}
