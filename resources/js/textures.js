/* eslint-env browser */
/* global main */

main.textures = function (game) {
  "use strict";

  var that = {};

  function preloadTextures() {
    // World basics
    game.load.image('background', 'resources/assets/backgrounds/skyscraper-background.png');
    game.load.image('building', 'resources/assets/backgrounds/buildingv2.png');
    game.load.image('ground', 'resources/assets/obstacles/platform.png');
    game.load.image('wall', 'resources/assets/obstacles/wall.png');
    // Special world elements
    game.load.spritesheet('elevator', 'resources/assets/backgrounds/elevator-sprite.png', 50, 60);
    game.load.image('text-box', 'resources/assets/items/text-box.png');
    game.load.image('the janitors wagon', 'resources/assets/items/janitor_wagon.png');
    // Inventory
    game.load.image('empty-slot', 'resources/assets/items/empty-slot.png');
    game.load.image('inventory-button', 'resources/assets/items/inventory-button.png');
    game.load.image('inventory-case', 'resources/assets/items/inventory-case.png');
    game.load.image('Joels coffee in my suitcase', 'resources/assets/items/coffee-mug.png');
    game.load.image('Joels coffee', 'resources/assets/backgrounds/coffee-mug-ingame.png');
    // Chars
    game.load.spritesheet('me', 'resources/assets/chars/main-char.png', 22, 50);
    game.load.spritesheet('Joel, my boss..', 'resources/assets/chars/npc-blue-tie/floor-one-boss.png', 22, 50);
    game.load.spritesheet('Steve, a co-worker', 'resources/assets/chars/npc-blue-tie/white-black-hair-npc-basic.png', 22, 50);
    game.load.image('the janitor', 'resources/assets/chars/janitor.png');
  }

  function loadTextures() {
    // A city skyline background
    game.add.image(0, 0, 'background');
    // the Hive building
    game.add.image(153, -game.world.height + 300, 'building');
  }

  that.loadTextures = loadTextures;
  that.preloadTextures = preloadTextures;
  return that;
}
