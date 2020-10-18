import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FadeAnimation } from '@app/shared/animations/fade.component';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  animations: [ FadeAnimation ],
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {

  /**
   * Displayed error message.
   * @type {string}
   */
  error: string;

  /**
   * FormControl of control to get errors from.
   * @type {FormControl}
   */
  @Input() control: FormControl;

  /**
   * Value changes subscription.
   * @type {Subscription}
   */
  subscription: Subscription;

  constructor() { }

  /**
   * ngOnInit after Inputs have loaded, allows us to check errors after input has loaded.
   */
  ngOnInit(): void {
    // Check errors on load
    this.getErrors_();

    // Listen to status changes events
    this.subscription = this.control.statusChanges.subscribe(() => this.getErrors_());
  }

  /**
   * Method used to unsubscribe from used subscription when instance is destroyed.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Method used to check and update errors if any exist, or set errors to 'null' if none.
   */
  private getErrors_(): void {
    const errors = this.control.errors;
      console.log(errors);
    if (errors) {
      // If field is empty
      if (errors.required) {
        this.error = 'Field is required.';
      }

      // If field length is greater than maxLength
      else if (errors.maxlength) {
        this.error = `The field can't contain more than ${errors.maxlength.requiredLength} characters.`;
      }
      // If invalid url
      else if (errors.invalidurl) {
        this.error = `Entered URL could not be retrieved. Please enter a valid URL such as '<b>https://www.bypaulo.design/</b>'.`;
      }

      // TODO: Has room to implement further errors...

      // If no error, remove error
      else {
        this.error = null;
      }
    }
  }

}
