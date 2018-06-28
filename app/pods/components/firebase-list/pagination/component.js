import Component from '@ember/component'
import { getPaginationData } from 'ember-news/tasks'
import { computed } from '@ember/object'

export default Component.extend({
  modelName: null,

  per: null,

  currentPage: null,

  getPaginationData,

  totalCount: computed.reads('getPaginationData.last.value.totalCount'),

  pages: computed.reads('getPaginationData.last.value.pages'),

  paginationData: computed('pages', 'currentPage', {
    get () {
      const pages = this.get('pages')
      const paginationData = [];
      const currentPage = this.get('currentPage')

      if (pages === 1) {
        return null
      }

      for (let i = 0; i < pages; i++) {
        const page = i + 1

        paginationData.push({
          page,
          isActive: currentPage === page
        })
      }

      return paginationData
    }
  }),

  init() {
    this._super(...arguments)
    this.get('getPaginationData').perform({
      modelName: this.get('modelName'),
      per: this.get('per')
    })
  },

  paginate() {}
})
