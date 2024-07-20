import {chromium} from "playwright";

export const listadoSitios = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md');
  const text = await page.$eval('article', e => e.textContent);
  // console.log('Listado sitios soportados por yt-dlp');
  await browser.close();
  return text;
}

// listadoSitios().then(texto => console.log(texto))


