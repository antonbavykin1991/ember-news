import Component from '@ember/component'
import { getFirebaseListData } from 'ember-news/tasks'
import { computed } from '@ember/object'

export default Component.extend({
  classNames: ['firebase-list__conatiner'],

  modelName: null,

  getFirebaseListData,

  per: 3,

  currentPage: 1,

  models: computed.reads('getFirebaseListData.last.value'),

  isRunning: computed.reads('getFirebaseListData.last.isRunning'),

  init() {
    this._super(...arguments)
    this.paginate(this.get('currentPage'))
  },

  paginate (currentPage) {
    this.get('getFirebaseListData').perform({
      modelName: this.get('modelName'),
      per: this.get('per'),
      currentPage
    })

    this.set('currentPage', currentPage)
  }
})
