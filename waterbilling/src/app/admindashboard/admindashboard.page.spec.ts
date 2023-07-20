import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmindashboardPage } from './admindashboard.page';

describe('AdmindashboardPage', () => {
  let component: AdmindashboardPage;
  let fixture: ComponentFixture<AdmindashboardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmindashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
