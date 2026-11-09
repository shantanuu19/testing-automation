class UniversityFitPage {
  get heading() {
    return $('h1=Your university fit');
  }

  get answerSummary() {
    return $('aria/Your details');
  }

  async open() {
    await browser.url('/university-match');
    await this.heading.waitForDisplayed();
    await browser.pause(2000);
  }

  async getAnswerSummaryText() {
    await this.answerSummary.waitForDisplayed();
    return this.answerSummary.getText();
  }
}

module.exports = new UniversityFitPage();
