import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  searchTerm: string;

  /**
   * Placeholder string to show in search bar, DEFAULTS to 'Search...'.
   */
  @Input() placeholder = 'Seach...';

  @Output() searchChangedEvent = new EventEmitter<string>();

  constructor() { }

  /**
   * Method to emit a (searchChangedEvent) on search.
   * @param {string} searchTerm Search term to emit.
   */
  onSearchChanged = (searchTerm: string) => this.searchChangedEvent.emit(searchTerm);

}
