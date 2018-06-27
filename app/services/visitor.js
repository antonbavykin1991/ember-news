import Service from '@ember/service'
import { inject as service } from '@ember/service'

export default Service.extend({
  session: service(),

  async auth(email, password) {
    try {
      const currentUser = await this
        .get('session')
        .open('firebase', {
          provider: 'password',
          email,
          password
        })

      return currentUser
    } catch (error) {
      return error
    }
  }
})
