require('chromedriver');
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Form Input Test', function () {
  this.timeout(30000); // prevent Mocha timeout
  let driver;

   // Helper: delay function
  const delay = ms => new Promise(res => setTimeout(res, ms));

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('should fill multiple input fields and submit', async function () {
    // Open the form
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

    // Fill text input
    const textInput = await driver.findElement(By.name('my-text'));
    await textInput.clear();
    await textInput.sendKeys('John Doe');
    await delay(1000);

    // Fill password input
    const passwordInput = await driver.findElement(By.name('my-password'));
    await passwordInput.clear();
    await passwordInput.sendKeys('Secret123');
    await delay(1000);

    // Fill textarea
    const textArea = await driver.findElement(By.name('my-textarea'));
    await textArea.clear();
    await textArea.sendKeys('This is a test message.');
    await delay(1000);

    // Select from dropdown
    const select = await driver.findElement(By.name('my-select'));
    await select.sendKeys('Option 2');
    await delay(1000);

    // Select checkbox
    const checkbox = await driver.findElement(By.name('my-check'));
    await checkbox.click();
    await delay(1000);

    // Select radio button
    const radio = await driver.findElement(By.id('my-radio-2'));
    await radio.click();
    await delay(1000);

    // Submit the form
    const submitBtn = await driver.findElement(By.css('button'));
    await submitBtn.click();
    await delay(1000);

    // Wait for the confirmation message
    await driver.wait(until.elementLocated(By.id('message')), 5000);
    const messageText = await driver.findElement(By.id('message')).getText();
    await delay(1000);

    // Verify the submission message
    assert.ok(messageText.includes('Received!'), 'Form submission failed');
    await delay(1000);
  });
});
