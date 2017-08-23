import { BowlingPage } from './app.po';

describe('bowling App', () => {
  let page: BowlingPage;

  beforeEach(() => {
    page = new BowlingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
