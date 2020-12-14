import chromium from 'chrome-aws-lambda'
export default async (req, res) => {
  let browser
  let data = ''
  try {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // dev
      import puppeteer from 'puppeteer'
      console.log('using usual puppeter')
      browser = await puppeteer.launch()
    } else {
      // production
      console.log('using puppeter-core with chrome-aws')
      browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      })
    }
    const page = await browser.newPage()
    await page.goto('https://example.com')
    data = await page.evaluate(() => document.querySelector('*').outerHTML)
    console.log('data fetched')
  } catch (error) {
    console.log(error)
    res.statusCode = 200
    res.json({ error })
  } finally {
    if (browser) {
      await browser.close()
      res.statusCode = 200
      res.json({ data })
    }
  }
}
