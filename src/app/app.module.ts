import { DisplayUserPropsComponent } from './controls/display-user-props/display-user-props.component';
import { CharsLoadingPlaceholderComponent } from './controls/chars-loading-placeholder/chars-loading-placeholder.component';
import { TeamUsersComponent } from './controls/team-users/team-users.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamUsersComponent,
    CharsLoadingPlaceholderComponent,
    DisplayUserPropsComponent,
  ],
  exports: [CharsLoadingPlaceholderComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
