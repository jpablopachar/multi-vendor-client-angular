/* eslint-disable @typescript-eslint/no-explicit-any */

import { inject } from '@angular/core'
import { OrderService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs'
import { orderActions } from './order.actions'

export const getAdminOrdersEffect = createEffect(
  (
    actions$ = inject(Actions),
    orderService: OrderService = inject(OrderService)
  ) => {
    return actions$.pipe(
      ofType(orderActions.getAdminOrders),
      switchMap(({ payload }) => {
        return orderService.getAdminOrders(payload).pipe(
          map((response: any) => {
            return orderActions.getAdminOrdersSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);
