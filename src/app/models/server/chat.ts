import { InfoUser } from "./auth"

export interface GetSellerMessagesResponse {
  messages: Message[];
}

export interface GetSellersResponse {
  sellers: InfoUser[];
}

export interface Message {
  _id: string;
  senderName: string;
  senderId: string;
  receiverId: string;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SellerAdminMessageRequest {
  senderId: string;
  senderName: string;
  receiverId: string;
  message: string;
}

export interface SellerAdminMessageResponse {
  message: Message;
}

export interface ActiveSeller {
  socketId: string;
  userInfo: InfoUser;
}
