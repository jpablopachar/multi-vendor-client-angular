import { Routes } from '@angular/router'
import { protectRouteGuard } from '@app/guards'

export const SellerRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../views/seller/seller-dashboard.component').then(
        (c) => c.SellerDashboardComponent
      ),
    canActivate: [protectRouteGuard],
    data: { role: 'seller', status: 'active' },
  },
  {
    path: 'dashboard/add-product',
    loadComponent: () =>
      import('../views/seller/add-product.component').then(
        (c) => c.AddProductComponent
      ),
    canActivate: [protectRouteGuard],
    data: { role: 'seller', status: 'active' },
  },
  {
    path: 'dashboard/edit-product/:productId',
    loadComponent: () =>
      import('../views/seller/edit-product.component').then(
        (c) => c.EditProductComponent
      ),
    canActivate: [protectRouteGuard],
    data: { role: 'seller', status: 'active' },
  },
  {
    path: 'dashboard/products',
    loadComponent: () =>
      import('../views/seller/products.component').then(
        (c) => c.ProductsComponent
      ),
    canActivate: [protectRouteGuard],
    data: { role: 'seller', status: 'active' },
  },
  {
    path: 'dashboard/discount-products',
    loadComponent: () =>
      import('../views/seller/discount-products.component').then(
        (c) => c.DiscountProductsComponent
      ),
    canActivate: [protectRouteGuard],
    data: { role: 'seller', status: 'active' },
  },
  {
    path: 'dashboard/orders',
    loadComponent: () =>
      import('../views/seller/orders-seller.component').then(
        (c) => c.OrdersSellerComponent
      ),
    canActivate: [protectRouteGuard],
    data: { role: 'seller', visibility: ['active', 'deactive'] },
  },
  {
    path: 'dashboard/order/details/:orderId',
    loadComponent: () =>
      import('../views/seller/order-details-seller.component').then(
        (c) => c.OrderDetailsSellerComponent
      ),
    canActivate: [protectRouteGuard],
    data: { role: 'seller', visibility: ['active', 'deactive'] },
  },
  {
    path: 'dashboard/payments',
    loadComponent: () =>
      import('../views/seller/payments.component').then(
        (c) => c.PaymentsComponent
      ),
    canActivate: [protectRouteGuard],
    data: { role: 'seller', status: 'active' },
  },
  {
    path: 'dashboard/chat-support',
    loadComponent: () =>
      import('../views/seller/seller-to-admin.component').then(
        (c) => c.SellerToAdminComponent
      ),
    canActivate: [protectRouteGuard],
    data: { role: 'seller', visibility: ['active', 'deactive', 'pending'] },
  },
  {
    path: 'dashboard/chat-customer',
    loadComponent: () =>
      import('../views/seller/seller-to-customer.component').then(
        (c) => c.SellerToCustomerComponent
      ),
    canActivate: [protectRouteGuard],
    data: { role: 'seller', status: 'active' },
  },
  {
    path: 'dashboard/chat-customer/:customerId',
    loadComponent: () =>
      import('../views/seller/seller-to-customer.component').then(
        (c) => c.SellerToCustomerComponent
      ),
    canActivate: [protectRouteGuard],
    data: { role: 'seller', status: 'active' },
  },
  {
    path: 'dashboard/add-banner/:productId',
    loadComponent: () =>
      import('../views/seller/add-banner.component').then(
        (c) => c.AddBannerComponent
      ),
    canActivate: [protectRouteGuard],
    data: { role: 'seller', status: 'active' },
  },
  {
    path: 'dashboard/profile',
    loadComponent: () =>
      import('../views/seller/profile.component').then(
        (c) => c.ProfileComponent
      ),
    canActivate: [protectRouteGuard],
    data: { role: 'seller', visibility: ['active', 'deactive', 'pending'] },
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
