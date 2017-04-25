/* eslint-env browser */
/* global main */
/* global Phaser */

main.text = function (game) {
  "use strict";

  var that = {},
    descText,
    WebFontConfig;

  //  The Google WebFont Loader will look for this object, so create it before loading the script.
  WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function () {
      game.time.events.add(Phaser.Timer.SECOND, initText(), this);
    },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Revalia']
    }

  };

  function initText() {
    descText = game.add.text(5, 5, "This is a placeholder for item decriptions");
    descText.font = 'Revalia';
    descText.fontSize = 20;
    descText.align = 'left';
    descText.stroke = '#000000';
    descText.strokeThickness = 1.5;
  }

  function preloadText() {
    //  Load the Google WebFont Loader script
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
  }

  function updateText() {

  }

  that.preloadText = preloadText;
  that.initText = initText;
  that.updateText = updateText;

  return that;
}
