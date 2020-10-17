import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  /**
   * Label to show inside button.
   * @type {string}
   */
  @Input() label: string;

  /**
   * Type of button, DEFAULTS to 'clear', supports following strings:
   *
   *  - 'clear'.
   *  - 'light'.
   *  - 'white'.
   *  - 'danger'
   *  - 'gradient'
   * @type {string}
   */
  @Input() type: 'clear' | 'white' | 'light' | 'danger' | 'gradient' = 'clear';

  /**
   * Button size, DEFAULTS to 'md', supports following strings:
   *
   *  - 'md'.
   *  - 'sm'.
   * @type {string}
   */
  @Input() size: 'md' | 'sm' = 'md';


  /**
   * If button is active (true), or not (false).
   * @type {boolean}
   */
  @Input() active: boolean;

  /**
   * If button is disabled (true), or not (false).
   * @type {boolean}
   */
  @Input() disabled: boolean;

  /**
   * Tabindex used to allow user to change button ordering.
   * @type {number}
   */
  @Input() tabIndex: number;

  /**
   * Used to stop click events from from bubbling up to parent
   *     elements or from capturing down to child elements.
   * @type {boolean}
   */
  @Input() stopPropagation: boolean;

  /**
   * Event emitter used to listen to click and keyup.enter events.
   * @param {boolean} clicked Emits on click event.
   */
  @Output() clicked = new EventEmitter<boolean>();

  constructor() { }

  /**
   * Method to emit a (clicked) event, ignored if disabled is true.
   * @param {any=} event Used to stopPropagation if enabled.
   */
  onClick(event?: any): void {
    // If stopPropagation is true, prevent clicks from bubbling
    if (event && this.stopPropagation) {
      event.stopPropagation();
    }

    // If button is not disabled, emit click event
    if (!this.disabled) {
      this.clicked.emit(true);
    }
  }
}
