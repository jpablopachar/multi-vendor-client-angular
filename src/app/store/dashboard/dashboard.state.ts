/* eslint-disable @typescript-eslint/no-explicit-any */

import { Message } from "@app/models"

export interface DashboardState {
  totalSale: number;
  totalOrders: number;
  totalProducts: number;
  totalPendingOrders: number;
  totalSellers: number;
  recentOrders: any[];
  messages: Message[];
}
