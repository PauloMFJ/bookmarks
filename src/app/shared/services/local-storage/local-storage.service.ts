import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * Method to remove an item by key from localStorage.
   * @param {string} key Unique item key to remove.
   */
  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Returns current JSON value associated with given key, or any empty
   *     array if the key does not exist in localStorage.
   * @param {string} key Unique key to get.
   * @return {any}
   */
  public getItem(key: string): any {
    // Get item from storage
    const item = localStorage.getItem(key);

    // If item exists, parse to JSON, else return empty array
    return item ? JSON.parse(localStorage.getItem(key)) : [];
  }

  /**
   * Method to save new item to localStorage.
   * @param {string} key   Unique item key of item to save.
   * @param {any}    value Data to save.
   */
  public save(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

}
