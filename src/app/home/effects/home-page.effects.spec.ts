import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { HomePageEffects } from './home-page.effects';

describe('HomePageEffects', () => {
  let actions$: Observable<any>;
  let effects: HomePageEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomePageEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(HomePageEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
