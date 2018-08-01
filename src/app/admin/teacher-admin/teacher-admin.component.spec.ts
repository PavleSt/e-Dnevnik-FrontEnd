import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAdminComponent } from './teacher-admin.component';

describe('TeacherAdminComponent', () => {
  let component: TeacherAdminComponent;
  let fixture: ComponentFixture<TeacherAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
