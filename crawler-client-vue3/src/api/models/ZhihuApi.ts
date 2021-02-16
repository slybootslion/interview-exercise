import http from '@/api/http'

class ZhihuApi {
  private prefix: string

  constructor () {
    this.prefix = '/bcy'
  }

  getZhihu (url: string, type: string) {
    if (type === 'zl') {
      this.zl(url)
    } else {
      this.wt(url)
    }
  }

  zl (url: string) {
    return http({
      url: `${this.prefix}/zl`,
      params: url,
    })
  }

  wt (url: string) {
    return http({
      url: `${this.prefix}/wt`,
      params: url,
    })
  }
}

export default new ZhihuApi()
