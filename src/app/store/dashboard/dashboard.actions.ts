import {
  GetDashboardDataResponse
} from '@app/models'
import { createActionGroup, emptyProps, props } from '@ngrx/store'

export const dashboardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    messageClear: emptyProps(),
    getAdminDashboardData: props<{ role: string }>(),
    getAdminDashboardDataSuccess: props<{
      response: GetDashboardDataResponse;
    }>(),
    getSellerDashboardData: props<{ role: string }>(),
    getSellerDashboardDataSuccess: props<{
      response: GetDashboardDataResponse;
    }>(),
  },
});
