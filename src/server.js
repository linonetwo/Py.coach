const Koa = require('koa')
const Router = require('koa-router')
const cheerio = require('cheerio')
const axios = require('axios')
const isUrl = require('is-url-superb')
const cors = require('kcors')
const _ = require('lodash')

const proxyPort = 3001

async function getDocument(href) {
  const { status, data } = await axios.get(href)
  if (status !== 200) {
    throw new Error(`Site ${href} return ${status}`)
  }
  const $ = cheerio.load(data)
  const docList = $('a').map((index, anchor) => {
    const anchorHref = $(anchor).attr('href') || ''
    const anchorText = $(anchor).text()
    if (isUrl(anchorHref) && anchorText.match(/doc/gi)) {
      return { anchorText, anchorHref }
    }
    return undefined
  }).get()

  const uniqueDocAnchorList = _.uniqBy(docList, 'anchorHref')
  return uniqueDocAnchorList
}

const router = new Router();

router.get('/docs', async (ctx) => {
  const urls = ctx.request.url.split('/docs?url=')
  if (urls && urls.length > 0 && urls[1]) {
    try {
      const docAndAnchors = await getDocument(urls[1])
      ctx.body = JSON.stringify(docAndAnchors, null, '  ')
    } catch (error) {
      console.error(error)
      ctx.body = error.message
    }
  } else {
    ctx.body = 'Ask likes http://localhost:3001/?url=https://www.npmjs.com/package/koa';
  }
});

router.get('/proxy', async (ctx) => {
  const urls = ctx.request.url.split('/proxy?url=')
  if (urls && urls.length > 0 && urls[1]) {
    const href = urls[1]
    try {
      const { status, data } = await axios.get(href)
      if (status !== 200) {
        throw new Error(`Site ${href} return ${status}`)
      }
      ctx.body = data
    } catch (error) {
      console.error(error)
      ctx.body = error.message
    }
  } else {
    ctx.body = 'Ask likes http://localhost:3001/?url=https://www.npmjs.com/package/koa';
  }
});


console.log(`Proxy server starting at ${proxyPort}`)
const app = new Koa();
app.use(router.routes())
app.use(cors())
app.listen(proxyPort);
console.log(`Proxy server started at ${proxyPort}`)
