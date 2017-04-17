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
    npcs,
    menuGroup;

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

    // The Npcs and its settings
    npcs.initNpcs();
    npcs.enableNpcPhysics();
    npcs.setNpcPhysics();
    npcs.setWalkingAnimations();

    // random npc movement
    game.time.events.repeat(Phaser.Timer.SECOND * 3, 10, npcs.initNpcMovement, game);

    // menu
    menuGroup = game.add.group();
    var inventoryButton = game.add.button(game.world.width / 2, 30, 'inventory-button', toggleInventory);
    inventoryButton.anchor.set(0.5);
    menuGroup.add(inventoryButton);

    var itemSlotOne = game.add.button(game.world.width / 2 - 400, -80, "item-slot-empty", function () {
      console.log("Item Slot 1 has been clicked!");
    });
    itemSlotOne.anchor.set(0.5);
    menuGroup.add(itemSlotOne);

    var itemSlotTwo = game.add.button(game.world.width / 2 - 200, -80, "item-slot-empty", function () {
      console.log("Item Slot 2 has been clicked!");
    });
    itemSlotTwo.anchor.set(0.5);
    menuGroup.add(itemSlotTwo);

    var itemSlotThree = game.add.button(game.world.width / 2, -80, "item-slot-empty", function () {
      console.log("Item Slot 3 has been clicked!");
    });
    itemSlotThree.anchor.set(0.5);
    menuGroup.add(itemSlotThree);

    var itemSlotFour = game.add.button(game.world.width / 2 + 200, -80, "item-slot-empty", function () {
      console.log("Item Slot 4 has been clicked!");
    });
    itemSlotFour.anchor.set(0.5);
    menuGroup.add(itemSlotFour);

    var itemSlotFive = game.add.button(game.world.width / 2 + 400, -80, "item-slot-empty", function () {
      console.log("Item Slot 5 has been clicked!");
    });
    itemSlotFive.anchor.set(0.5);
    menuGroup.add(itemSlotFive);

    game.input.mouse.mouseWheelCallback = mouseWheel;
  }

  function update() {
    player.updatePlayer(obstacles.getPlatforms());
    npcs.updateNpc(obstacles.getPlatforms());
  }

  function mouseWheel(event) {
    console.log(game.input.mouse.wheelDelta);
    if (game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_DOWN) {
      toggleInventory();
    }
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

  // menu from http://codepen.io/cardex107/pen/VaPRXo
  function toggleInventory() {
    if (menuGroup.y == 0) {
      var menuTween = game.add.tween(menuGroup).to({
        y: 130
      }, 500, Phaser.Easing.Bounce.Out, true);
    }
    if (menuGroup.y == 130) {
      menuTween = game.add.tween(menuGroup).to({
        y: 0
      }, 500, Phaser.Easing.Bounce.Out, true);
    }
  }

  that.init = init;

  return that;
}());
