/* eslint-env browser */
/* global main */

main.textures = function (game) {
  "use strict";

  var that = {};

  function preloadTextures() {
    game.load.image('sky', 'resources/assets/backgrounds/sky.png');
    game.load.image('ground', 'resources/assets/obstacles/platform.png');
    game.load.spritesheet('char-sprite', 'resources/assets/chars/char-sprite.png', 11, 25);
  }

  function loadTextures() {
    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');
  }

  that.loadTextures = loadTextures;
  that.preloadTextures = preloadTextures;
  return that;
}
