import {
  GetSellersResponse,
  SellerAdminMessageRequest,
  SellerAdminMessageResponse
} from '@app/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const chatActions = createActionGroup({
  source: 'Chat',
  events: {
    messageClear: emptyProps(),
    updateMessage: emptyProps(),
    getSellers: emptyProps(),
    getSellersSuccess: props<{ response: GetSellersResponse }>(),
    sendMessageSellerAdmin: props<{ request: SellerAdminMessageRequest }>(),
    sendMessageSellerAdminSuccess: props<{
      response: SellerAdminMessageResponse;
    }>(),
  },
});
