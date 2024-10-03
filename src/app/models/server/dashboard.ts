/* eslint-disable @typescript-eslint/no-explicit-any */

export interface GetDashboardDataResponse {
  messages: string[];
  recentOrders: any[];
  totalOrders: number;
  totalProducts: number;
  totalSale: number;
  totalSellers?: number;
  totalPendingOrders?: number;
}
