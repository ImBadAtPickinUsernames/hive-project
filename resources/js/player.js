/* eslint-env browser */
/* global main */

main.player = function (game) {
  "use strict";

  var that = {},
    player;

  function initPlayer() {
    // The player and its settings
    player = game.add.sprite(11, game.world.height - 150, 'char-sprite');
  }

  function setPlayerPhysics() {
    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
  }

  function setWalkingAnimations() {
    //  Our two animations, walking left and right.
    player.animations.add('left', [4, 3, 2, 1], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
  }

  function enablePlayerPhysics() {
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
  }

  function updatePlayer(platforms) {
    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms),
      cursors = game.input.keyboard.createCursorKeys();

    handlePlayerMovement(cursors);
    handlePlayerCollision(cursors, hitPlatform);
  }

  function handlePlayerMovement(cursors) {
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
      //  Move to the left
      player.body.velocity.x = -150;

      player.animations.play('left');
    } else if (cursors.right.isDown) {
      //  Move to the right
      player.body.velocity.x = 150;

      player.animations.play('right');
    } else {
      //  Stand still
      player.animations.stop();

      player.frame = 0;
    }
  }

  function handlePlayerCollision(cursors, hitPlatform) {
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
      player.body.velocity.y = -350;
    }
  }

  function getPlayer() {
    return player;
  }

  that.initPlayer = initPlayer;
  that.getPlayer = getPlayer;
  that.setWalkingAnimations = setWalkingAnimations;
  that.setPlayerPhysics = setPlayerPhysics;
  that.enablePlayerPhysics = enablePlayerPhysics;
  that.updatePlayer = updatePlayer;

  return that;
}
