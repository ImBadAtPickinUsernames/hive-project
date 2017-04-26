/* eslint-env browser */
/* global main */

main.pointer = function () {
  "use strict";

  var that = {};
  
  function initHoverEffect(stuff){
    stuff.inputEnabled = true;
    stuff.events.onInputOver.add(over, this);
    stuff.events.onInputOut.add(out, this);
  }
  
  function over(object, pointer) {
    object.alpha = 0.5;
  }

  function out(object, pointer) {
    object.alpha = 1;
  }
  
  that.initHoverEffect = initHoverEffect;

  return that;
}
