describe("bookingTicketView", () => {
    let page;
    const timeout = 16000;
    const url = 'http://localhost:8000/reserve';

    beforeAll(async() => {
        page = await global.__BROWSER__.newPage();
    });

    afterAll(async() => {
        await page.close();
    });

    test('initial Test', async() => {
        await page.goto(url);

        const TOTAL_COUNT = 16;
        const resultsSelector = '.count_control_input';
        await page.waitForSelector('.count_control_input');

        let totalCount = await page.evaluate(resultsSelector => {
            const tickets = Array.from(document.querySelectorAll(resultsSelector));
            return tickets.map(e=> Number(e.value)).reduce((acc, cur) => acc + cur, 0)
        }, resultsSelector);
        expect(totalCount).toBe(TOTAL_COUNT);

        await page.waitForSelector('#totalCount');
        totalCount = await page.$eval('#totalCount', e => Number(e.innerHTML));
        expect(totalCount).toBe(TOTAL_COUNT);
    }, timeout);

    test('gototop click Test', async() => {
        await page.goto(url);
        await page.waitForSelector('.gototop');
        const Height = await page.evaluate(_ => window.innerHeight);
        let scrollY = await page.evaluate(y => {
            window.scrollTo(0, y);
            return window.scrollY;
        }, Height);
        expect(scrollY).toBe(Height);

        await page.click('.gototop');
        scrollY = await page.evaluate(_ => window.scrollY);
        expect(scrollY).toBe(0);

    }, timeout);

});