import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  /**
   * Current value of search bar.
   * @type {string}
   */
  searchTerm: string;

  /**
   * Placeholder string to show in search bar, DEFAULTS to 'Search...'.
   * @type {string}
   */
  @Input() placeholder = 'Seach...';

  /**
   * Event emitter used to listen to search change events.
   * @param {string} searchChanged Emits on search change event.
   */
  @Output() searchChanged = new EventEmitter<string>();

  constructor() { }

  /**
   * Method to emit a (searchChanged) event.
   * @param {string} searchTerm Search term to emit.
   */
  onSearchChanged(searchTerm: string): void {
    this.searchChanged.emit(searchTerm);
  }

}
