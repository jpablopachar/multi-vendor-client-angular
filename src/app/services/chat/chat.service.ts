import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import {
  GetSellerMessagesResponse,
  SellerAdminMessageRequest,
  SellerAdminMessageResponse,
} from '@app/models'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _http: HttpClient = inject(HttpClient);

  private _url = `${environment.apiUrl}/api/chat`;

  public getSellerMessages(): Observable<GetSellerMessagesResponse> {
    return this._http.get<GetSellerMessagesResponse>(
      `${this._url}/get-seller-messages`
    );
  }

  public sendMessageSellerAdmin(
    body: SellerAdminMessageRequest
  ): Observable<SellerAdminMessageResponse> {
    return this._http.post<SellerAdminMessageResponse>(
      `${this._url}/message-send-seller-admin`,
      body
    );
  }
}
