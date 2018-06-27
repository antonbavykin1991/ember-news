import { task } from 'ember-concurrency'
import { inject as service } from '@ember/service'
import { get } from '@ember/object'

export default task({
  session: service(),
  store: service(),

  hasError: false,
  errorMessage: '',

  *perform(title, description) {
    try {
      const currentUserId = this.get('session.currentUser.uid')

      const post = this.get('store').createRecord('post', {
        title,
        description,
        owner: currentUserId
      })

      yield post.save()
    } catch (error) {
      const errorMessage = get(error || {}, 'message')
      this.set('errorMessage', errorMessage)
    }
  }
})
