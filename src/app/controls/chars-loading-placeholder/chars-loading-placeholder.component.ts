import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
  shareReplayWithRefCount,
  storeIsLoadingAndHasNoValue,
  IStore,
} from '../../utils';

@Component({
  selector: 'app-chars-loading-placeholder',
  templateUrl: './chars-loading-placeholder.component.html',
  styleUrls: ['./chars-loading-placeholder.component.less'],
})
export class CharsLoadingPlaceholderComponent<T> implements OnInit {
  @Input() storeOb: Observable<IStore<T>>;

  @Input() noOfPlaceholderChars = 10;

  placeholderChars: string;

  isLoadingOb: Observable<boolean>;

  ngOnInit(): void {
    this.placeholderChars = '_'.repeat(this.noOfPlaceholderChars);
    this.isLoadingOb = this.storeOb
      .pipe(storeIsLoadingAndHasNoValue)
      .pipe(shareReplayWithRefCount);
  }
}
