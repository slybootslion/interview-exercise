import { Builder, By, until } from 'selenium-webdriver'

const creatDriver = async () => {
  return new Builder().forBrowser('chrome').build()
}

const findElement = async url => {
  const driver = await creatDriver()
  const urls = []
  await driver.get(url).then(async () => {
    let containers = await driver.wait(until.elementsLocated(By.className('img-wrap-inner')), 2000)
    const len = containers.length
    for (let i = 0; i < len; i++) {
      const item = containers[i]
      const imgElements = await item.findElement(By.css('img'))
      const url = await imgElements.getAttribute('src')
      urls.push(url)
    }
    await driver.quit()
  })

  return urls

  // return urls.map(url => {
  //   return 'https://img-bcy-qn.pstatp.com' + url.split('~tplv-banciyuan-w650')[0].split('img/banciyuan')[1]
  // })
}

// const url = 'https://bcy.net/item/detail/6853059068676817159'
// const url = 'https://www.baidu.com'

// findElement(url).then(res => {
//   console.log(res)
// })

// https://bcy.net/item/detail/6485426833440399118
// img-wrap-inner

class BcyDao {
  constructor (data) {
    this.data = data
  }

  async getXiaoJieJie () {
    const url = this.data
    const urls = await findElement(url)
    return urls
  }
}

export default BcyDao
