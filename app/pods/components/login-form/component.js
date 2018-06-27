import Component from '@ember/component';
import { inject as service } from '@ember/service'
import { signIn } from 'ember-news/tasks'
import { computed } from '@ember/object'

export default Component.extend({
  visitor: service(),

  isRunning: computed.reads('signIn.last.isRunning'),

  errorMessage: computed.reads('signIn.last.errorMessage'),

  hasError: computed.bool('errorMessage'),

  signIn
})
