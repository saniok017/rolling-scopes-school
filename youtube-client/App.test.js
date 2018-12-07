import puppeteer from 'puppeteer';
import faker from 'faker';

const APP = 'http://localhost:8080/';
let page;
let browser;
const width = 1920;
const height = 1080;

const value = {
  value: faker.random.words(),
};
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 40,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});
afterAll(() => {
  browser.close();
});

describe('Testing', () => {
  test('assert that <title> is correct', async () => {
    await page.goto(APP);
    const title = await page.title();
    expect(title).toBe('youtube-client');
  }, 16000);
  test('assert that a input named search exists', async () => {
    await page.goto(APP);
    await page.waitForSelector('#search');
  }, 16000);
});

describe('search bar', () => {
  test('serch request', async () => {
    await page.goto(APP);
    await page.waitForSelector('#search');
    await page.click('#search');
    await page.type('#search', value.value);
    await page.click('#submit');
    await page.waitForSelector('figure');
  }, 16000);
});

describe('nav bar', () => {
  test('buttons test', async () => {
    await page.goto(APP);
    await page.waitForSelector('#search');
    await page.click('#search');
    await page.type('#search', value.value);
    await page.click('#submit');
    await page.waitForSelector('figure');
    await page.click('#next');
    await page.click('#next');
    await page.click('#next');
    await page.click('#next');
    await page.click('#next');
    await page.click('#current');
    await page.click('#prev');
    await page.click('#start');
  }, 16000);
});
