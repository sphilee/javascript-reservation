import puppeteer from 'puppeteer';

let page;
let browser;

beforeAll(async() => {
    browser = await puppeteer.launch();
    page = await browser.newPage();

});

afterAll(() => {
    browser.close();
});

describe("slideView", () => {
    test('initial Test', async() => {
        await page.goto('http://localhost:8000/mainpage');
        await page.waitForSelector('.visual_img');
        const activeIndex = await page.$eval('.visual_img', e => e.dataset.index);
        expect(activeIndex).toBe('1');
    }, 16000);

    test('autoplay Test', async() => {
        await page.goto('http://localhost:8000/mainpage');
        await page.waitForSelector('.visual_img');
        await page.waitFor(2000);
        const activeIndex = await page.$eval('.visual_img', e => e.dataset.index);
        expect(activeIndex).toBe('2');
    }, 16000);

    test('slides_prev click Test', async() => {
        await page.goto('http://localhost:8000/mainpage');
        await page.waitForSelector('.slides_prev');
        await page.click('.slides_prev');
        await page.waitFor(2000);
        const activeIndex = await page.$eval('.visual_img', e => e.dataset.index);
        expect(activeIndex).toBe('5');
    }, 16000);

    test('slides_next click Test', async() => {
        await page.goto('http://localhost:8000/mainpage');
        await page.waitForSelector('.slides_next');
        await page.click('.slides_next');
        await page.waitFor(2000);
        const activeIndex = await page.$eval('.visual_img', e => e.dataset.index);
        expect(activeIndex).toBe('2');
    }, 16000);

});

describe("tabView", () => {
    test('initial Test', async() => {
        await page.goto('http://localhost:8000/mainpage');
        await page.waitForSelector('.wrap_event_box.active');
        const activeIndex = await page.$eval('.wrap_event_box.active', e => e.dataset.category);
        expect(activeIndex).toBe('0');
    }, 16000);

    test('tab click Test', async() => {
        await page.goto('http://localhost:8000/mainpage');
        await page.waitForSelector('.event_tab_lst');
        await page.click('.item[data-category="3"]');
        const activeIndex = await page.$eval('.wrap_event_box.active', e => e.dataset.category);
        expect(activeIndex).toBe('3');
    }, 16000);

    test('more click Test', async() => {
        await page.goto('http://localhost:8000/mainpage');
        await page.waitForSelector('.more > .btn');
        await page.click('.more >.btn ');
        const itemsCount = await page.$$eval('.lst_event_box >.item ', items => items.length);
        expect(itemsCount).toBe(8);
    }, 16000);

});