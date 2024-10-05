import { inject } from '@angular/core'
import {
  GetSellersResponse,
  SellerAdminMessageResponse
} from '@app/models'
import { ChatService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs'
import { chatActions } from './chat.actions'

export const getSellersEffect = createEffect(
  (
    actions$ = inject(Actions),
    chatService: ChatService = inject(ChatService)
  ) => {
    return actions$.pipe(
      ofType(chatActions.getSellers),
      switchMap(() => {
        return chatService.getSellers().pipe(
          map((response: GetSellersResponse) => {
            return chatActions.getSellersSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);

export const sendMessageSellerAdminEffect = createEffect(
  (
    actions$ = inject(Actions),
    chatService: ChatService = inject(ChatService)
  ) => {
    return actions$.pipe(
      ofType(chatActions.sendMessageSellerAdmin),
      switchMap(({ request }) => {
        return chatService.sendMessageSellerAdmin(request).pipe(
          map((response: SellerAdminMessageResponse) => {
            return chatActions.sendMessageSellerAdminSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);
