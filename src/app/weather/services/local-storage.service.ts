import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageKey = 'citiesArray'; // Klucz używany w Local Storage

  constructor() {}

  /**
   * Zapisuje tablicę w Local Storage.
   * @param array Tablica do zapisania.
   */
  saveArray(array: any[]): void {
    const json = JSON.stringify(array);
    localStorage.setItem(this.storageKey, json);
  }

  /**
   * Pobiera tablicę z Local Storage.
   * @returns Tablica pobrana z Local Storage lub pusta tablica, jeśli brak danych.
   */
  getArray(): any[] {
    const json = localStorage.getItem(this.storageKey);
    return json ? JSON.parse(json) : [];
  }

  /**
   * Czyści dane zapisane pod danym kluczem w Local Storage.
   */
  clearArray(): void {
    localStorage.removeItem(this.storageKey);
  }
}