import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserviewPage } from './userview.page';

describe('UserviewPage', () => {
  let component: UserviewPage;
  let fixture: ComponentFixture<UserviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
