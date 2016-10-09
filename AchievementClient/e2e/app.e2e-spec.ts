import { AchievementClientPage } from './app.po';

describe('achievement-client App', function() {
  let page: AchievementClientPage;

  beforeEach(() => {
    page = new AchievementClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
