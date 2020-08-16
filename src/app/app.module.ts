import { TeamManagerComponent } from './controls/team-manager/team-manager.component';
import { DisplayUserPropsComponent } from './controls/display-user-props/display-user-props.component';
import { CharsLoadingPlaceholderComponent } from './controls/chars-loading-placeholder/chars-loading-placeholder.component';
import { TeamUsersComponent } from './controls/team-users/team-users.component';
import { CollapsableItemComponent } from './controls/collapsable-item/collapsable-item.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamUsersComponent,
    CharsLoadingPlaceholderComponent,
    DisplayUserPropsComponent,
    TeamManagerComponent,
    CollapsableItemComponent,
  ],
  exports: [TeamUsersComponent, CharsLoadingPlaceholderComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
