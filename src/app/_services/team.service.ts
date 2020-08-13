import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IStore, User } from '../utils';
import { getMockUsers } from './mock-data';

// All services are stubbed for sake of demo. No need to pay too much attention here.
@Injectable({
  providedIn: 'root',
})
export class TeamService {
  getUsersForTeamStoreOb(teamId: string): Observable<IStore<User[]>> {
    return of({
      value: getMockUsers().filter((user) => user.teamIds.includes(teamId)),
      // toggling the value will trigger the error message in team-users
      // value: undefined,
      loading: false,
    });
  }
}
