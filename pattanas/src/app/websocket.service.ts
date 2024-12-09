import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket!: WebSocket;

  constructor() {}

  connect(): Observable<any> {
    // WebSocket kapcsolat létrehozása
    this.socket = new WebSocket('ws://localhost:8080');

    return new Observable(observer => {
      // Üzenet érkezésekor továbbítjuk az adatokat az Observer felé
      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          observer.next(data);
        } catch (error) {
          observer.error(`Hiba az üzenet feldolgozása során: ${error}`);
        }
      };

      // Hiba kezelése
      this.socket.onerror = (error) => {
        observer.error(error);
      };

      // Kapcsolat bezárásakor jelezzük az Observer-nek a befejezést
      this.socket.onclose = () => {
        observer.complete();
      };
    });
  }

  close(): void {
    // Kapcsolat lezárása
    if (this.socket) {
      this.socket.close();
    }
  }
}
