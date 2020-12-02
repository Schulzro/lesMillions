import { Component } from '@angular/core';
import Data from './database/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lesMillions';
  names: string[] = Data.table.map(o => o.name);
  table: any = Data.table;
}
