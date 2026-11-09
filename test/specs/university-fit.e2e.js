const loginPage = require('../pages/login.page');
const universityFitPage = require('../pages/university-fit.page');

describe('MyUKDream University Fit', () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.signIn();
    await universityFitPage.open();
  });

  it('TC_01: loads the University Fit page and displays its heading', async () => {
    await expect(universityFitPage.heading).toBeDisplayed();
  });

  it('TC_02: displays the answer summary', async () => {
    await expect(universityFitPage.answerSummary).toBeDisplayed();
  });

  it('TC_03: displays the selected course', async () => {
    const expectedCourse =
      process.env.MYUKDREAM_EXPECTED_COURSE || "Bachelor's Computer Science";
    await expect(await universityFitPage.getAnswerSummaryText()).toContain(
      expectedCourse
    );
  });

  it('TC_04: displays the selected degree answer', async () => {
    const expectedDegree = process.env.MYUKDREAM_EXPECTED_DEGREE || '90%';
    await expect(await universityFitPage.getAnswerSummaryText()).toContain(
      expectedDegree
    );
  });

  it('TC_05: displays the selected English test answer', async () => {
    const expectedEnglishTest =
      process.env.MYUKDREAM_EXPECTED_ENGLISH_TEST || 'IELTS 6.5';
    await expect(await universityFitPage.getAnswerSummaryText()).toContain(
      expectedEnglishTest
    );
  });
});
