import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '@app/shared/models/pagination.model';
import { Bookmark } from '@app/shared/models/bookmark.model';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  /**
   * Pagination object containing all paging information.
   * @type {Pagination}
   */
  @Input() pagination: Pagination<Bookmark>;

  /**
   * Event emitter used to listen to page change events.
   * @param {string} pageChange Emits on page change event.
   */
  @Output() pageChange = new EventEmitter<number>();

  constructor() { }

  /**
   * Method to go to a specific page, ignored if already on given page.
   * @param {number} page Page number to go to.
   */
  setPage(page: number): void {
    // If page isn't current, emit pageChange event
    if (page !== this.pagination.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
