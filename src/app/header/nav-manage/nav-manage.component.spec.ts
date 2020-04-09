import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavManageComponent } from './nav-manage.component';

describe('NavManageComponent', () => {
  let component: NavManageComponent;
  let fixture: ComponentFixture<NavManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
