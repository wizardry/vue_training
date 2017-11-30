/**
 * Mocking client-server processing
 */
const _companies = [{}]

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
