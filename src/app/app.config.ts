import { provideHttpClient, withInterceptors } from '@angular/common/http'
import {
  ApplicationConfig,
  isDevMode,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideToastr } from 'ngx-toastr'
import { routes } from './app.routes'
import { cookiesInterceptor } from './interceptors'
import { AuthEffects, authFeatureKey, authReducer } from './store/auth'
import {
  CategoryEffects,
  categoryFeatureKey,
  categoryReducer,
} from './store/category'
import { ChatEffects, chatFeatureKey, chatReducer } from './store/chat'
import {
  DashboardEffects,
  dashboardFeatureKey,
  dashboardReducer,
} from './store/dashboard'
import {
  ProductEffects,
  productFeatureKey,
  productReducer,
} from './store/product'
import { SellerEffects, sellerFeatureKey, sellerReducer } from './store/seller'

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([cookiesInterceptor])),
    provideStore({
      [authFeatureKey]: authReducer,
      [categoryFeatureKey]: categoryReducer,
      [productFeatureKey]: productReducer,
      [sellerFeatureKey]: sellerReducer,
      [dashboardFeatureKey]: dashboardReducer,
      [chatFeatureKey]: chatReducer,
    }),
    provideEffects(
      AuthEffects,
      CategoryEffects,
      ChatEffects,
      DashboardEffects,
      ProductEffects,
      SellerEffects
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
