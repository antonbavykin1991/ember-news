import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('auth', function() {
    this.route('registration');
  });
  this.authenticatedRoute('create-post');
  this.route('post', { path: 'post/:id' });
  this.authenticatedRoute('profile');
});

export default Router;
