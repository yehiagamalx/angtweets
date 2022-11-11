import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedspageComponent } from './feedspage.component';

describe('FeedspageComponent', () => {
  let component: FeedspageComponent;
  let fixture: ComponentFixture<FeedspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedspageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
