import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, IStore, SUPPLIER_TEAM_ID } from '../utils';
import { getMockUsers } from './mock-data';

@Injectable()
export class UserService {
  getLoggedInUserObservable(): Observable<User> {
    return of({
      id: 'user-1',
      email: 'user1@citrusad.com',
      namespace: 'app',
      firstName: 'Bill',
      lastName: 'Smith',
      teamIds: [SUPPLIER_TEAM_ID],
    });
  }

  getUserByIdStoreOb(
    userId: string,
    teamId: string
  ): Observable<IStore<User | undefined>> {
    return of({
      loading: false,
      value: getMockUsers().find(
        (user) => user.id === userId && user.teamIds.includes(teamId)
      ),
    });
  }
}
