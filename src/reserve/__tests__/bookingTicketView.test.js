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
        await page.waitForSelector('.section_booking_ticket');

        const TOTAL_COUNT = 16;
        const resultsSelector = '.count_control_input';

        let totalCount = await page.evaluate(resultsSelector => {
            const tickets = Array.from(document.querySelectorAll(resultsSelector));
            return tickets.map(e=> +e.value).reduce((acc, cur) => acc + cur, 0)
        }, resultsSelector);
        expect(totalCount).toBe(TOTAL_COUNT);

        await page.waitForSelector('#totalCount');
        totalCount = await page.$eval('#totalCount', e => +e.innerHTML);
        expect(totalCount).toBe(TOTAL_COUNT);
    }, timeout);

    test('plus button click Test', async() => {
        await page.goto(url);
        await page.waitForSelector('.section_booking_ticket');

        const SELECT1_COUNT = 0;
        const SELECT3_COUNT = 3;
        
        let select = 3;

        let count = await page.$eval(`.qty:nth-child(${select}) .count_control_input`, e => +e.value);
        expect(count).toBe(SELECT3_COUNT);

        await page.click(`.qty:nth-child(${select}) .ico_plus3`);

        count = await page.$eval(`.qty:nth-child(${select}) .count_control_input`, e => +e.value);
        expect(count).toBe(SELECT3_COUNT+1);

        select = 1;

        count = await page.$eval(`.qty:nth-child(${select}) .count_control_input`, e => +e.value);
        expect(count).toBe(SELECT1_COUNT);

        await page.click(`.qty:nth-child(${select}) .ico_plus3`);

        count = await page.$eval(`.qty:nth-child(${select}) .count_control_input`, e => +e.value);
        expect(count).toBe(SELECT1_COUNT+1);


    }, timeout);

    test('minus button click Test', async() => {
        await page.goto(url);
        await page.waitForSelector('.section_booking_ticket');

        const SELECT2_COUNT = 10;
        const SELECT3_COUNT = 3;

        let select = 3;

        let count = await page.$eval(`.qty:nth-child(${select}) .count_control_input`, e => +e.value);
        expect(count).toBe(SELECT3_COUNT);

        await page.click(`.qty:nth-child(${select}) .ico_minus3`);

        count = await page.$eval(`.qty:nth-child(${select}) .count_control_input`, e => +e.value);
        expect(count).toBe(SELECT3_COUNT-1);

        select = 2;

        count = await page.$eval(`.qty:nth-child(${select}) .count_control_input`, e => +e.value);
        expect(count).toBe(SELECT2_COUNT);

        await page.click(`.qty:nth-child(${select}) .ico_minus3`);

        count = await page.$eval(`.qty:nth-child(${select}) .count_control_input`, e => +e.value);
        expect(count).toBe(SELECT2_COUNT-1);


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