import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsableItemComponent } from './collapsable-item.component';

describe('CollapsableItemComponent', () => {
  let component: CollapsableItemComponent;
  let fixture: ComponentFixture<CollapsableItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapsableItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
