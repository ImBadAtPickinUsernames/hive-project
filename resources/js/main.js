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
    setupGame();
    textures.preloadTextures();
  }

  function create() {
    textures.loadTextures();

    // inititates collision objects like platforms and other obstacles
    obstacles.initPlatforms();
    obstacles.initGround();

    // creates platforms and other obstacles
    obstacles.createPlatforms();

    // The player and its settings
    player.initPlayer();
    player.enablePlayerPhysics();
    player.setPlayerPhysics();
    player.setWalkingAnimations();
    player.createInventory();

    // The Npcs and its settings
    npcs.initNpcs();
    npcs.enableNpcPhysics();
    npcs.setNpcPhysics();
    npcs.setWalkingAnimations();

    // random npc movement
    game.time.events.repeat(Phaser.Timer.SECOND * 3, 10, npcs.initNpcMovement, game);
  }

  function update() {
    player.updatePlayer(obstacles.getPlatforms());
    npcs.updateNpc(obstacles.getPlatforms());
  }

  function init() {
    player = new main.player(game);
    npcs = new main.npcs(game);
    obstacles = new main.obstacles(game);
    textures = new main.textures(game);
  }

  function setupGame() {
    // aligns the game canvas to the middle of the screen
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();
  }

  that.init = init;

  return that;
}());
