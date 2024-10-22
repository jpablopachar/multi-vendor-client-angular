/* eslint-disable @typescript-eslint/no-explicit-any */

import { InfoUser } from "@app/models"

export interface ChatState {
  successMessage: string;
  errorMessage: string;
  customers: any[];
  messages: any[];
  activeCustomers: any[];
  activeSellers: any[];
  activeAdmin: string;
  friends: any[];
  sellerAdminMessages: any[];
  currentSeller: any;
  currentCustomer: any;
  sellers: InfoUser[];
}