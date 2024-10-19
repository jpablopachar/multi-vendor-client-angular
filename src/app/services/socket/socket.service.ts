/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core'
import { environment } from '@src/environments/environment'
import { io, Socket } from 'socket.io-client'

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private _socket!: Socket;
  private _url = environment.apiUrl;

  constructor() {
    this._socket = io(this._url);
  }

  public emit(eventName: string, data: any, data2?: any): void {
    if (data2) {
      this._socket.emit(eventName, data, data2);
    } else {
      this._socket.emit(eventName, data);
    }
  }

  public on(eventName: string, callback: (...args: any[]) => void): void {
    this._socket.on(eventName, callback);
  }

  public off(eventName: string, callback?: (...args: any[]) => void): void {
    this._socket.off(eventName, callback);
  }
}
