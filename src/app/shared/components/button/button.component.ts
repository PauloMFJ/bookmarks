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
   * @type {string}
   */
  @Input() type: 'clear' | 'white' | 'light' | 'danger' = 'clear';

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
   * Event emitter used to listen to click and keyup.enter events.
   * @param {boolean} clicked Emits on click event.
   */
  @Output() clicked = new EventEmitter<boolean>();

  constructor() { }

  /**
   * Method to emit a (clicked) event, ignored if disabled is true.
   */
  onClick() {
    if (!this.disabled) {
      this.clicked.emit(true);
    }
  }
}
