import { createFeature, createReducer, on } from '@ngrx/store'
import { orderActions } from './order.actions'
import { OrderState } from './order.status'

const orderInitialState: OrderState = {
  successMessage: '',
  errorMessage: '',
  totalOrders: 0,
  orders: [],
  order: {},
};

const orderFeature = createFeature({
  name: 'order',
  reducer: createReducer(
    orderInitialState,
    on(orderActions.messageClear, (state: OrderState) => ({
      ...state,
      errorMessage: '',
      successMessage: '',
    })),
    on(orderActions.getAdminOrders, (state: OrderState) => ({
      ...state,
    })),
    on(
      orderActions.getAdminOrdersSuccess,
      (state: OrderState, { response }) => ({
        ...state,
        orders: response.orders,
        totalOrders: response.totalOrders,
      })
    )
  ),
});

export const {
  name: orderFeatureKey,
  reducer: orderReducer,
  selectOrders,
  selectTotalOrders,
} = orderFeature;
