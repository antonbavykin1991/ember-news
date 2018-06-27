import Ember from 'ember'
import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default Route.extend({
  session: service(),

  beforeModel() {
    return this.get('session')
      .fetch()
      .catch(() => {
        Ember.Logger.log('session is invalid')
      })
  }
})

