# MyUKDream WebdriverIO tests

## Setup

1. Install Node.js 18 or newer and npm.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env` and set `MYUKDREAM_TEST_USERNAME` and
   `MYUKDREAM_TEST_PASSWORD` for a dedicated test account.
4. Update the expected-answer variables in `.env` to match that account.
5. Run `npm test` (or `npm run test:university-fit`).

For the Node.js runtime installed for this workspace, add it to the current
terminal's `PATH` before running npm:

```sh
export PATH="$HOME/.local/node/node-v26.13.0-darwin-arm64/bin:$PATH"
```

The suite starts the ChromeDriver executable bundled by the `chromedriver`
package. Test results are printed by the spec reporter and written as JUnit XML
under `reports/junit`. Screenshots for failed tests and login setup hooks are
saved under `artifacts/failures`.

The answer tests currently verify values already saved in the account; they do
not change or submit questionnaire answers.
