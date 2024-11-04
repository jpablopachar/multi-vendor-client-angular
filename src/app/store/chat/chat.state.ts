/* eslint-disable @typescript-eslint/no-explicit-any */

import { InfoUser, Message } from "@app/models"

export interface ChatState {
  successMessage: string;
  errorMessage: string;
  customers: any[];
  messages: Message[];
  activeCustomers: InfoUser[];
  activeSellers: InfoUser[];
  activeAdmin: string;
  friends: any[];
  sellerAdminMessages: Message[];
  currentSeller: InfoUser | object;
  currentCustomer: any;
  sellers: InfoUser[];
}