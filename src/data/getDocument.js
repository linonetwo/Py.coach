const cheerio = require('cheerio')
const axios = require('axios')

const data = require('./AwsomePython/AwsomePython.json')

async function getDocument() {
  await Promise.all(Object.keys(data).map(async (className) => {
    const { classDescription, urlList } = data[className]
    // 下载这个类别里每个包的文档
    await Promise.all(urlList.map(({ href }) =>
      axios.get(href)
        .then(({ status, data }) => {
          if (status === 200) {
            const $ = cheerio.load(data)
            $('a').each((index, anchor) => {
              console.log($(anchor).text())
            })
          }
        })
        .catch(error => console.error(href, error)),
    ))
  }))
}

getDocument().catch('unexpected error: ', console.error)
