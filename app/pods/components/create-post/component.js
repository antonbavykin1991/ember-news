import Component from '@ember/component';
import { createPost } from 'ember-news/tasks'
import { computed } from '@ember/object'

export default Component.extend({
  isRunning: computed.reads('createPost.last.isRunning'),

  errorMessage: computed.reads('createPost.last.errorMessage'),

  hasError: computed.bool('errorMessage'),

  createPost
});
