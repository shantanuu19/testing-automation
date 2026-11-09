class LoginPage {
  get emailInput() {
    return $('[placeholder="you@example.com"]');
  }

  get passwordInput() {
    return $('input[type="password"]');
  }

  get signInButton() {
    return $('button=Sign in');
  }

  async open() {
    await browser.url('/login');
    await browser.waitUntil(
      async () =>
        !(await browser.getUrl()).includes('/login') ||
        (await this.emailInput.isDisplayed()),
      { timeoutMsg: 'Login page did not load or redirect to an authenticated page.' }
    );
  }

  async signIn() {
    if (!(await browser.getUrl()).includes('/login')) {
      return;
    }

    const username = process.env.MYUKDREAM_TEST_USERNAME;
    const password = process.env.MYUKDREAM_TEST_PASSWORD;

    if (!username || !password) {
      throw new Error(
        'Set MYUKDREAM_TEST_USERNAME and MYUKDREAM_TEST_PASSWORD in .env before running the tests.'
      );
    }

    await this.emailInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.signInButton.click();
    await browser.waitUntil(
      async () => !(await browser.getUrl()).includes('/login'),
      { timeoutMsg: 'Sign-in did not navigate away from the login page.' }
    );
  }
}

module.exports = new LoginPage();
