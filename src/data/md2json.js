const MarkdownIt = require('markdown-it')
const path = require('path')
const fs = require('fs')
const cheerio = require('cheerio')

const mdtext = fs.readFileSync(path.join(__dirname, './AwsomePython/AwsomePython.md'), 'utf8')
const md = new MarkdownIt()
const htmlFromMD = md.render(mdtext)

const result = {}
const $ = cheerio.load(htmlFromMD)
// console.log(htmlFromMD)
const libraryDescriptionPattern = /\s-\s(.+)/g

$('h2').each((index, header2) => {
  // 取得类别的信息
  const className = $(header2).text()
  const classDescriptionElement = $(header2).next()
  const classDescription = $(classDescriptionElement).children('em').text()

  // 处理每一个库
  const urlList = $(classDescriptionElement).next().children('li').map((aIndex, listItem) => {
    const libraryDescriptionArray = $(listItem).text().match(libraryDescriptionPattern)
    const libraryDescription = libraryDescriptionArray && libraryDescriptionArray[0].replace(' - ', '')
    const anchor = $(listItem).children().first()
    const href = $(anchor).attr('href')
    const name = $(anchor).text()
    return {
      href,
      name,
      libraryDescription,
    }
  }).get()

  // 把结果塞进 JSON
  result[className] = {
    className,
    classDescription,
    urlList,
  }
})

fs.writeFileSync(path.join(__dirname, './AwsomePython/AwsomePython.json'), JSON.stringify(result, null, '  '))
