import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitrusNamespaceService {
  observeIsSelectedTeamNamespaceRetailerTeam(): Observable<boolean> {
    return of(true);
  }

  observeFeatureFlagValue(featureFlag: string): Observable<boolean> {
    return of(featureFlag === 'enableRetailerUserManagement');
  }
}
