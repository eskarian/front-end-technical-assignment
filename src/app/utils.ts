import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';

export const SUPPLIER_TEAM_ID = 'supplier-team-id';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  teamIds: string[];
}

export interface IStore<T> {
  loading: boolean;
  value: T;
}

interface IHasLoading {
  loading: boolean;
}

interface IHasValue<T> {
  value: T;
}

type TStoreMapToValue = <T>(source: Observable<IHasValue<T>>) => Observable<T>;

export const storeFilterNotLoading = <T extends IHasLoading>(
  source: Observable<T>
) => source.pipe(filter((store) => !store.loading));

export const storeMapToLoading = (source: Observable<IHasLoading>) =>
  source.pipe(map((store) => store.loading));

export const storeMapToValue: TStoreMapToValue = <T>(
  source: Observable<IHasValue<T>>
): Observable<T> => source.pipe(map((store) => store.value));

export const storeMapEmptyValueToEmptyArray = <T, E>(
  source: Observable<IStore<T[]>>
) =>
  source.pipe(
    map((store) => {
      return {
        ...store,
        value: store.value || [],
      };
    })
  );

export const storeIsLoadingAndHasNoValue = <T, E>(
  source: Observable<IStore<T>>
) => source.pipe(map((store) => store.loading && !store.value));

// by default, `shareReplay` does not stop emiting until source observable completes,
// mo matter if there are subscribers or not
// source: https://stackoverflow.com/a/53979783/8490932
export const shareReplayWithRefCount = <T>(source: Observable<T>) =>
  source.pipe(shareReplay({ refCount: true, bufferSize: 1 }));
