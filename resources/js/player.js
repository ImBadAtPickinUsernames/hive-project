/* eslint-env browser */
/* global main */

main.player = function (game) {
  "use strict";

  var that = {},
    player;

  function initPlayer() {
    // The player and its settings
    player = game.add.sprite(200, game.world.height - 150, 'me');
  }

  function setPlayerPhysics() {
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
  }

  function setWalkingAnimations() {
    //  Our two animations, walking left and right.
    player.animations.add('left', [4, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
  }

  function getPlayer() {
    return player;
  }

  that.initPlayer = initPlayer;
  that.getPlayer = getPlayer;
  that.setWalkingAnimations = setWalkingAnimations;
  that.setPlayerPhysics = setPlayerPhysics;

  return that;
}