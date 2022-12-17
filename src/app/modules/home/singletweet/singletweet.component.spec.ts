import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingletweetComponent } from './singletweet.component';

describe('SingletweetComponent', () => {
  let component: SingletweetComponent;
  let fixture: ComponentFixture<SingletweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingletweetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingletweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
