/*globals EmberDev */

import { get } from 'ember-metal/property_get';
import { set } from 'ember-metal/property_set';
import run from 'ember-metal/run_loop';

import EmberView from 'ember-views/views/view';

let parentView, view;

QUnit.module('Ember.View#element', {
  teardown() {
    run(() => {
      if (parentView) { parentView.destroy(); }
      view.destroy();
    });
  }
});

QUnit.test('returns null if the view has no element and no parent view', function() {
  view = EmberView.create();
  equal(get(view, 'parentView'), null, 'precond - has no parentView');
  equal(get(view, 'element'), null, 'has no element');
});

QUnit.test('returns element if you set the value', function() {
  view = EmberView.create();
  equal(get(view, 'element'), null, 'precond- has no element');

  let dom = document.createElement('div');
  set(view, 'element', dom);

  equal(get(view, 'element'), dom, 'now has set element');
});

if (EmberDev && !EmberDev.runningProdBuild) {
  QUnit.test('should not allow the elementId to be changed after inserted', function() {
    view = EmberView.create({
      elementId: 'one'
    });

    run(() => view.appendTo('#qunit-fixture'));

    throws(() => view.set('elementId', 'two'), 'raises elementId changed exception');

    equal(view.get('elementId'), 'one', 'elementId is still "one"');
  });
}
