import Component from '@ember/component'
import { computed } from '@ember/object'
import { logout } from 'ember-news/tasks'
import { inject as service } from '@ember/service'

export default Component.extend({
  session: service(),

  isAuthenticated: computed.reads('session.isAuthenticated'),

  email: computed.reads('session.currentUser.email'),

  isRunning: computed.reads('logout.last.isRunning'),

  logout
})
