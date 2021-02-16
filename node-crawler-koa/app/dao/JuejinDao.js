import { openChrome } from './hook/createDriver'
import { By, until } from 'selenium-webdriver'

async function findContent (url) {
  const driver = await openChrome(url)
  const data = {}

  data.title = await driver.wait(until.elementsLocated(By.className('article-title')), 1000)

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
