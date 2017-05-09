/* eslint-env browser */
/* global main */

main.npcs = function (game) {
  "use strict";

  var that = {},
    npcFloorOneBoss,
    npc,
    janitor,
    basicNpcs;

  function initNpcs() {
    // The Npc and its settings
    npcFloorOneBoss = game.add.sprite(900, game.world.height - 150, 'Joel, my boss..');
    basicNpcs = game.add.group();
    npc = basicNpcs.create(500, game.world.height - 150, 'Steve, a Co-Worker');
    janitor = basicNpcs.create(310, game.world.height - 150, 'the janitor');
  }

  function setNpcPhysics() {
    //  We need to enable physics on the npcs
    game.physics.arcade.enable(npcFloorOneBoss);
    game.physics.arcade.enable(npc);
    game.physics.arcade.enable(janitor);

    npcFloorOneBoss.body.bounce.y = 0.2;
    npcFloorOneBoss.body.gravity.y = 300;
    npcFloorOneBoss.body.collideWorldBounds = true;
    npcFloorOneBoss.inputEnabled = true;

    npc.body.bounce.y = 0.2;
    npc.body.gravity.y = 300;
    npc.body.collideWorldBounds = true;
    npc.inputEnabled = true;
    
    janitor.body.bounce.y = 0.2;
    janitor.body.gravity.y = 300;
    janitor.body.collideWorldBounds = true;
    janitor.inputEnabled = true;
  }

  function setWalkingAnimations() {
    //  Our two animations, walking left and right.
    npcFloorOneBoss.animations.add('left', [4, 1, 2, 3], 10, true);
    npcFloorOneBoss.animations.add('right', [5, 6, 7, 8], 10, true);

    npc.animations.add('left', [4, 1, 2, 3], 10, true);
    npc.animations.add('right', [5, 6, 7, 8], 10, true);
  }

  function updateNpc(platforms) {
    //  Collision between npcs and plattforms
    var hitPlatformBoss,
      hitPlatformNpc,
      hitPlatformJanitor;

    hitPlatformBoss = game.physics.arcade.collide(npcFloorOneBoss, platforms);
    hitPlatformNpc = game.physics.arcade.collide(npc, platforms);
    hitPlatformJanitor = game.physics.arcade.collide(janitor, platforms);

    handleNpcCollision(hitPlatformBoss, npcFloorOneBoss);
    handleNpcCollision(hitPlatformNpc, npc);
    handleNpcCollision(hitPlatformJanitor, npc);
  }

  function initNpcMovement() {
    var randomNum;

    randomNum = game.rnd.integerInRange(1, 3);
    if (randomNum == 1) {
      // walking right
      npc.body.velocity.x = 20; // walking speed
      npc.animations.play('right', 8, true); // walking animation -> 8 fps
      // standing still
      npcFloorOneBoss.body.velocity.x = 0;
      npcFloorOneBoss.frame = 9;
      npcFloorOneBoss.animations.stop('left', 8, true);
      npcFloorOneBoss.animations.stop('right', 8, true);
    } else if (randomNum == 2) {
      // walking left
      npc.body.velocity.x = -20;
      npc.animations.play('left', 8, true);
      // walking right
      npcFloorOneBoss.body.velocity.x = 20;
      npcFloorOneBoss.animations.play('right', 8, true);
    } else {
      // standing still
      npc.body.velocity.x = 0;
      npc.frame = 9;
      npc.animations.stop('left', 8, true);
      npc.animations.stop('right', 8, true);
      // walking left
      npcFloorOneBoss.body.velocity.x = -20;
      npcFloorOneBoss.animations.play('left', 8, true);
    }
  }

  function handleNpcCollision(hitPlatform, tempNpc) {
    // case npc walks against a wall
    if (tempNpc.body.touching.down && hitPlatform && tempNpc.body.touching.right) {
      tempNpc.animations.stop('right', 8, true);
      tempNpc.body.velocity.x = -20;
      tempNpc.animations.play('left', 8, true);
    } else if (tempNpc.body.touching.down && hitPlatform && tempNpc.body.touching.left) {
      tempNpc.animations.stop('left', 8, true);
      tempNpc.body.velocity.x = 20;
      tempNpc.animations.play('right', 8, true);
    }
  }
  
  function getBasicNpcs(){
    return npc;
  }
  
  function getBossNpc(){
    return npcFloorOneBoss;
  }
  
  function getJanitor(){
    return janitor;
  }

  that.initNpcs = initNpcs;
  that.getJanitor = getJanitor;
  that.getBasicNpcs = getBasicNpcs;
  that.getBossNpc = getBossNpc;
  that.initNpcMovement = initNpcMovement;
  that.setWalkingAnimations = setWalkingAnimations;
  that.setNpcPhysics = setNpcPhysics;
  that.updateNpc = updateNpc;

  return that;
}
