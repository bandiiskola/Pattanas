import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snowflake',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snowflake.component.html',
  styleUrl: './snowflake.component.css'
})
export class SnowflakeComponent implements OnInit, OnDestroy{
  dot: any = { x: 0, y: 0, size: 20 };

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    this.websocketService.connect().subscribe((data: any) => {
      this.dot = data;
    });
  }

  ngOnDestroy() {
    this.websocketService.close();
  }
}
