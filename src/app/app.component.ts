import { Component } from '@angular/core';
import { SUPPLIER_TEAM_ID } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  supplierTeamId = SUPPLIER_TEAM_ID;
}
