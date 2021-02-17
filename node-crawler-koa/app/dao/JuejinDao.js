import { openChrome } from './hook/createDriver'
import { By } from 'selenium-webdriver'
import { Sitdown } from 'sitdown'
import { applyJuejinRule } from '@sitdown/juejin'

async function findContent (url) {
  const driver = await openChrome(url)
  const data = {}
  await driver.sleep(1000)
  const titleElement = await driver.findElement(By.className('article-title'))
  data.title = await titleElement.getAttribute('innerText')
  const contentElement = await driver.findElement(By.className('markdown-body'))
  const contentHTML = await contentElement.getAttribute('innerHTML')
  let sitdown = new Sitdown({
    keepFilter: ['style'],
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    hr: '---',
  })
  sitdown.use(applyJuejinRule)
  const markdown = sitdown.HTMLToMD(contentHTML)
  console.log(markdown)
  data.content = contentHTML
  await driver.quit()
  return data
}

class JuejinDao {
  constructor (data) {
    this.data = data
  }

  async getBlog () {
    const url = this.data
    return findContent(url)
  }
}

export default JuejinDao
