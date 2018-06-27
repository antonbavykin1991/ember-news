import { task } from 'ember-concurrency'
import { inject as service } from '@ember/service'
import { get } from '@ember/object'

export default task({
  session: service(),

  hasError: false,
  errorMessage: '',

  *perform(email, password) {
    try {
      this.set('errorMessage', '')

      yield this
        .get('session')
        .open('firebase', {
          provider: 'password',
          email,
          password
        })
    } catch (error) {
      const errorMessage = get(error || {}, 'message')
      this.set('errorMessage', errorMessage)
    }
  }
})
