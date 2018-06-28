import Ember from 'ember'
import { task } from 'ember-concurrency'
import { inject as service } from '@ember/service'

export default task({
  session: service(),
  routing: service(),

  *perform() {
    try {
      yield this.get('session').close()
      yield this.get('routing').transitionTo('/')
    } catch (error) {
      Ember.Logger.log(error)
    }
  }
})
