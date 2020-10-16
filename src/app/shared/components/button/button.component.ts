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
   *  - 'danger'
   * @type {string}
   */
  @Input() type: 'clear' | 'light' = 'clear';

  /**
   * If button is active (true), or not (false).
   * @type {boolean}
   */
  @Input() active: boolean;

  /**
   * Event emitter used to listen to click and keyup.enter events.
   * @param {string} pageChange Emits on selected event.
   */
  @Output() clicked = new EventEmitter();

  constructor() { }

  /**
   * Method to emit a (clicked) event.
   */
  onClick = () => this.clicked.emit();

}
