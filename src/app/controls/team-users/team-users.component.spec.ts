import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UserService } from './../../_services/user.service';
import { TeamService } from './../../_services/team.service';
import { TeamUsersComponent } from './team-users.component';
import { SUPPLIER_TEAM_ID } from '../../utils';

describe('TeamUsersComponent', () => {
  let component: TeamUsersComponent;
  let fixture: ComponentFixture<TeamUsersComponent>;

  let testSupplierTeamId: string;
  let mockUserId: string;

  beforeEach(async(() => {
    testSupplierTeamId = SUPPLIER_TEAM_ID;
    mockUserId = 'mock-user-id';

    TestBed.configureTestingModule({
      declarations: [TeamUsersComponent],
      providers: [
        {
          provide: TeamService,
          useValue: {
            getUsersForTeamStoreOb: () => {
              return of({
                value: [
                  {
                    id: 'user-2',
                    email: 'user-2@gmail.com',
                    firstName: 'Tom',
                    lastName: 'Jones',
                    teamIds: [],
                  },
                ],
                loading: false,
              });
            },
          },
        },
        {
          provide: UserService,
          useValue: {
            getLoggedInUserObservable: () => {
              return of({
                id: 'user-1',
                email: 'user1@citrusad.com',
                firstName: 'Bill',
                lastName: 'Smith',
                teamIds: [],
              });
            },
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TeamUsersComponent);
    component = fixture.componentInstance;

    component.supplierTeamId = testSupplierTeamId;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
