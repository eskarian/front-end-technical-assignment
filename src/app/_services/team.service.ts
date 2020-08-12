import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IStore, User } from '../utils';
import { getMockUsers } from './mock-data';

@Injectable()
export class TeamService {
  getUsersForTeamStoreOb(teamId: string): Observable<IStore<User[]>> {
    return of({
      value: getMockUsers().filter((user) => user.teamIds.includes(teamId)),
      // value: undefined,
      loading: false,
    });
  }
}
