/**
 * Mocking client-server processing
 */
const _companies = [
  {"id": 1, "name": "株式会社hoge", "rank": 1, "url": 'http://google.com', "tel": "03-5464-6454", "order": null, "is_hidden": false},
  {"id": 2, "name": "fu-ga株式会社", "rank": 1, "url": 'http://google.com', "tel": "03-5464-6454", "order": null, "is_hidden": false},
  {"id": 3, "name": "なんちってとぅでいあいむなうふぁっきんせいいぇ", "rank": 1, "url": 'http://google.com', "tel": "03-5464-6454", "order": null, "is_hidden": false}
]

export const CompanyTaskAPI {
  get (cb) {
    setTimeout(() => cb(_companies), 100)
  },

  add (products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  }
}
