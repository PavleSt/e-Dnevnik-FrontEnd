import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkAdminComponent } from './mark-admin.component';

describe('MarkAdminComponent', () => {
  let component: MarkAdminComponent;
  let fixture: ComponentFixture<MarkAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
