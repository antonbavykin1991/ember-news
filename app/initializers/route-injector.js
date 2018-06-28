export function initialize(application) {
  application.inject('service', 'router', 'router:main');
}

export default {
  initialize
};
