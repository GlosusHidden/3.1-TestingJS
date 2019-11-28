const path = require('path')

const puppeteer = require('puppeteer');

const makeDOM = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto(`file:${path.join(__dirname, '../public/index.html')}`, { waitUntil: 'networkidle0' });

  let data = await page.evaluate(() => {
    let search_block = document.getElementById('search_block');
    let myInput = document.getElementById('myInput');
    let myButton = document.getElementById('myButton');
    myInput.value = 'Moscow'
    myButton.click();
    return {}
  });
};

//makeDOM();
