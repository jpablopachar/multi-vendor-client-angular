/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  GetSellerMessagesResponse,
  GetSellersResponse,
  Message,
  SellerAdminMessageRequest,
  SellerAdminMessageResponse
} from '@app/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const chatActions = createActionGroup({
  source: 'Chat',
  events: {
    messageClear: emptyProps(),
    updateMessage: emptyProps(),
    updateSellers: props<{ payload: any }>(),
    updateCustomers: props<{ payload: any }>(),
    updateAdminMessage: props<{ message: Message }>(),
    updateSellerMessage: props<{ message: Message }>(),
    getCustomers: props<{ sellerId: string }>(),
    getCustomersSuccess: props<{ response: any }>(),
    getSellerMessage: emptyProps(),
    getSellerMessagesSuccess: props<{ response: GetSellerMessagesResponse }>(),
    getSellers: emptyProps(),
    getSellersSuccess: props<{ response: GetSellersResponse }>(),
    sendMessageSellerAdmin: props<{ request: SellerAdminMessageRequest }>(),
    sendMessageSellerAdminSuccess: props<{
      response: SellerAdminMessageResponse;
    }>(),
  },
});
