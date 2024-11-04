/* eslint-disable @typescript-eslint/no-explicit-any */

export interface GetDashboardDataResponse {
  messages: any[];
  recentOrders: any[];
  totalOrders: number;
  totalProducts: number;
  totalSale: number;
  totalSellers?: number;
  totalPendingOrders?: number;
}
