import { DisplayUserPropsComponent } from './../display-user-props/display-user-props.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UserService } from './../../_services/user.service';
import { TeamService } from './../../_services/team.service';
import { TeamUsersComponent } from './team-users.component';
import { SUPPLIER_TEAM_ID } from '../../utils';
import { CharsLoadingPlaceholderComponent } from '../chars-loading-placeholder/chars-loading-placeholder.component';
import { getMockUsers, getMockLoggedInUser } from 'src/app/_services/mock-data';

describe('TeamUsersComponent', () => {
  let component: TeamUsersComponent;
  let fixture: ComponentFixture<TeamUsersComponent>;

  let mockUserId: string;

  beforeEach(async(() => {
    mockUserId = 'mock-user-id';

    TestBed.configureTestingModule({
      declarations: [
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
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TeamUsersComponent);
    component = fixture.componentInstance;

    component.supplierTeamId = SUPPLIER_TEAM_ID;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
