import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User, IStore } from '../utils';
import { getMockUsers, getMockLoggedInUser } from './mock-data';

// All services are stubbed for sake of demo. No need to pay too much attention here.
@Injectable({
  providedIn: 'root',
})
export class UserService {
  getLoggedInUserObservable(): Observable<User> {
    return of(getMockLoggedInUser());
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
