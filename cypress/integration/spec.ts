import { getMenuTitle, navigateTo } from '../support/po';

describe('Hello Angular', () => {
  beforeEach(navigateTo);

  it('should display menu title, Menu', () => {
    getMenuTitle().contains('Menu');
  });
});
