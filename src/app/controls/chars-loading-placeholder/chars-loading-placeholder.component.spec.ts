import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { CharsLoadingPlaceholderComponent } from './chars-loading-placeholder.component';

describe('CharsLoadingPlaceholderComponent', () => {
  let component: CharsLoadingPlaceholderComponent<{}>;
  let fixture: ComponentFixture<CharsLoadingPlaceholderComponent<{}>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharsLoadingPlaceholderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharsLoadingPlaceholderComponent);
    component = fixture.componentInstance;
    component.storeOb = new Observable();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
