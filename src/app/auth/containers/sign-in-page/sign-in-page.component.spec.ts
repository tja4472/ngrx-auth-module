import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInPageComponent } from '@app/auth/containers/sign-in-page/sign-in-page.component';

describe('SigninPageComponent', () => {
  let component: SignInPageComponent;
  let fixture: ComponentFixture<SignInPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignInPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
