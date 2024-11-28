import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'citiesArray'; // Klucz używany w Local Storage

  constructor() {}

  saveArray(array: any[]): void {
    const json = JSON.stringify(array);
    localStorage.setItem(this.storageKey, json);
  }

  getArray(): any[] {
    const json = localStorage.getItem(this.storageKey);
    return json ? JSON.parse(json) : [];
  }

  clearArray(): void {
    localStorage.removeItem(this.storageKey);
  }
}