/*
  Some utility methods used in Puppeteer tests.
*/
const { exec } = require('child_process');

/**
 * Uploads the test report file to the server.
 * 
 * @param {string} filePath - The path to the test report file.
 * 
 */
async function uploadTestReport(filePath) {
  try {
    const hostname = await getHostname();
    
    const currentDate = getCurrentDate('YYYYMMDD');

    const destinationFileName = 'report_' + getCurrentTime('hhmm') + '.html';

    const curlCommand = 'curl -L ... \
      -F "hostname=' + hostname + '" \
      -F "folder=test_report/' + currentDate + '" \
      -F "param_name=@' + filePath + ';filename=' + destinationFileName + '"';

    exec(curlCommand, (error) => {
      if (error) {
        console.error("Error during test report upload: " + error);
        return;
      }
      console.log('\x1b[32m', 'Test report file uploaded successfully.', '\x1b[0m');
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * Retrieves the WebSocket URL for the Chrome DevTools Protocol for a given port.
 * 
 * @param {number} port - The port number where the Chrome DevTools Protocol is running.
 * 
 * @returns {Promise<string|null>} - A promise that resolves with the WebSocket URL, or null if an error occurs.
 */
async function getDevToolsWebSocketURL(port) {
  try {
    const response = await fetch('http://localhost:' + port + '/json/version');
    if (!response.ok) {
      throw new Error('Error during request');
    }
    const json = await response.json();
    const webSocketURL = json.webSocketDebuggerUrl;
    return webSocketURL;
  } catch (error) {
    process.stdout.write('Error:', error);
    return null;
  }
}

/**
 * Delays the execution for the specified time.
 * 
 * @param {number} time - The time to delay in milliseconds.
 * 
 * @returns {Promise<void>} - A promise that resolves after the specified time.
 */
async function delay(time) {
  return new Promise(function(resolve) { 
    setTimeout(resolve, time)
  });
}

/**
 * Verifies if element text matches the expected text.
 * 
 * @param {Page} page - The Puppeteer page instance.
 * @param {string} selector - The CSS selector of the element to check.
 * @param {string} expectedText - The expected text for the element.
 * 
 * @returns {Promise<void>} - A Promise that resolves when the test is completed.
 */
async function verifyTextMatches(page, selector, expectedText) {
  const elementText = await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    return element ? element.textContent.trim() : null;
  }, selector);

  expect(elementText).toBe(expectedText);
}

/**
 * Verifies element text includes the expected text.
 * 
 * @param {Page} page - Puppeteer page instance.
 * @param {string} selector - CSS selector of the element to check.
 * @param {string} expectedText - Expected text to be included.
 * 
 * @returns {Promise<void>} - Promise that resolves when the verification is complete.
 */
async function verifyTextIncludes(page, selector, expectedText) {
  const elementText = await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    return element ? element.textContent.trim() : null;
  }, selector);

  expect(elementText).toContain(expectedText);
}

/**
 * Asynchronously retrieves the hostname of the current machine.
 * 
 * @returns {Promise<string>} A promise that resolves with the hostname.
 */
async function getHostname() {
  return new Promise((resolve, reject) => {
    exec('hostname', (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(new Error(stderr));
        return;
      }
      resolve(stdout.trim());
    });
  });
}

/**
 * Retrieves the current date in 'YYYYMMDD' or 'DD/MM/YYYY' format.
 * 
 * @returns {string} - The current date in 'YYYYMMDD' or 'DD/MM/YYYY' format.
 */
function getCurrentDate(format) {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  switch(format) {
    case 'YYYYMMDD':
      return year + month + day;
    case 'DD/MM/YYYY':
      return day + '/' + month + '/' + year;
    default:
      return day + '/' + month + '/' + year;
  }
}

/**
 * Retrieves the current time in 'HH:MM' format.
 * 
 * @returns {string} - The current time in 'HH:MM' format.
 */
function getCurrentTime(format) {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  switch(format) {
    case 'hh:mm':
      return hours + ':' + minutes;
    case 'hhmm':
      return String(hours) + String(minutes);
    default:
      return hours + ':' + minutes;
  }
}

module.exports = { getDevToolsWebSocketURL, delay, verifyTextMatches, verifyTextIncludes, uploadTestReport, getCurrentDate, getCurrentTime};