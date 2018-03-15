import puppeteer from 'puppeteer';

describe("/mainpage", () => {

    let page;
    let browser;
    const autoplaySpeed = 2000;
    const timeout = 16000;
    const url = 'http://localhost:8000/mainpage';

    beforeAll(async() => {
        browser = await puppeteer.launch({headless: false});
        page = await browser.newPage();

    });

    afterAll(() => {
        browser.close();
    });

    describe("slideView", () => {
        test('initial Test', async() => {
            await page.goto(url);
            await page.waitForSelector('.visual_img');
            const activeIndex = await page.$eval('.visual_img', e => e.dataset.index);
            expect(activeIndex).toBe('1');
        }, timeout);

        test('autoplay Test', async() => {
            await page.goto(url);
            await page.waitForSelector('.visual_img');
            await page.waitFor(autoplaySpeed);
            let activeIndex = await page.$eval('.visual_img', e => e.dataset.index);
            expect(activeIndex).toBe('2');
        }, timeout);

        test('slides_prev click Test', async() => {
            await page.goto(url);
            await page.waitForSelector('.slides_prev');
            await page.click('.slides_prev');
            await page.waitFor(autoplaySpeed);
            const activeIndex = await page.$eval('.visual_img', e => e.dataset.index);
            expect(activeIndex).toBe('5');
        }, timeout);

        test('slides_next click Test', async() => {
            await page.goto(url);
            await page.waitForSelector('.slides_next');
            await page.click('.slides_next');
            await page.waitFor(autoplaySpeed);
            const activeIndex = await page.$eval('.visual_img', e => e.dataset.index);
            expect(activeIndex).toBe('2');
        }, timeout);

    });

    describe("tabView", () => {
        test('initial Test', async() => {
            await page.goto(url);
            await page.waitForSelector('.wrap_event_box.active');
            const activeIndex = await page.$eval('.wrap_event_box.active', e => e.dataset.category);
            expect(activeIndex).toBe('0');

            const totalEvent = await page.$eval('.pink', e => e.innerHTML);
            expect(totalEvent).toBe('10개');
        }, timeout);

        test('tab click Test', async() => {
            await page.goto(url);
            await page.waitForSelector('.event_tab_lst');
            await page.click('.item[data-category="3"]');
            let activeIndex = await page.$eval('.wrap_event_box.active', e => e.dataset.category);
            expect(activeIndex).toBe('3');

            await page.click('.item[data-category="1"]');
            activeIndex = await page.$eval('.wrap_event_box.active', e => e.dataset.category);
            expect(activeIndex).toBe('1');
        }, timeout);


        test('more click Test', async() => {
            await page.goto(url);
            await page.waitForSelector('.more > .btn');
            await page.click('.more >.btn ');
            expect(await page.$$('.active .item ')).toHaveLength(8);
        }, timeout);

        test('cache item Test', async() => {
            await page.goto(url);
            await page.waitForSelector('.more > .btn');
            await page.click('.more >.btn ');
            let activeIndex = await page.$eval('.wrap_event_box.active', e => e.dataset.category);
            expect(await page.$$('.active .item ')).toHaveLength(8);
            expect(activeIndex).toBe('0');

            await page.click('.item[data-category="2"]');
            activeIndex = await page.$eval('.wrap_event_box.active', e => e.dataset.category);
            expect(activeIndex).toBe('2');
            expect(await page.$$('.active .item ')).toHaveLength(3);

            await page.click('.item[data-category="0"]');
            activeIndex = await page.$eval('.wrap_event_box.active', e => e.dataset.category);
            expect(activeIndex).toBe('0');
            expect(await page.$$('.active .item ')).toHaveLength(8);

        }, timeout);

    });

});