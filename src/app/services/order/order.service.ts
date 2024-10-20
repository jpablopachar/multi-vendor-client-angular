/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Payload } from '@app/models'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _http: HttpClient = inject(HttpClient);

  private _url = `${environment.apiUrl}/api`;

  public getAdminOrders(payload: Payload): Observable<any> {
    const { page, parPage, searchValue } = payload;

    return this._http.get<any>(
      `${this._url}/admin/orders?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`
    );
  }
}
