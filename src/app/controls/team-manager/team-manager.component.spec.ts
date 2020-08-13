import { SUPPLIER_TEAM_ID } from './../../utils';
import { CitrusNamespaceService } from './../../_services/namespace.service';
import { UserService } from './../../_services/user.service';
import { TeamService } from './../../_services/team.service';
import { of } from 'rxjs';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { TeamManagerComponent } from './team-manager.component';
import { TeamUsersComponent } from '../team-users/team-users.component';
import { CharsLoadingPlaceholderComponent } from '../chars-loading-placeholder/chars-loading-placeholder.component';
import { DisplayUserPropsComponent } from '../display-user-props/display-user-props.component';
import { getMockUsers, getMockLoggedInUser } from 'src/app/_services/mock-data';

describe('TeamManagerComponent', () => {
  let component: TeamManagerComponent;
  let fixture: ComponentFixture<TeamManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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

    fixture = TestBed.createComponent(TeamManagerComponent);
    component = fixture.componentInstance;

    component.supplierTeamId = SUPPLIER_TEAM_ID;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
