/* global Phaser */
/* eslint-env browser  */

var main = main || {};
main = (function () {
  "use strict";

  /*  const ;*/

  var that = {},
    game = new Phaser.Game(1280, 720, Phaser.AUTO, '', {
      preload: preload,
      create: create,
      update: update
    }),
    player,
    obstacles,
    textures;

  function preload() {
    init();
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
  }

  function update() {
    // player update -> dependent on collision objects
    player.updatePlayer(obstacles.getPlatforms());
  }

  function init() {
    player = new main.player(game);
    obstacles = new main.obstacles(game);
    textures = new main.textures(game);
  }

  that.init = init;
  return that;
}());
