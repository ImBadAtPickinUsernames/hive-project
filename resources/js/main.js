/* global Phaser */
/* eslint-env browser  */

var main = main || {};
main = (function () {
  "use strict";

  var that = {},
    game = new Phaser.Game(1280, 720, Phaser.AUTO, '', {
      preload: preload,
      create: create,
      update: update
    }),
    player,
    obstacles,
    textures,
    npcs;

  function preload() {
    init();
    textures.preloadTextures();
  }

  function create() {
    // draw building and background
    textures.loadTextures();

    // inititates collision objects like platforms and other obstacles
    obstacles.initObstacles();
    obstacles.setElevatorAnimation();

    // creates platforms and other obstacles
    obstacles.createObsacles();

    // The player and its settings
    player.initItems();
    player.initPlayer();
    player.setPlayerPhysics();
    player.setWalkingAnimations();
    player.createInventory();

    // The Npcs and its settings
    npcs.initNpcs();
    npcs.setNpcPhysics();
    npcs.setWalkingAnimations();

    // random npc movement
    game.time.events.repeat(Phaser.Timer.SECOND * 3, 10, npcs.initNpcMovement, game);
  }

  function update() {
    centerGame();

    player.updatePlayer(obstacles.getPlatforms());
    npcs.updateNpc(obstacles.getPlatforms());
    obstacles.updateObs();
  }

  function init() {
    player = new main.player(game);
    npcs = new main.npcs(game);
    obstacles = new main.obstacles(game);
    textures = new main.textures(game);
  }

  function centerGame() {
    // centers the game canvas to the middle of the screen
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();
  }

  that.init = init;

  return that;
}());
