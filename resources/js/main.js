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
    var menuButton = game.add.button(game.world.width / 2, 30, 'menubutton', toggleMenu);
    menuButton.anchor.set(0.5);
    menuGroup.add(menuButton);
    var itemSlotOne = game.add.button(game.world.width / 2 - 400, -50, "item-slot-empty", function () {});
    itemSlotOne.anchor.set(0.5);
    menuGroup.add(itemSlotOne);
    var itemSlotTwo = game.add.button(game.world.width / 2 - 200, -50, "item-slot-empty", function () {});
    itemSlotTwo.anchor.set(0.5);
    menuGroup.add(itemSlotTwo);
    var itemSlotThree = game.add.button(game.world.width / 2, -50, "item-slot-empty", function () {});
    itemSlotThree.anchor.set(0.5);
    menuGroup.add(itemSlotThree);
    var itemSlotFour = game.add.button(game.world.width / 2 + 200, -50, "item-slot-empty", function () {});
    itemSlotFour.anchor.set(0.5);
    menuGroup.add(itemSlotFour);
    var itemSlotFive = game.add.button(game.world.width / 2 + 400, -50, "item-slot-empty", function () {});
    itemSlotFive.anchor.set(0.5);
    menuGroup.add(itemSlotFive);
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
  
  // menu from http://codepen.io/cardex107/pen/VaPRXo
  function toggleMenu() {
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
