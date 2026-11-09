require('dotenv').config();
const { spawn } = require('node:child_process');
const path = require('node:path');

let chromeDriverProcess;

exports.config = {
  runner: 'local',
  specs: ['./test/specs/**/*.e2e.js'],
  maxInstances: 1,
  logLevel: 'warn',
  baseUrl: process.env.MYUKDREAM_BASE_URL || 'https://app.myukdream.com',
  hostname: '127.0.0.1',
  port: 9515,
  path: '/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,
  framework: 'mocha',
  reporters: [
    'spec',
    [
      'junit',
      {
        outputDir: './reports/junit',
        outputFileFormat: options => `results-${options.cid}.xml`
      }
    ]
  ],
  mochaOpts: {
    timeout: 60000
  },
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--window-size=1440,1000']
      }
    }
  ],
  async onPrepare() {
    require('node:fs').mkdirSync('./artifacts', { recursive: true });
    chromeDriverProcess = spawn(
      require('chromedriver').path,
      ['--port=9515'],
      { stdio: 'ignore' }
    );

    await browserDriverReady();
  },
  onComplete() {
    chromeDriverProcess?.kill();
  },
  async afterHook(_test, _context, { passed }, hookName) {
    if (!passed) {
      await saveFailureScreenshot(hookName);
    }
  },
  async afterTest(test, _context, { passed }) {
    if (passed) {
      return;
    }

    await saveFailureScreenshot(test.title);
  }
};

async function saveFailureScreenshot(title) {
  const artifactDir = path.resolve('./artifacts/failures');
  const safeTitle = title.replace(/[^a-z0-9-_]+/gi, '-');
  const filename = `${safeTitle}-${Date.now()}.png`;

  require('node:fs').mkdirSync(artifactDir, { recursive: true });
  await browser.saveScreenshot(path.join(artifactDir, filename));
}

async function browserDriverReady() {
  const deadline = Date.now() + 15000;

  while (Date.now() < deadline) {
    if (chromeDriverProcess.exitCode !== null) {
      throw new Error(
        `ChromeDriver exited before becoming ready (code ${chromeDriverProcess.exitCode}).`
      );
    }

    try {
      const response = await fetch('http://127.0.0.1:9515/status');
      if (response.ok) {
        return;
      }
    } catch (error) {
      if (error.cause?.code !== 'ECONNREFUSED') {
        throw error;
      }
    }

    await new Promise(resolve => setTimeout(resolve, 250));
  }

  throw new Error('ChromeDriver did not become ready within 15 seconds.');
}
