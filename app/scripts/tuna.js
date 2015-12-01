'use strict';

angular.module('rumca-js')
  .factory('Tuna', function($window, Ctx) {
    var Tuna = $window.Tuna;
    return new Tuna(Ctx);
  });
