import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  /**
   * current - Used to identify what page is currently active.
   * @type {number}
   */
  @Input() current: number;

  /**
   * pages - Total number of pages to paginate.
   * @type {number}
   */
  @Input() total: number;

  /**
   * Event emitter used to listen to page change events.
   * @param {string} pageChange Emits on page change event.
   */
  @Output() pageChange = new EventEmitter<number>();

  constructor() { }

  /**
   * Method to go back a page, ignored if already on first page.
   */
  previous(): void {
    // If not first, set page
    if (this.current > 0) {
      this.setPage(this.current - 1);
    }
  }

  /**
   * Method to go forward a page, ignored if already on last page.
   */
  next(): void {
    // If not last, set page
    if (this.current < this.total - 1) {
      this.setPage(this.current + 1);
    }
  }

  /**
   * Method to go to a specific page, ignored if already on page.
   * @param {number} page Page number to go to.
   */
  setPage(page: number): void {
    // If page isn't current, set and emit pageChange event
    if (page !== this.current) {
      this.pageChange.emit(this.current = page);
    }
  }
}
