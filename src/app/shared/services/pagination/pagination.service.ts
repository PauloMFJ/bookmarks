import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Pagination } from '@app/shared/models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class PaginationService<T> {

  /**
   * Pagination size.
   * @type {number}
   */
  private readonly itemsPerPage_ = environment.config.pagination.itemsPerPage;

  constructor() { }

  /**
   * Returns pagination object based on given array of total items, including
   *     pagedList, and paginatorNumbering.
   * @param  {Array<T>}   totalItems  Full list of items to paginate.
   * @param  {number}     currentPage Current page to show.
   * @return {Pagination}
   */
  getPagedList(totalItems: Array<T>, currentPage: number): Pagination<T> {
    // Calculate total pages
    const totalPages = Math.ceil(totalItems.length / this.itemsPerPage_);

    // Keep currentPage within page bounds
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number;
    let endPage: number;

    // If less than 5 total pages, show all
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
        // If currentPage is at start, show first 4 numbers
        if (currentPage <= 2) {
            startPage = 1;
            endPage = 4;
        }

        // If currentPage is at end, show last 4 numbers
        else if (currentPage + 1 >= totalPages) {
            startPage = currentPage - 3;
            endPage = totalPages;
        }

        // If currentPage is inbetween previous, show 5 numbers (2 before and 2 after currently selected)
        else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
    }

    // Based on start/end pages, create paginator number array
    const paginatorList = Array.from(Array((endPage + 1) - startPage).keys()).map((index) => startPage + index);

    // Get paged list start index based on currentPage * page size
    const pagedListStartIndex = (currentPage - 1) * this.itemsPerPage_;

    // Get paged list end index based on lowest value between previous pagedListStartIndex + page size and total items.
    //     Will equal total items length if its greater than available items per page, else, will equal
    //     pagedListStartIndex + page size
    const pagedListEndIndex = Math.min(pagedListStartIndex + this.itemsPerPage_, totalItems.length);

    // Get current paged list
    const pagedList = totalItems.slice(pagedListStartIndex, pagedListEndIndex);

    // Return new Pagination object containing all pagination properties
    return new Pagination(
        totalItems,
        currentPage,
        this.itemsPerPage_,
        totalPages,
        pagedList,
        paginatorList);
  }

}
