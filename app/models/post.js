import DS from 'ember-data'

export default DS.Model.extend({
  comments: DS.hasMany('comment'),

  owner: DS.attr('string'),

  title: DS.attr('string'),

  description: DS.attr('string'),

  likes: DS.attr({
    defaultValue() {
      return {}
    }
  })
})
