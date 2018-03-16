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
    text,
    pointer,
    items,
    interactions;

  function preload() {
    init();
    initEvents();
    textures.preloadTextures();
    text.preloadText();
    interactions.initControls();
  }

  function create() {
    // Draw building and background
    textures.loadTextures();

    // Inititates collision objects like platforms and other obstacles
    obstacles.initObstacles();
    obstacles.setElevatorAnimation();

    // Creates platforms and other obstacles
    obstacles.createObsacles();
    
    // Creates Inventory and Items
    items.createInventory();
    
    // Level 1 Items
    items.createItems();
    
    // Level 1 Npcs and its settings
    npcs.initNpcs();
    npcs.setNpcPhysics();
    npcs.setWalkingAnimations();
    
    // The player and its settings
    player.initPlayer();
    player.setPlayerPhysics();
    player.setWalkingAnimations();
    
    // Creates pointing device effects
    pointer.initHoverEffect(player.getPlayer());
    pointer.initHoverEffect(items.getCoffeeMugItem());
    pointer.initHoverEffect(npcs.getBasicNpcs());
    pointer.initHoverEffect(npcs.getBossNpc());
    pointer.initHoverEffect(npcs.getJanitor());

    // Random npc movement
    game.time.events.repeat(Phaser.Timer.SECOND * 3, 10, npcs.initNpcMovement, game);
  }

  function update() {
    centerGame();

    interactions.update(player.getPlayer(), items.getCoffeeMugItem(), obstacles.getPlatforms());
    npcs.updateNpc(obstacles.getPlatforms());
    obstacles.updateObs();
    text.updateText();
  }

  function init() {
    player = new main.player(game);
    npcs = new main.npcs(game);
    obstacles = new main.obstacles(game);
    textures = new main.textures(game);
    text = new main.text(game);
    pointer = new main.pointer(game);
    items = new main.items(game);
    interactions = new main.interactions(game);
  }

  // Events
  function onPickUpItem() {
    items.pickUpItem();
    text.textWhenPickup();
  }

  function onToggleInventory() {
    items.toggleInventory();
    text.textWhenToggle();
  }

  function initEvents() {
    interactions.addEventListener("picksUpItem", onPickUpItem);
    interactions.addEventListener("togglesInventory", onToggleInventory);
  }

  function centerGame() {
    // Centers the game canvas to the middle of the screen
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();
  }

  return that;
}());
