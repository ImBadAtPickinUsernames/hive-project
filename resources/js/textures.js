/* eslint-env browser */
/* global main */

main.textures = function (game) {
  "use strict";

  var that = {};

  function preloadTextures() {
    // World basics
    game.load.image('background', 'resources/assets/backgrounds/skyscraper-background.png');
    game.load.image('building', 'resources/assets/backgrounds/building.png');
    game.load.image('ground', 'resources/assets/obstacles/platform.png');
    game.load.image('wall', 'resources/assets/obstacles/wall.png');
    // Special world elements
    game.load.spritesheet('elevator', 'resources/assets/backgrounds/elevator-sprite.png', 50, 60);
    // Inventory
    game.load.image('empty-slot', 'resources/assets/items/empty-slot.png');
    game.load.image('inventory-button', 'resources/assets/items/inventory-button.png');
    game.load.image('inventory-case', 'resources/assets/items/inventory-case.png');
    game.load.image('coffee-mug-ingame', 'resources/assets/backgrounds/coffee-mug-ingame.png');
    game.load.image('coffee-mug', 'resources/assets/items/coffee-mug.png');
    game.load.image('coffee-mug-single', 'resources/assets/backgrounds/coffee-mug-ingame.png');
    // Chars
    game.load.spritesheet('main-char', 'resources/assets/chars/main-char.png', 22, 50);
    game.load.spritesheet('floor-one-boss', 'resources/assets/chars/npc-blue-tie/floor-one-boss.png', 22, 50);
    game.load.spritesheet('npc-floor-one-basic', 'resources/assets/chars/npc-blue-tie/white-black-hair-npc-basic.png', 22, 50);
  }

  function loadTextures() {
    // A city skyline background
    game.add.image(0, 0, 'background');
    // the Hive building
    game.add.image(150, -game.world.height + 300, 'building');
  }

  that.loadTextures = loadTextures;
  that.preloadTextures = preloadTextures;
  return that;
}
