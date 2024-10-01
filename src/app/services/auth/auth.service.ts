import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import {
  AuthResponse,
  LoginUser,
  RegisterUser,
  ShopInfo,
  UserInfoResponse,
} from '@app/models'
import { environment } from '@src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http: HttpClient = inject(HttpClient);

  private _url = `${environment.apiUrl}/api/auth`;

  public adminLogin(body: LoginUser): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${this._url}/admin-login`, body);
  }

  public sellerLogin(body: LoginUser): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(
      `${this._url}/seller-login`,
      body
    );
  }

  public sellerRegister(body: RegisterUser): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(
      `${this._url}/seller-register`,
      body
    );
  }

  public getUserInfo(): Observable<UserInfoResponse> {
    return this._http.get<UserInfoResponse>(`${this._url}/get-user`);
  }

  public profileInfoAdd(body: ShopInfo): Observable<UserInfoResponse> {
    return this._http.post<UserInfoResponse>(
      `${this._url}/profile-info-add`,
      body
    );
  }

  public profileImageUpload(body: FormData): Observable<UserInfoResponse> {
    return this._http.post<UserInfoResponse>(
      `${this._url}/profile-image-upload`,
      body
    );
  }

  public logout(): Observable<{ message: string }> {
    return this._http.get<{ message: string }>(
      `${this._url}/logout`,
    );
  }
}
