/* eslint-disable @typescript-eslint/no-explicit-any */

export interface OrderState {
  successMessage: string;
  errorMessage: string;
  totalOrders: number;
  orders: any[];
  order: any;
}