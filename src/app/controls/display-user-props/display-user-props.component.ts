import {
  BehaviorSubject,
  combineLatest,
  Observable,
  ReplaySubject,
} from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';
import { Component, Input } from '@angular/core';

import { UserService } from '../../_services/user.service';
import {
  storeFilterNotLoading,
  storeMapToValue,
  User,
  IStore,
} from './../../utils';
import { TeamService } from '../../_services/team.service';

export type UserProps = keyof User;

@Component({
  selector: 'app-display-user-props',
  template: `
    <app-chars-loading-placeholder
      [storeOb]="usersStoreOb"
      noOfPlaceholderChars="15"
    >
      <span *ngIf="userPropsOb | async as userProps">{{ userProps }}</span>
    </app-chars-loading-placeholder>
  `,
  providers: [TeamService],
})
export class DisplayUserPropsComponent {
  @Input() set userId(userId: string) {
    this.userIdRS.next(userId);
  }
  userIdRS = new ReplaySubject<string>(1);

  @Input() set supplierTeamId(supplierTeamId: string) {
    this.supplierTeamIdBS.next(supplierTeamId);
  }
  supplierTeamIdBS = new BehaviorSubject<string | undefined>(undefined);

  @Input() set propNames(propNames: UserProps[]) {
    this.propNamesRS.next(propNames);
  }
  propNamesRS = new ReplaySubject<UserProps[]>(1);

  @Input() truncateCount: number;
  @Input() placement = 'top';

  usersStoreOb: Observable<IStore<User>> = combineLatest([
    this.userIdRS,
    this.supplierTeamIdBS,
  ]).pipe(
    flatMap(([userId, supplierTeamId]) =>
      this.userService.getUserByIdStoreOb(userId, supplierTeamId)
    )
  );

  userOb: Observable<User | undefined> = this.usersStoreOb.pipe(
    storeFilterNotLoading,
    storeMapToValue
  );

  userPropsOb: Observable<string | undefined> = combineLatest([
    this.userOb,
    this.propNamesRS,
  ]).pipe(
    map(([user, propNames]) => {
      if (!user || !propNames.length) {
        return undefined;
      }
      let userProp = '';
      propNames.forEach((propName, index) => {
        userProp += `${index === 0 ? '' : ' '}${user[propName]}`;
      });
      return userProp;
    })
  );

  constructor(private userService: UserService) {}
}
