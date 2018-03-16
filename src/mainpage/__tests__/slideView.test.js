describe("slideView", () => {
    let page;
    const autoplaySpeed = 2000;
    const timeout = 16000;
    const url = 'http://localhost:8000/mainpage';

    beforeAll(async() => {
        page = await global.__BROWSER__.newPage();
    });

    afterAll(async() => {
        await page.close();
    });

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