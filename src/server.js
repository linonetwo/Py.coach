const Koa = require('koa')
const cheerio = require('cheerio')
const axios = require('axios')
const isUrl = require('is-url-superb')
const _ = require('lodash')

const proxyPort = 3001

async function getDocument(href) {
  const { status, data } = await axios.get(href)
  if (status !== 200) {
    throw new Error(`Site ${href} return ${status}`)
  }
  const $ = cheerio.load(data)
  const docList = $('a').map((index, anchor) => {
    const anchorHref = $(anchor).attr('href')
    const anchorText = $(anchor).text()
    if (isUrl(anchorHref) && anchorText.match(/doc/gi)) {
      return { anchorText, anchorHref }
    }
    return undefined
  }).get()

  const uniqueDocAnchorList = _.uniqBy(docList, 'anchorHref')
  return uniqueDocAnchorList
}

const app = new Koa();
console.log(`Proxy server starting at ${proxyPort}`)
// response 
app.use(async (ctx) => {
  const urls = ctx.request.url.split('/?url=')
  if (urls && urls.length > 0 && urls[1]) {
    try {
      const docAndAnchors = await getDocument(urls[1])
      ctx.body = JSON.stringify(docAndAnchors, null, '  ')
    } catch ({ message }) {
      ctx.body = message
    }
  } else {
    ctx.body = 'Ask likes http://localhost:3001/?url=https://www.npmjs.com/package/koa';
  }
});

app.listen(proxyPort);
console.log(`Proxy server started at ${proxyPort}`)
