export interface GetSellerMessagesResponse {
  messages: SellerMessage[];
}

export interface SellerMessage {
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
  message: SellerMessage;
}
