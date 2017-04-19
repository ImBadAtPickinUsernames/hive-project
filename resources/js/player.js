/* eslint-env browser */
/* global main */
/* global Phaser */

main.player = function (game) {
  "use strict";

  var that = {},
    player,
    items,
    coffeeMug,
    coffeeMugItem,
    itemIsInRange,
    inventoryGroup,
    slotOneFilled = false,
    slotTwoFilled = false,
    slotThreeFilled = false,
    slotFourFilled = false,
    slotFiveFilled = false;

  function initPlayer() {
    // The player and its settings
    player = game.add.sprite(200, game.world.height - 150, 'main-char');
  }
  
  function initItems(){
    items = game.add.group();
    items.enableBody = true;
    
    coffeeMugItem = items.create(500, game.world.height - 100, 'coffee-mug');
    coffeeMugItem.body.immovable = true;
  }

  function setPlayerPhysics() {
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

  function enablePlayerPhysics() {
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
  }

  function createInventory() {
    // inventory
    var inventoryButton,
      inventoryBackground,
      itemSlotOne,
      itemSlotTwo,
      itemSlotThree,
      itemSlotFour,
      itemSlotFive;

    inventoryGroup = game.add.group();

    // ToggleInventory Button
    inventoryButton = game.add.button(game.world.width / 2, 30, 'inventory-button', toggleInventory);
    inventoryButton.anchor.set(0.5);
    inventoryGroup.add(inventoryButton);

    // Inventory background
    inventoryBackground = game.add.image(648, -70, 'inventory-case');

    inventoryBackground.anchor.set(0.5);
    inventoryGroup.add(inventoryBackground);

    // 1st item slot
    itemSlotOne = game.add.button(game.world.width / 2 - 400, -70, 'empty-slot', function () {
      console.log("Item Slot 1 has been clicked!");
    });

    itemSlotOne.anchor.set(0.5);
    inventoryGroup.add(itemSlotOne);

    // 2nd item slot
    itemSlotTwo = game.add.button(game.world.width / 2 - 200, -70, 'empty-slot', function () {
      console.log("Item Slot 2 has been clicked!");
    });

    itemSlotTwo.anchor.set(0.5);
    inventoryGroup.add(itemSlotTwo);

    // 3rd item slot
    itemSlotThree = game.add.button(game.world.width / 2, -70, 'empty-slot', function () {
      console.log("Item Slot 3 has been clicked!");
    });

    itemSlotThree.anchor.set(0.5);
    inventoryGroup.add(itemSlotThree);

    // 4th item slot
    itemSlotFour = game.add.button(game.world.width / 2 + 200, -70, 'empty-slot', function () {
      console.log("Item Slot 4 has been clicked!");
    });

    itemSlotFour.anchor.set(0.5);
    inventoryGroup.add(itemSlotFour);

    // 5th item slot
    itemSlotFive = game.add.button(game.world.width / 2 + 400, -70, 'empty-slot', function () {
      console.log("Item Slot 5 has been clicked!");
    });

    itemSlotFive.anchor.set(0.5);
    inventoryGroup.add(itemSlotFive);
  }

  function updatePlayer(platforms) {
    var hitPlatform,
      w, s, a, d, e, spacebar;

    hitPlatform = game.physics.arcade.collide(player, platforms);
    itemIsInRange = game.physics.arcade.collide(player, items);

    w = game.input.keyboard.addKey(Phaser.Keyboard.W);
    s = game.input.keyboard.addKey(Phaser.Keyboard.S);
    a = game.input.keyboard.addKey(Phaser.Keyboard.A);
    d = game.input.keyboard.addKey(Phaser.Keyboard.D);
    e = game.input.keyboard.addKey(Phaser.Keyboard.E);
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    handleControls(w, s, a, d, e);
    handlePlayerJump(spacebar, hitPlatform);
    handleItemPickup(e, itemIsInRange);
  }
  
  function handleItemPickup(e, itemIsInRange){
    if(itemIsInRange && e.isDown){
      pickUpItem();
    } 
  }

  function pickUpItem() {
    if (slotOneFilled === false && itemIsInRange) {
      coffeeMug = game.add.image(game.world.width / 2 - 400, -70, 'coffee-mug');
      coffeeMug.anchor.set(0.5);
      inventoryGroup.add(coffeeMug);
      coffeeMugItem.destroy();
      slotOneFilled === true;
    } else if (slotOneFilled === true && slotTwoFilled === false) {
      slotTwoFilled === true;
    } else if (slotTwoFilled === true && slotThreeFilled === false) {
      slotThreeFilled === true;
    } else if (slotThreeFilled === true && slotFourFilled === false) {
      slotFourFilled === true;
    } else if (slotFourFilled === true && slotFiveFilled === false) {
      slotFiveFilled === true;
    }
  }

  function handleControls(w, s, a, d, e) {
    // Inventory
    if (w.isDown) {
      toggleInventory();
    }
    
    if (e.isDown){
      pickUpItem();
    }

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

  function handlePlayerJump(spacebar, hitPlatform) {
    //  Allow the player to jump if they are touching the ground.
    if (spacebar.isDown && player.body.touching.down && hitPlatform) {
      player.body.velocity.y = -100;
    }
  }

  // inventory inspired by http://codepen.io/cardex107/pen/VaPRXo
  function toggleInventory() {
    if (inventoryGroup.y == 0) {
      var inventoryTween = game.add.tween(inventoryGroup).to({
        y: 130
      }, 500, Phaser.Easing.Bounce.Out, true);
    }
    if (inventoryGroup.y == 130) {
      inventoryTween = game.add.tween(inventoryGroup).to({
        y: 0
      }, 500, Phaser.Easing.Bounce.Out, true);
    }
  }

  function getPlayer() {
    return player;
  }

  that.initPlayer = initPlayer;
  that.initItems = initItems;
  that.getPlayer = getPlayer;
  that.setWalkingAnimations = setWalkingAnimations;
  that.setPlayerPhysics = setPlayerPhysics;
  that.enablePlayerPhysics = enablePlayerPhysics;
  that.updatePlayer = updatePlayer;
  that.createInventory = createInventory;

  return that;
}
