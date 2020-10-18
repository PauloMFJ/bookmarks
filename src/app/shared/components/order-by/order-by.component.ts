import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-order-by',
  templateUrl: './order-by.component.html',
  styleUrls: ['./order-by.component.scss']
})
export class OrderByComponent {

  /**
   * Defines current ordering.
   * @param {string}
   */
  orderBy: string;

  /**
   * Label of selected order, DEFAULTS to 'Recently Added (New to Old)'.
   * @param {string}
   */
  label = 'Recently Added (New to Old)';

  /**
   * Method used to define if dropdown is show (true) or not (false).
   * @type {Boolean}
   */
  show = false;

  @Output() orderByChanged = new EventEmitter<string>();

  constructor() { }

  /**
   * Method used to toggle if dropdown is shown or not.
   */
  toggleDropdown(): void {
    this.show = !this.show;
  }

  /**
   * Method to order by newest to oldest.
   * @param {string} orderBy Ordering to emit.
   * @param {string} label   Label used to show selected.
   */
  setOrderBy(orderBy: string, label: string): void {
    this.orderBy = orderBy;
    this.label = label;
    this.orderByChanged.emit(orderBy);
  }

  // TODO: Implement outside click close event listener
}
