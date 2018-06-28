import Service from '@ember/service'
import { get } from '@ember/object'

export default Service.extend({
  transitionTo(...props) {
    get(this, 'router').transitionTo(...props)
  }
})
