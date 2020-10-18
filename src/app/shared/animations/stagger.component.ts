import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

/**
 * Animation trigger used to stagger fade in a given expression on change.
 * @type {Trigger}
 */
export const StaggerAnimation =
  trigger('stagger', [
    /* From start to end */
    transition('* => *', [

      /* On enter */
      query(':enter', [
        /* From hidden, and slightly offset upwards */
        style({ opacity: 0, transform: 'translateY(-4px)'}),

        /* Stagger fade in and show */
        stagger('60ms', [
          animate(200, style({
            opacity: 1,
            transform: 'translateY(0px)'
          }))
        ])
      ],

      /* Prevent this from erroring if null */
      { optional: true }),

      // TODO: Re-implement with better overview.component error handling
      // /* On leave */
      // query(':leave', [
      //   /* Fade out and hide */
      //   animate(200, style({
      //     opacity: 0,
      //     transform: 'translateY(-4px)'
      //   }))
      // ],
      // /* Prevent this from erroring if null */
      // { optional: true }),
    ]),
  ]);
