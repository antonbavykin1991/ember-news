import Ember from 'ember'
import { task, timeout } from 'ember-concurrency'
import { inject as service } from '@ember/service'
import { get } from '@ember/object'

export const getTotalCount = (firebase, { modelName } = {}) => {
  return new Promise((resolve) => {
    firebase.child(Ember.String.pluralize(modelName)).on('value', (snapshot) => {
      resolve(snapshot.numChildren())
    })
  })
}

export const getPaginationData = task({
  firebase: service(),

  *perform({
    per = 3,
    modelName
  } = {}) {
    try {
      const firebase = get(this, 'firebase')
      const totalCount = yield getTotalCount(firebase, {
        modelName
      })

      return {
        totalCount,
        per,
        pages: Math.ceil(totalCount / per )
      }
    } catch(error) {
      Ember.Logger.log(error)
    }
  }
})

export const getFirebaseListData = task({
  store: service(),

  firebase: service(),

  startAt: null,

  *perform({
    currentPage = 1,
    per = 3,
    modelName
  } = {}) {
    try {
      yield timeout(500)

      const store = get(this, 'store')
      const limitToFirst = get(this, 'limitToFirst')
      let options = {}

      if (!limitToFirst) {
        options = {
          limitToFirst: per * currentPage
        }
      }

      const result = yield store.query(modelName, options)

      return result.slice(per * (currentPage - 1))
    } catch (error) {
      Ember.Logger.log(error)
    }
  }
}).restartable()
