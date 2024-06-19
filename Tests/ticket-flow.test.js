// Run with 'npx jest ticket-flow.test'

const { getDevToolsWebSocketURL } = require('../Resources/utility.js');
const puppeteer = require('puppeteer');

let page;
let browser;

describe('TVM Test', () => {

  beforeAll(async() => {
    browser = await puppeteer.connect({
      browserWSEndpoint: await getDevToolsWebSocketURL(9222),
      defaultViewport: { width: 1024, height: 1280 }
    });

    const pages = await browser.pages();
    page = pages[0];
  });

  it('Ticket buying flow', async () => {
    await page.waitForSelector('#app > div:nth-child(3) > div.home > div.home-function-container.flex.hend > button:nth-child(2)');
    await page.click('#app > div:nth-child(3) > div.home > div.home-function-container.flex.hend > button:nth-child(2)');

    await page.waitForSelector('#app > div:nth-child(3) > div.home > div.home-ticket-container > div:nth-child(1) > button');
    await page.click('#app > div:nth-child(3) > div.home > div.home-ticket-container > div:nth-child(1) > button');

    if(await page.waitForSelector('#app > div:nth-child(3) > div > div.popup-container') != null) {
      await page.waitForSelector('#app > div:nth-child(3) > div > div.popup-container > div.popup-button-container.flex.hcenter > button:nth-child(2)');
      await page.click('#app > div:nth-child(3) > div > div.popup-container > div.popup-button-container.flex.hcenter > button:nth-child(2)');
    };
	  
    await page.waitForSelector('#app > div:nth-child(3) > div.summary > div.summary-function-container.flex.hend > button:nth-child(2)');
    await page.click('#app > div:nth-child(3) > div.summary > div.summary-function-container.flex.hend > button:nth-child(2)');

    await page.waitForSelector('#app > div:nth-child(3) > div.request-receipt > div.request-receipt-button-container.flex.hbetween > button:nth-child(2)', { timeout: 100000 });
    await page.click('#app > div:nth-child(3) > div.request-receipt > div.request-receipt-button-container.flex.hbetween > button:nth-child(2)');

    await page.waitForSelector('#app > div:nth-child(3) > div.end-view > div.end-label-container > div.end-thanks-label.flex.hcenter.vcenter.fw-bold > span', { timeout: 100000 });
    await page.click('#app');
    
    await page.waitForSelector('#app > div:nth-child(3) > div.home > div.home-title > span', { timeout: 100000 });
  }, 300000);

  afterAll(async() => {
    await browser.disconnect();
  });
});