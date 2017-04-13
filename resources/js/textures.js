/* eslint-env browser */
/* global main */

main.textures = function (game) {
  "use strict";

  var that = {};

  function preloadTextures() {
    game.load.image('workplace', 'resources/assets/backgrounds/background.png');
    game.load.image('ground', 'resources/assets/obstacles/platform.png');
    game.load.spritesheet('char-sprite', 'resources/assets/chars/char-sprite-new50.png', 22, 50);
  }

  function loadTextures() {
    //  A simple background for our game
    game.add.sprite(0, 0, 'workplace');
  }

  that.loadTextures = loadTextures;
  that.preloadTextures = preloadTextures;
  return that;
}
