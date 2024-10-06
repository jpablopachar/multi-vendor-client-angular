import { createFeature, createReducer, on } from '@ngrx/store'
import { chatActions } from './chat.actions'
import { ChatState } from './chat.state'

const chatInitialState: ChatState = {
  successMessage: '',
  errorMessage: '',
  customers: [],
  messages: [],
  activeCustomers: [],
  activeSellers: [],
  activeAdmin: '',
  friends: [],
  sellerAdminMessages: [],
  currentSeller: {},
  currentCustomer: {},
  sellers: [],
};

const chatFeature = createFeature({
  name: 'chat',
  reducer: createReducer(
    chatInitialState,
    on(chatActions.messageClear, (state: ChatState) => ({
      ...state,
      errorMessage: '',
      successMessage: '',
    })),
    on(chatActions.updateAdminMessage, (state: ChatState, { message }) => ({
      ...state,
      sellerAdminMessages: [...state.sellerAdminMessages, message],
    })),
    on(chatActions.getSellerMessage, (state: ChatState) => ({
      ...state,
    })),
    on(
      chatActions.getSellerMessagesSuccess,
      (state: ChatState, { response }) => ({
        ...state,
        sellers: response.messages,
      })
    ),
    on(chatActions.sendMessageSellerAdmin, (state: ChatState) => ({
      ...state,
    })),
    on(
      chatActions.sendMessageSellerAdminSuccess,
      (state: ChatState, { response }) => ({
        ...state,
        sellerAdminMessages: [...state.sellerAdminMessages, response.message],
        successMessage: 'Message sent successfully',
      })
    )
  ),
});

export const {
  name: chatFeatureKey,
  reducer: chatReducer,
  selectSellers,
  selectActiveSellers,
  selectSellerAdminMessages,
  selectCurrentSeller,
  selectSuccessMessage,
} = chatFeature;
