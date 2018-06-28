import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { task, timeout } from 'ember-concurrency'

module('Integration | Component | firebase-list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const mockModels = [{
      name: 'test-1'
    }, {
      name: 'test-2'
    }]

    const mockTask = task({
      *perform() {
        yield timeout(100)

        return mockModels
      }
    })

    this.set('mockTask', mockTask)

    await render(hbs`
      {{#firebase-list
          currentPage=1
          per=2
          getFirebaseListData=mockTask
          as |fl|
      }}
        {{#each fl.models as |model|}}
          <div class="test-item">{{model.name}}</div>
        {{/each}}
      {{/firebase-list}}
    `);

    const testItems = this.element.querySelectorAll('.test-item')

    assert.equal(testItems.length, mockModels.length, 'it has good length of models')
    assert.equal(testItems[0].textContent.trim(), mockModels[0].name)
    assert.equal(testItems[1].textContent.trim(), mockModels[1].name)
  });
});
