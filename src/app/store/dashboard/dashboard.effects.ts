import { inject } from '@angular/core'
import { GetDashboardDataResponse } from '@app/models'
import { DashboardService } from '@app/services'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs'
import { dashboardActions } from './dashboard.actions'

export const getAdminDashboardDataEffect = createEffect(
  (
    actions$ = inject(Actions),
    dashboardService: DashboardService = inject(DashboardService)
  ) => {
    return actions$.pipe(
      ofType(dashboardActions.getAdminDashboardData),
      switchMap(({ role }) => {
        return dashboardService.getDashboardData(role).pipe(
          map((response: GetDashboardDataResponse) => {
            return dashboardActions.getAdminDashboardDataSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);

export const getSellerDashboardDataEffect = createEffect(
  (
    actions$ = inject(Actions),
    dashboardService: DashboardService = inject(DashboardService)
  ) => {
    return actions$.pipe(
      ofType(dashboardActions.getSellerDashboardData),
      switchMap(({ role }) => {
        return dashboardService.getDashboardData(role).pipe(
          map((response: GetDashboardDataResponse) => {
            return dashboardActions.getSellerDashboardDataSuccess({ response });
          })
        );
      })
    );
  },
  { functional: true }
);
