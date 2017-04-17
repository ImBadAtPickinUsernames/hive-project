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
    game.load.spritesheet('main-char', 'resources/assets/chars/main-char.png', 22, 50);
    game.load.spritesheet('floor-one-boss', 'resources/assets/chars/npc-blue-tie/floor-one-boss.png', 22, 50);
    game.load.spritesheet('npc-floor-one-basic', 'resources/assets/chars/npc-blue-tie/white-black-hair-npc-basic.png', 22, 50);
  }

  function loadTextures() {
    // A city skyline background
    game.add.sprite(0, 0, 'background');
    // the Hive building
    game.add.sprite(150, 0, 'building');
  }

  that.loadTextures = loadTextures;
  that.preloadTextures = preloadTextures;
  return that;
}
