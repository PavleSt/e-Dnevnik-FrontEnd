import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentAdminComponent } from './parent-admin.component';

describe('ParentAdminComponent', () => {
  let component: ParentAdminComponent;
  let fixture: ComponentFixture<ParentAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
