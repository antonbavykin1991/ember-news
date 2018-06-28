import Component from '@ember/component'

export default Component.extend({
  init() {
    this._super(...arguments)

    this.set('breadcrumbItems', [{
      route: 'index',
      title: 'Home'
    }, {
      title: this.get('title')
    }])
  },

  title: '',

  description: ''
})
