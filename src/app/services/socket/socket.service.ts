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

  emit(eventName: string, data: any): void {
    this._socket.emit(eventName, data);
  }

  on(eventName: string, callback: (...args: any[]) => void): void {
    this._socket.on(eventName, callback);
  }

  off(eventName: string, callback?: (...args: any[]) => void): void {
    this._socket.off(eventName, callback);
  }
}
