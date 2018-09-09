import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SignInFormComponent } from '@app/auth/components/sign-in-form/sign-in-form.component';

// import { combineReducers, Store, StoreModule } from '@ngrx/store';

describe('Sign In Page', () => {
  let fixture: ComponentFixture<SignInFormComponent>;
  let component: SignInFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule, ReactiveFormsModule],
      declarations: [SignInFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      declarations: [SignInFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(SignInFormComponent);
    instance = fixture.componentInstance;
  });
  */

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compile', () => {
    // fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('dummy', () => {
    expect(1).toEqual(1);
  });
});
