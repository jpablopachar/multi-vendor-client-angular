import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { GetDashboardDataResponse } from '@app/models'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private _http: HttpClient = inject(HttpClient);

  private _url = `${environment.apiUrl}/api`;

  public getDashboardData(role: string): Observable<GetDashboardDataResponse> {
    return this._http.get<GetDashboardDataResponse>(
      `${this._url}/${role}/get-dashboard-data`
    );
  }
}
