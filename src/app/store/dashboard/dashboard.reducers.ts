import { createFeature, createReducer, on } from '@ngrx/store'
import { dashboardActions } from './dashboard.actions'
import { DashboardState } from './dashboard.state'

const dashboardInitialState: DashboardState = {
  totalSale: 0,
  totalOrders: 0,
  totalProducts: 0,
  totalPendingOrders: 0,
  totalSellers: 0,
  recentOrders: [],
  messages: [],
};

const dashboardFeature = createFeature({
  name: 'dashboard',
  reducer: createReducer(
    dashboardInitialState,
    on(dashboardActions.messageClear, (state: DashboardState) => ({
      ...state,
      errorMessage: '',
      successMessage: '',
    })),
    on(dashboardActions.getAdminDashboardData, (state: DashboardState) => ({
      ...state,
    })),
    on(
      dashboardActions.getAdminDashboardDataSuccess,
      (state: DashboardState, { response }) => ({
        ...state,
        totalSale: response.totalSale,
        totalOrders: response.totalOrders,
        totalProducts: response.totalProducts,
        totalSellers: response.totalSellers!,
        recentOrders: response.recentOrders,
        messages: response.messages,
      })
    ),
    on(dashboardActions.getSellerDashboardData, (state: DashboardState) => ({
      ...state,
    })),
    on(
      dashboardActions.getSellerDashboardDataSuccess,
      (state: DashboardState, { response }) => ({
        ...state,
        totalSale: response.totalSale,
        totalOrders: response.totalOrders,
        totalProducts: response.totalProducts,
        totalPendingOrders: response.totalPendingOrders!,
        recentOrders: response.recentOrders,
        messages: response.messages,
      })
    )
  ),
});

export const {
  name: dashboardFeatureKey,
  reducer: dashboardReducer,
  selectTotalSale,
  selectTotalOrders,
  selectTotalProducts,
  selectTotalPendingOrders,
  selectTotalSellers,
  selectRecentOrders,
  selectMessages,
} = dashboardFeature;
