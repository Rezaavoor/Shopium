import chromium from 'chrome-aws-lambda'

export default async (req, res) => {
  let browser
  let token = ''
  try {
    // production
    console.log('using puppeter-core with chrome-aws')
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: { ...chromium.defaultViewport, isMobile: true },
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    })

    const page = await browser.newPage()
    await page.setRequestInterception(true)
    page.on('request', async (req) => {
      if (
        req.resourceType() === 'stylesheet' ||
        req.resourceType() === 'font' ||
        req.resourceType() == 'image'
      )
        // reduce the amount of load to speed up the process
        req.abort()
      else {
        req.continue()
        if (req.headers().authorization) {
          token = req.headers().authorization
          await page._client.send('Page.stopLoading') // stop loading
        }
      }
    })

    await page.goto('https://www.blocket.se/om/press')

    res.statusCode = 200
    res.json({ token })
  } catch (error) {
    console.log(error)
    res.statusCode = 400
    res.json({ error })
  } finally {
    if (browser) await browser.close()
  }
}
