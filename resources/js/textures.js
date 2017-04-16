/* eslint-env browser */
/* global main */

main.textures = function (game) {
  "use strict";

  var that = {};

  function preloadTextures() {
    game.load.image('background', 'resources/assets/backgrounds/skyscraper-background.png');
    game.load.image('building', 'resources/assets/backgrounds/building.png');
    game.load.image('ground', 'resources/assets/obstacles/platform.png');
    game.load.image('wall', 'resources/assets/obstacles/wall.png');
    game.load.spritesheet('char-sprite', 'resources/assets/chars/char-sprite-new50.png', 22, 50);
    game.load.spritesheet('npc-floor-one', 'resources/assets/chars/npc-blue-tie/white-black-hair-npc.png', 22, 50);
  }

  function loadTextures() {
    //  A simple background for our game
    game.add.sprite(0, 0, 'background');
    game.add.sprite(150, 0, 'building');
  }

  that.loadTextures = loadTextures;
  that.preloadTextures = preloadTextures;
  return that;
}
