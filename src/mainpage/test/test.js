import puppeteer from 'puppeteer';

test('first Test', async() => {
    let browser = await puppeteer.launch({headless: false});
    let page = await browser.newPage();

    await page.goto('http://localhost:8000/mainpage');
    await page.waitForSelector('.viewReservation');

    const html = await page.$eval('.viewReservation', e => e.innerHTML);
    expect(html).toBe('예약확인');

    browser.close();
}, 16000);