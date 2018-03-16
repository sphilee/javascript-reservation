describe.skip("tabView", () => {
    let page;
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

    test('click on the more button and click on another category and check the cache data ' +
            'of the original category', async() => {
        const ALL_ITEM_COUNT = 8;
        const MUSICAL_ITEM_COUNT = 3;
        await page.goto(url);
        await page.waitForSelector('.more > .btn');
        await page.click('.more >.btn ');

        let lastContent = await page.$eval('.active .item:last-child', e => e.innerHTML);
        let activeIndex = await page.$eval('.wrap_event_box.active', e => e.dataset.category);
        expect(activeIndex).toBe('0');
        expect(await page.$$('.active .item ')).toHaveLength(ALL_ITEM_COUNT);
        expect(lastContent).not.toHaveLength(0);

        await page.click('.item[data-category="2"]');
        lastContent = await page.$eval('.active .item:last-child', e => e.innerHTML);
        activeIndex = await page.$eval('.wrap_event_box.active', e => e.dataset.category);
        expect(activeIndex).toBe('2');
        expect(await page.$$('.active .item ')).toHaveLength(MUSICAL_ITEM_COUNT);
        expect(lastContent).not.toHaveLength(0);

        await page.click('.item[data-category="0"]');
        lastContent = await page.$eval('.active .item:last-child', e => e.innerHTML);
        activeIndex = await page.$eval('.wrap_event_box.active', e => e.dataset.category);
        expect(activeIndex).toBe('0');
        expect(await page.$$('.active .item ')).toHaveLength(ALL_ITEM_COUNT);
        expect(lastContent).not.toHaveLength(0);

    }, timeout);

});