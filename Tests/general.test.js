// Run with 'npx jest general.test'

const { getDevToolsWebSocketURL, delay, verifyTextMatches, verifyTextIncludes, getCurrentDate, getCurrentTime } = require('../Resources/utility.js');
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

  it('Date test', async() => {
    await page.waitForSelector('#app > div:nth-child(3) > div.sidebar > div.sidebar-date-clock');
    const date = getCurrentDate('DD/MM/YYYY');
    await verifyTextIncludes(page, '#app > div:nth-child(3) > div.sidebar > div.sidebar-date-clock', date);
  });

  it('Time test', async() => {
    await page.waitForSelector('#app > div:nth-child(3) > div.sidebar > div.sidebar-time-clock');
    const time = getCurrentTime();
    await verifyTextMatches(page, '#app > div:nth-child(3) > div.sidebar > div.sidebar-time-clock', time);
  });

  it('Contacts popup test', async () => {
    await page.waitForSelector('#app > div:nth-child(3) > div.sidebar > button');
    await page.click('#app > div:nth-child(3) > div.sidebar > button');
    await page.waitForSelector('#app > div:nth-child(3) > div.sidebar > div.info-contact > div.info-contact-container');
    await page.click('#app > div:nth-child(3) > div.sidebar > div.info-contact > div.close-icon > i');
  });

  describe('Languages tests', () => {

    it('Italian', async () => {
      await page.waitForSelector('#app > div:nth-child(3) > div.home > div.home-title > span');
      await verifyTextMatches(page, '#app > div:nth-child(3) > div.home > div.home-title > span', 'Viaggia con ATAC!');
    });
    
    it('English', async () => {
      await page.waitForSelector('#app > div:nth-child(3) > div.sidebar > div.languages-container > button:nth-child(3)');
      await page.click('#app > div:nth-child(3) > div.sidebar > div.languages-container > button:nth-child(3)');
      await delay(1000);
      await verifyTextMatches(page, '#app > div:nth-child(3) > div.home > div.home-title > span', 'Travel with ATAC!');
    });

    it('French', async () => {
      await page.waitForSelector('#app > div:nth-child(3) > div.sidebar > div.languages-container > button:nth-child(4)');
      await page.click('#app > div:nth-child(3) > div.sidebar > div.languages-container > button:nth-child(4)');
      await delay(1000);
      await verifyTextMatches(page, '#app > div:nth-child(3) > div.home > div.home-function-container.flex.hend > button:nth-child(1) > div.button-label.flex.hcenter.vcenter > span', 'Consulter et Recharger la Carte');
    });

    it('Spanish', async () => {
      await page.waitForSelector('#app > div:nth-child(3) > div.sidebar > div.languages-container > button:nth-child(5)');
      await page.click('#app > div:nth-child(3) > div.sidebar > div.languages-container > button:nth-child(5)');
      await delay(1000);
      await verifyTextMatches(page, '#app > div:nth-child(3) > div.home > div.home-title > span', '¡Viaje con ATAC!');
    });

    it('German', async () => {
      await page.waitForSelector('#app > div:nth-child(3) > div.sidebar > div.languages-container > button:nth-child(6)');
      await page.click('#app > div:nth-child(3) > div.sidebar > div.languages-container > button:nth-child(6)');
      await delay(1000);
      await verifyTextMatches(page, '#app > div:nth-child(3) > div.home > div.home-title > span', 'Reisen Sie mit ATAC!');
    });

    it('Chinese', async () => {
      await page.waitForSelector('#app > div:nth-child(3) > div.sidebar > div.languages-container > button:nth-child(7)');
      await page.click('#app > div:nth-child(3) > div.sidebar > div.languages-container > button:nth-child(7)');
      await delay(1000);
      await verifyTextMatches(page, '#app > div:nth-child(3) > div.home > div.home-title > span', '与ATAC一起旅行！');
    });

    it('Russian', async () => {
      await page.waitForSelector('#app > div:nth-child(3) > div.sidebar > div.languages-container > button:nth-child(8)');
      await page.click('#app > div:nth-child(3) > div.sidebar > div.languages-container > button:nth-child(8)');
      await delay(1000);
      await verifyTextMatches(page, '#app > div:nth-child(3) > div.home > div.home-title > span', 'Путешествуйте с ATAC!');
    });

    it('Japanese', async () => {
      await page.waitForSelector('#app > div:nth-child(3) > div.sidebar > div.languages-container > button:nth-child(9)');
      await page.click('#app > div:nth-child(3) > div.sidebar > div.languages-container > button:nth-child(9)');
      await delay(1000);
      await verifyTextMatches(page, '#app > div:nth-child(3) > div.home > div.home-title > span', 'ATACで旅行をお楽しみください！');
    });

    it('Return to Italian', async () => {
      await page.waitForSelector('#app > div:nth-child(3) > div.sidebar > div.languages-container > button:nth-child(2)');
      await page.click('#app > div:nth-child(3) > div.sidebar > div.languages-container > button:nth-child(2)');
      await delay(1000);
      await verifyTextMatches(page, '#app > div:nth-child(3) > div.home > div.home-title > span', 'Viaggia con ATAC!');
    });
  });

  describe('Ticket purchase page test', () => {

    beforeAll(async() => {
      await page.waitForSelector('#app > div:nth-child(3) > div.home > div.home-function-container.flex.hend > button:nth-child(2)');
      await page.click('#app > div:nth-child(3) > div.home > div.home-function-container.flex.hend > button:nth-child(2)');

      await page.waitForSelector('#app > div:nth-child(3) > div.home > div.home-ticket-container > div:nth-child(1) > button');
      await page.click('#app > div:nth-child(3) > div.home > div.home-ticket-container > div:nth-child(1) > button');
  
      if(await page.waitForSelector('#app > div:nth-child(3) > div > div.popup-container') != null) {
        await page.waitForSelector('#app > div:nth-child(3) > div > div.popup-container > div.popup-button-container.flex.hcenter > button:nth-child(2)');
        await page.click('#app > div:nth-child(3) > div > div.popup-container > div.popup-button-container.flex.hcenter > button:nth-child(2)');
      }
    });

    it('Ticket type', async () => {
      await page.waitForSelector('#app > div:nth-child(3) > div.summary > div.summary-ticket-element.flex.vcenter > div.summary-ticket-identifier.flex-column.hcenter > div.ticket-title > span');
      await verifyTextMatches(page, '#app > div:nth-child(3) > div.summary > div.summary-ticket-element.flex.vcenter > div.summary-ticket-identifier.flex-column.hcenter > div.ticket-title > span', 'BIT 100 minuti');
    });

    it('Ticket price', async () => {
      await page.waitForSelector('#app > div:nth-child(3) > div.summary > div.summary-ticket-element.flex.vcenter > div.summary-ticket-price-container.flex-column.hcenter.vcenter > div.price-title > span');
      await verifyTextMatches(page, '#app > div:nth-child(3) > div.summary > div.summary-ticket-element.flex.vcenter > div.summary-ticket-price-container.flex-column.hcenter.vcenter > div.price-title > span', '1,50 €');
    });

    it('Ticket info', async () => {
      await page.waitForSelector('#app > div:nth-child(3) > div.summary > div.summary-ticket-element.flex.vcenter > div.summary-ticket-info-button.flex.hcenter.vcenter > i');
      await page.click('#app > div:nth-child(3) > div.summary > div.summary-ticket-element.flex.vcenter > div.summary-ticket-info-button.flex.hcenter.vcenter > i');
      await page.waitForSelector('#app > div.info-ticket > div.info-ticket-container');
      await page.click('#app > div.info-ticket > div.close-icon > i');
    });

    it('Amount to pay', async () => {
      await page.waitForSelector('#app > div:nth-child(3) > div.summary > div.summary-ticket-amount > div.ticket-amount-price.flex.vcenter > span');
      await verifyTextMatches(page, '#app > div:nth-child(3) > div.summary > div.summary-ticket-amount > div.ticket-amount-price.flex.vcenter > span', '2,50 €');
    });

    it('+ button', async () => {
      await page.click('#app > div:nth-child(3) > div.summary > div.summary-ticket-quantity > div.ticket-quantity-chooser.flex > button:nth-child(3)');
      await delay(1000);
      await verifyTextMatches(page, '#app > div:nth-child(3) > div.summary > div.summary-ticket-quantity > div.ticket-quantity-chooser.flex > div > span', '2');
      await verifyTextMatches(page, '#app > div:nth-child(3) > div.summary > div.summary-ticket-amount > div.ticket-amount-price.flex.vcenter > span', '5,00 €');
    });

    it('- button', async () => {
      await page.click('#app > div:nth-child(3) > div.summary > div.summary-ticket-quantity > div.ticket-quantity-chooser.flex > button:nth-child(1)');
      await delay(1000);
      await verifyTextMatches(page, '#app > div:nth-child(3) > div.summary > div.summary-ticket-quantity > div.ticket-quantity-chooser.flex > div > span', '1');
      await verifyTextMatches(page, '#app > div:nth-child(3) > div.summary > div.summary-ticket-amount > div.ticket-amount-price.flex.vcenter > span', '2,50 €');
    });

    it('Cancel purchase', async () => {
      await page.click('#app > div:nth-child(3) > div.summary > button');
      await page.waitForSelector('#app > div:nth-child(2) > div.popup-container');
      await page.click('#app > div:nth-child(2) > div.popup-container > div.popup-button-container.flex.hcenter > button:nth-child(2)');
      await page.waitForSelector("#app > div:nth-child(3) > div.home > div.home-title > span");
    }, 10000);
  })

  afterAll(async () => {
    await browser.disconnect();
  });
});