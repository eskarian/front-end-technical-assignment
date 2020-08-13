import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// All services are stubbed for sake of demo. No need to pay too much attention here.
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
