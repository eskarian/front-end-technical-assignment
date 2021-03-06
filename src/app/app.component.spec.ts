import { of } from 'rxjs';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { TeamManagerComponent } from './controls/team-manager/team-manager.component';
import { TeamUsersComponent } from './controls/team-users/team-users.component';
import { CharsLoadingPlaceholderComponent } from './controls/chars-loading-placeholder/chars-loading-placeholder.component';
import { DisplayUserPropsComponent } from './controls/display-user-props/display-user-props.component';
import { SUPPLIER_TEAM_ID } from './utils';
import { TeamService } from './_services/team.service';
import { getMockUsers, getMockLoggedInUser } from './_services/mock-data';
import { UserService } from './_services/user.service';
import { CitrusNamespaceService } from './_services/namespace.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TeamManagerComponent,
        TeamUsersComponent,
        CharsLoadingPlaceholderComponent,
        DisplayUserPropsComponent,
      ],
      providers: [
        {
          provide: TeamService,
          useValue: {
            // team-users
            getUsersForTeamStoreOb: () => {
              return of({
                value: getMockUsers(),
                loading: false,
              });
            },
          },
        },
        {
          provide: UserService,
          useValue: {
            // team-users
            getLoggedInUserObservable: () => {
              return of(getMockLoggedInUser());
            },
            // display-user-props
            getUserByIdStoreOb: () => {
              return of(getMockUsers()[0]);
            },
          },
        },
        {
          provide: CitrusNamespaceService,
          useValue: {
            // team-manager
            observeFeatureFlagValue: () => {
              return of(true);
            },
            // team-manager
            observeIsSelectedTeamNamespaceRetailerTeam: () => {
              return of(true);
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    component.supplierTeamId = SUPPLIER_TEAM_ID;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
