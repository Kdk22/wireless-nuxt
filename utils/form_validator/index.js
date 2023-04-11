
export default class FormFieldErrors {
  constructor () {
    this.errors = {}
  }

  getError (path) {
    try {
      // eslint-disable-next-line
      return eval(`this.errors.${path}`)[0]
    } catch (e) {
      return null
    }
  }

  setError (data) {
    this.errors = data
  }
}
