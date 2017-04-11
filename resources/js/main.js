/* global Phaser */
/* eslint-env browser  */

var main = main || {};
main = (function () {
  "use strict";

  /*  const ;*/

  var that = {},
    game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
      preload: preload,
      create: create,
      update: update
    }),
    player,
    platforms;

  function preload() {
    init();
    game.load.image('sky', 'resources/assets/sky.png');
    game.load.image('ground', 'resources/assets/platform.png');
    game.load.image('star', 'resources/assets/star.png');
    game.load.spritesheet('dude', 'resources/assets/dude.png', 32, 48);

  }

  function create() {
    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;

    // The player and its settings
    player.initPlayer();
    player.enablePlayerPhysics();
    player.setPlayerPhysics();
    player.setWalkingAnimations();
  }

  function update() {
    player.updatePlayer(platforms);
  }

  function init() {
    player = new main.player(game);
  }

  that.init = init;
  return that;
}());
