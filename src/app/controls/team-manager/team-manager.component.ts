import { Component, Input } from '@angular/core';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CitrusNamespaceService } from '../../_services/namespace.service';

@Component({
  selector: 'app-team-manager',
  templateUrl: './team-manager.component.html',
})
export class TeamManagerComponent {
  @Input() set supplierTeamId(supplierTeamId: string) {
    this.supplierTeamIdRS.next(supplierTeamId);
  }
  supplierTeamIdRS = new ReplaySubject<string>(1);

  showTeamUsersOb: Observable<boolean> = combineLatest([
    this.citrusNamespaceService.observeFeatureFlagValue(
      'enableRetailerUserManagement'
    ),
    this.citrusNamespaceService.observeIsSelectedTeamNamespaceRetailerTeam(),
  ]).pipe(
    map(
      ([
        isRetailerUserManagementEnabled,
        isSelectedTeamNamespaceRetailerTeam,
      ]) =>
        this.showTeamUsers(
          isRetailerUserManagementEnabled,
          isSelectedTeamNamespaceRetailerTeam
        )
    )
  );

  constructor(private citrusNamespaceService: CitrusNamespaceService) {}

  showTeamUsers(
    isRetailerUserManagementEnabled: boolean,
    isSelectedTeamNamespaceRetailerTeam: boolean
  ): boolean {
    return (
      !!isRetailerUserManagementEnabled && !!isSelectedTeamNamespaceRetailerTeam
    );
  }
}
