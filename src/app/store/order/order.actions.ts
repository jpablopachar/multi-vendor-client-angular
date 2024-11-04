/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Payload
} from '@app/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const orderActions = createActionGroup({
  source: 'Order',
  events: {
    messageClear: emptyProps(),
    getAdminOrders: props<{ payload: Payload }>(),
    getAdminOrdersSuccess: props<{ response: any }>(),
  },
})