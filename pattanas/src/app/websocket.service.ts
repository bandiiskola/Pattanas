import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket!: WebSocket;

  constructor() {}

  connect(): Observable<any> {
    this.socket = new WebSocket('ws://localhost:8080');

    return new Observable(observer => {
      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          observer.next(data);
        } catch (error) {
          observer.error(`Hiba az üzenet feldolgozása során: ${error}`);
        }
      };

      this.socket.onerror = (error) => {
        observer.error(error);
      };

      this.socket.onclose = () => {
        observer.complete();
      };
    });
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
