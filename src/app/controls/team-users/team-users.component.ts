import { Component, Input } from '@angular/core';
import { distinctUntilChanged, first, flatMap, map } from 'rxjs/operators';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  ReplaySubject,
} from 'rxjs';

import { TeamService } from './../../_services/team.service';
import { UserService } from './../../_services/user.service';
import {
  storeFilterNotLoading,
  storeMapToValue,
  storeMapEmptyValueToEmptyArray,
  shareReplayWithRefCount,
  storeMapToLoading,
  User,
  IStore,
} from './../../utils';

const CITRUS_AD_EMAIL = '@citrusad.com';

@Component({
  selector: 'app-team-users',
  templateUrl: './team-users.component.html',
  providers: [UserService, TeamService],
  styleUrls: ['./team-users.component.less'],
})
export class TeamUsersComponent {
  @Input() set collapsable(collapsable: boolean) {
    this.collapsableBS.next(collapsable);
  }
  collapsableBS = new BehaviorSubject<boolean>(true);

  @Input() set supplierTeamId(supplierTeamId: string) {
    this.supplierTeamIdRS.next(supplierTeamId);
  }
  supplierTeamIdRS = new ReplaySubject<string>(1);

  usersStoreOb: Observable<IStore<User[]>> = this.supplierTeamIdRS
    .pipe(distinctUntilChanged())
    .pipe(
      flatMap((supplierTeamId) => {
        return this.teamService.getUsersForTeamStoreOb(supplierTeamId);
      })
    );

  usersOb: Observable<User[]> = this.usersStoreOb.pipe(
    storeMapEmptyValueToEmptyArray,
    storeFilterNotLoading,
    storeMapToValue
  );

  selectedUserOb: Observable<
    User
  > = this.userService
    .getLoggedInUserObservable()
    .pipe(shareReplayWithRefCount);

  selectedUserIdOb: Observable<string> = this.selectedUserOb.pipe(
    map((user) => user.id),
    shareReplayWithRefCount
  );

  citrusFilteredUsersOb: Observable<User[]> = combineLatest([
    this.selectedUserOb,
    this.usersOb,
  ]).pipe(
    map(([currentUser, usersForSelectedTeam]) => {
      // We only want to show citrus users to citrus users. Customers should not see citrus users.
      if (
        currentUser &&
        currentUser.email &&
        currentUser.email.includes(CITRUS_AD_EMAIL)
      ) {
        return usersForSelectedTeam;
      }
      return usersForSelectedTeam.filter(
        (user) => !user.email.includes(CITRUS_AD_EMAIL)
      );
    })
  );

  isLoadingUsersOb: Observable<boolean> = this.usersStoreOb.pipe(
    storeMapToLoading
  );

  numberOfUsersOb: Observable<number> = this.citrusFilteredUsersOb.pipe(
    map((users) => users.length),
    shareReplayWithRefCount
  );

  errorLoadingOb: Observable<boolean> = this.usersStoreOb.pipe(
    map((store) => !store.loading && !store.value)
  );

  expandUsersBS = new BehaviorSubject(true);

  showUserDetails: { [index: string]: boolean } = {};

  showUserCollapseCaretOb: Observable<boolean> = combineLatest([
    this.collapsableBS,
    this.numberOfUsersOb,
  ]).pipe(
    map(([collapsable, numberOfUsers]) => collapsable && numberOfUsers > 0)
  );

  shouldShowUsersOb: Observable<boolean> = combineLatest([
    this.expandUsersBS,
    this.collapsableBS,
    this.numberOfUsersOb,
  ]).pipe(
    map(([expandUsers, collapsable, numberOfUsers]) => {
      return numberOfUsers > 0 && (expandUsers || !collapsable);
    })
  );

  constructor(
    private teamService: TeamService,
    private userService: UserService
  ) {
    this.numberOfUsersOb.pipe(first()).subscribe((numberOfUsers) => {
      this.expandUsersBS.next(numberOfUsers <= 5);
    });
  }

  toggleShowUsers(): void {
    this.numberOfUsersOb.pipe(first()).subscribe((numberOfUsers) => {
      if (!numberOfUsers) {
        return;
      }
      this.expandUsersBS.next(!this.expandUsersBS.value);
      if (!this.expandUsersBS.value) {
        Object.keys(this.showUserDetails).forEach((index) => {
          this.showUserDetails[index] = false;
        });
      }
    });
  }

  toggleShowUserDetails(index: string): void {
    if (this.collapsableBS.value) {
      this.showUserDetails[index] = !this.showUserDetails[index];
    }
  }
}
