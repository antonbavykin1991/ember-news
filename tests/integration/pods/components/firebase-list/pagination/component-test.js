import { module, test } from 'qunit'
import { setupRenderingTest } from 'ember-qunit'
import { render } from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'
import { task, timeout } from 'ember-concurrency'

module('Integration | Component | firebase-list/pagination', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    const mockTask = task({
      *perform() {
        yield timeout(100)

        return {
          pages: 5
        }
      }
    })

    this.set('mockTask', mockTask)

    await render(hbs`
      {{firebase-list/pagination
          currentPage=1
          getPaginationData=mockTask
      }}
    `)

    assert.equal(this.element.querySelectorAll('li').length, 5)
    assert.equal(this.element.querySelector('.active').textContent.trim(), 1)
  })
})
