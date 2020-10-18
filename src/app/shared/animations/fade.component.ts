import { animate, state, style, transition, trigger } from '@angular/animations';

/**
 * Animation trigger used to fade in and out on a given expression on change.
 * @type {Trigger}
 */
export const FadeAnimation =
  trigger('fade', [
    /* On enter */
    transition(':enter', [
      /* From hidden */
      style({ opacity: 0 }),

      /* Animate in and show */
      animate(200, style({ opacity: 1 }))
    ]),

    /* On leave */
    transition(':leave', [
      /* From visibie, fade out to hidden */
      animate(200, style({ opacity: 0 }))
    ])
  ]);
