/* eslint-env browser */
/* global main */

main.npcs = function (game) {
  "use strict";

  var that = {},
    npcFloorOne;

  function initNpcs() {
    // The Npc and its settings
    npcFloorOne = game.add.sprite(900, game.world.height - 150, 'npc-floor-one');
  }

  function setNpcPhysics() {
    //  Player physics properties. Give the little guy a slight bounce.
    npcFloorOne.body.bounce.y = 0.2;
    npcFloorOne.body.gravity.y = 300;
    npcFloorOne.body.collideWorldBounds = true;
  }

  function setWalkingAnimations() {
    //  Our two animations, walking left and right.
    npcFloorOne.animations.add('left', [4, 1, 2, 3], 10, true);
    npcFloorOne.animations.add('right', [5, 6, 7, 8], 10, true);
  }

  function enableNpcPhysics() {
    //  We need to enable physics on the player
    game.physics.arcade.enable(npcFloorOne);
  }

  function updateNpc(platforms) {
    //  Collide the player and the stars with the platforms
    var hitPlatform,
      spacebar;

    hitPlatform = game.physics.arcade.collide(npcFloorOne, platforms);
    handleNpcCollision(spacebar, hitPlatform);
  }

  function initNpcMovement() {
    var randomNum;

    randomNum = game.rnd.integerInRange(1, 3);
    if (randomNum == 1) {
      npcFloorOne.body.velocity.x = 20;
      npcFloorOne.animations.play('right', 8, true);
    } else if (randomNum == 2) {
      npcFloorOne.body.velocity.x = -20;
      npcFloorOne.animations.play('left', 8, true);
    } else {
      npcFloorOne.body.velocity.x = 0;
      npcFloorOne.frame = 9;
      npcFloorOne.animations.stop('left', 8, true);
      npcFloorOne.animations.stop('right', 8, true);
    }
  }
  
  // doesn't work
  function handleNpcCollision(hitPlatform) {
    if (npcFloorOne.body.touching.down && hitPlatform) {
      npcFloorOne.body.velocity.x = 0;
      npcFloorOne.frame = 9;
      npcFloorOne.animations.stop('left', 8, true);
      npcFloorOne.animations.stop('right', 8, true);
    }
  }

  function getNpc() {
    return npcFloorOne;
  }

  that.initNpcs = initNpcs;
  that.initNpcMovement = initNpcMovement;
  that.getNpc = getNpc;
  that.setWalkingAnimations = setWalkingAnimations;
  that.setNpcPhysics = setNpcPhysics;
  that.enableNpcPhysics = enableNpcPhysics;
  that.updateNpc = updateNpc;

  return that;
}
