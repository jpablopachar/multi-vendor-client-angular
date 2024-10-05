import {
  GetSellerMessagesResponse,
  SellerAdminMessageRequest,
  SellerAdminMessageResponse,
} from '@app/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const chatActions = createActionGroup({
  source: 'Chat',
  events: {
    messageClear: emptyProps(),
    updateMessage: emptyProps(),
    getSellerMessage: emptyProps(),
    getSellerMessagesSuccess: props<{ response: GetSellerMessagesResponse }>(),
    sendMessageSellerAdmin: props<{ request: SellerAdminMessageRequest }>(),
    sendMessageSellerAdminSuccess: props<{
      response: SellerAdminMessageResponse;
    }>(),
  },
});
