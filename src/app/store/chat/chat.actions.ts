/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  GetSellerMessagesResponse,
  Message,
  SellerAdminMessageRequest,
  SellerAdminMessageResponse,
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
    getSellerMessage: emptyProps(),
    getSellerMessagesSuccess: props<{ response: GetSellerMessagesResponse }>(),
    sendMessageSellerAdmin: props<{ request: SellerAdminMessageRequest }>(),
    sendMessageSellerAdminSuccess: props<{
      response: SellerAdminMessageResponse;
    }>(),
  },
});
