/* eslint-env browser */
/* global main */
/* global Phaser */
/* global EventPublisher */

main.interactions = function(game) {
  "use strict";

  var that = new EventPublisher(),
    w, s, a, d, e, spacebar;

  function update(player, item, platforms) {
    var hitPlatform,
      itemIsInRange;

    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    hitPlatform = game.physics.arcade.collide(player, platforms);
    itemIsInRange = game.physics.arcade.overlap(player, item);

    handlePlayerJump(player, spacebar, hitPlatform);
    handleControlls(player, w, s, a, d);
    handleItemPickup(e, itemIsInRange);
  }

  function initControls() {
    w = game.input.keyboard.addKey(Phaser.Keyboard.W);
    s = game.input.keyboard.addKey(Phaser.Keyboard.S);
    a = game.input.keyboard.addKey(Phaser.Keyboard.A);
    d = game.input.keyboard.addKey(Phaser.Keyboard.D);
    e = game.input.keyboard.addKey(Phaser.Keyboard.E);

    w.onDown.add(function() {
      that.notifyAll("togglesInventory")
    }, this);
  }

  function handleControlls(player, w, s, a, d) {
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    // Player movement
    if (a.isDown) {
      //  Move to the left
      player.body.velocity.x = -100;
      player.animations.play('left');
    } else if (d.isDown) {
      //  Move to the right
      player.body.velocity.x = 100;
      player.animations.play('right');
    } else {
      //  Stand still
      player.animations.stop();
      player.frame = 9;
    }
  }

  function handlePlayerJump(player, spacebar, hitPlatform) {
    //  Allow the player to jump if they are touching the ground.
    if (spacebar.isDown && player.body.touching.down && hitPlatform) {
      player.body.velocity.y = -100;
    }
  }

  function handleItemPickup(e, itemIsInRange) {
    if (itemIsInRange && e.isDown) {
      that.notifyAll("picksUpItem");
    }
  }

  that.initControls = initControls;
  that.update = update;
  return that;
}