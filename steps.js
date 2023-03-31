import { Given, When, Then } from 'cucumber';
const { Builder, By, Key, until } = require('selenium-webdriver');

let driver;

Given('I am on the Flipkart homepage', async function () {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://www.flipkart.com/');
});

When('I search for {string}', async function (searchTerm) {
  const searchInput = await driver.findElement(By.name('q'));
  await searchInput.sendKeys(searchTerm, Key.RETURN);
});

When('I click on the first search result', async function () {
  const firstResult = await driver.findElement(By.css('div._2kHMtA > a'));
  await firstResult.click();

  // Switch to new window
  const windows = await driver.getAllWindowHandles();
  await driver.switchTo().window(windows[1]);
});

When('I add the item to my cart', async function () {
  const addToCartButton = await driver.findElement(By.css('button._2KpZ6l._2U9uOA._3v1-ww'));
  await addToCartButton.click();
});

When('I go to my cart', async function () {
  const viewCartButton = await driver.findElement(By.css('a._3zQntF'));
  await viewCartButton.click();
});

When('I proceed to checkout', async function () {
  const checkoutButton = await driver.findElement(By.css('button._2KpZ6l._2ObVJD._3AWRsL'));
  await checkoutButton.click();
});

When('I enter my shipping address', async function () {
  const nameInput = await driver.findElement(By.name('name'));
  const phoneNumberInput = await driver.findElement(By.name('phone'));
  const pincodeInput = await driver.findElement(By.name('pincode'));
  const addressInput = await driver.findElement(By.name('addressLine1'));
  const cityInput = await driver.findElement(By.name('city'));

  await nameInput.sendKeys('John Doe');
  await phoneNumberInput.sendKeys('1234567890');
  await pincodeInput.sendKeys('123456');
  await addressInput.sendKeys('123 Main Street');
  await cityInput.sendKeys('New York', Key.RETURN);
});

When('I select {string}', async function (paymentMethod) {
  const paymentMethodLabel = await driver.findElement(By.xpath(`//label[contains(text(), '${paymentMethod}')]`));
  await paymentMethodLabel.click();
});

When('I confirm my order', async function () {
  const confirmOrderButton = await driver.findElement(By.css('button._2Kp6l._2ObVJD._3AWRsL'));
  await confirmOrderButton.click();
  });
  
  Then('I should see a confirmation message', async function () {
  await driver.wait(until.elementLocated(By.css('div._1YokD2._1tnJyd')), 5000);
  const confirmationMessage = await driver.findElement(By.css('div._1YokD2._1tnJyd'));
  const messageText = await confirmationMessage.getText();
  assert.strictEqual(messageText, 'Your order has been placed', 'Expected confirmation message not found');
  });
  
  After(async function () {
  await driver.quit();
  });
