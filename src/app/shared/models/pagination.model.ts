import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Model class used to define a new generic pagination object of type T.
 */
export class Pagination<T> {

    /**
     * Full list of items to paginate.
     * @type {Array<T>}
     */
    totalItems: Array<T>;

    /**
     * Current page to show.
     * @type {number}
     */
    currentPage: number;

    /**
     * Total items to show per page.
     * @type {number}
     */
    itemsPerPage: number;

    /**
     * Total pages based on totalItems and itemsPerPage.
     * @type {number}
     */
    totalPages: number;

    /**
     * Current page of items to show.
     */
    pagedList: Array<T>;

    /**
     * Defines page numbers to show in paginator.
     * @type {number}
     */
    paginatorList: number[];

    /**
     * Contructor used to create new Pagination object.
     * @param {Array<T>} totalItems    Full list of items to paginate.
     * @param {number}   currentPage   Current page to show.
     * @param {number}   itemsPerPage  Total items to show per page.
     * @param {number}   totalPages    Total pages based on totalItems and itemsPerPage.
     * @param {Array<T>} pagedList     Current page of items to show.
     * @param {number[]} paginatorList Defines page numbers to show in paginator.
     */
    constructor(
        totalItems: Array<T>,
        currentPage: number,
        itemsPerPage: number,
        totalPages: number,
        pagedList: Array<T>,
        paginatorList: number[]) {
      this.totalItems = totalItems;
      this.currentPage = currentPage;
      this.itemsPerPage = itemsPerPage;
      this.totalPages = totalPages;
      this.pagedList = pagedList;
      this.paginatorList = paginatorList;
    }

}
