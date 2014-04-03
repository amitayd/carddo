'use strict';

describe('Directive: contentEditable', function () {
  beforeEach(module('frontendApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<content-editable></content-editable>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the contentEditable directive');
  }));
});
