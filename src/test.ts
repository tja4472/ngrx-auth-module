// This file is required by karma.conf.js and loads recursively all the .spec and framework files

// tslint:disable-next-line:no-submodule-imports
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
  // tslint:disable-next-line:no-submodule-imports
} from '@angular/platform-browser-dynamic/testing';
// tslint:disable-next-line:no-submodule-imports
import 'zone.js/dist/zone-testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
