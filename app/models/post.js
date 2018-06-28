import DS from 'ember-data'

export default DS.Model.extend({
  comments: DS.hasMany('comment'),

  owner: DS.attr('string'),

  title: DS.attr('string'),

  createdAt: DS.attr('number', {
    defaultValue() {
      return new Date()
    }
  }),

  description: DS.attr('string'),

  likes: DS.attr({
    defaultValue() {
      return {}
    }
  })
})
