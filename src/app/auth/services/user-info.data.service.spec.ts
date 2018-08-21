import { inject, TestBed } from '@angular/core/testing';

import { AngularFirestore } from 'angularfire2/firestore';

import {
  ConvertService,
  FirestoreDoc,
  UserInfoDataService,
} from '@app/auth/services/user-info.data.service';

import { newUserInfo, UserInfo } from '@app/auth/models/user-info.model';
import { EnvironmentService } from '@app/core/environment.service';

describe('ConvertService', () => {
  let convertService: ConvertService;

  beforeEach(() => {
    convertService = new ConvertService();
  });

  it('#fromFirestoreDoc should return null', () => {
    expect(convertService.fromFirestoreDoc(null)).toEqual(null);
  });

  it('#fromFirestoreDoc should return UserInfo', () => {
    const expectedUserInfo: UserInfo = { todoListId: 'TODO_LIST_ID' };
    const firestoreDoc: FirestoreDoc = { todoListId: 'TODO_LIST_ID' };

    expect(convertService.fromFirestoreDoc(firestoreDoc)).toEqual(
      expectedUserInfo
    );
  });

  it('#toFirestoreDoc should return FirestoreDoc', () => {
    const userInfo: UserInfo = { todoListId: 'TODO_LIST_ID' };
    const expectedFirestoreDoc: FirestoreDoc = { todoListId: 'TODO_LIST_ID' };

    expect(convertService.toFirestoreDoc(userInfo)).toEqual(
      expectedFirestoreDoc
    );
  });
});

describe('UserInfoDataService - AngularFirestoreStub', () => {
  const AngularFirestoreStub = {
    // I just mocked the function you need, if there are more, you can add them here.
    // collection: (someString) => {
    // return mocked collection here
    // },
  };

  let environmentService: EnvironmentService;
  let userInfoDataService: UserInfoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Provide both the service-to-test and its dependencies.
      providers: [
        UserInfoDataService,
        EnvironmentService,
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
      ],
    });

    userInfoDataService = TestBed.get(UserInfoDataService);
    environmentService = TestBed.get(EnvironmentService);
  });

  it('should be created', inject(
    [UserInfoDataService],
    (service: UserInfoDataService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('usersCollectionPath should be apps/APP-CODE/users', () => {
    const spy = spyOnProperty(environmentService, 'appCode').and.returnValue(
      'APP-CODE'
    );
    expect(userInfoDataService.usersCollectionPath).toEqual(
      'apps/APP-CODE/users'
    );
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('UserInfoDataService - angularFirestoreSpy', () => {
  let environmentService: EnvironmentService;
  let userInfoDataService: UserInfoDataService;

  beforeEach(() => {
    const angularFirestoreSpy = jasmine.createSpyObj('AngularFirestore', [
      'dummy',
    ]);

    TestBed.configureTestingModule({
      // Provide both the service-to-test and its dependencies.
      providers: [
        UserInfoDataService,
        EnvironmentService,
        { provide: AngularFirestore, useValue: angularFirestoreSpy },
      ],
    });

    userInfoDataService = TestBed.get(UserInfoDataService);
    environmentService = TestBed.get(EnvironmentService);
  });

  it('should be created', inject(
    [UserInfoDataService],
    (service: UserInfoDataService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('usersCollectionPath should be apps/APP-CODE/users', () => {
    const spy = spyOnProperty(environmentService, 'appCode').and.returnValue(
      'APP-CODE'
    );
    expect(userInfoDataService.usersCollectionPath).toEqual(
      'apps/APP-CODE/users'
    );
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
