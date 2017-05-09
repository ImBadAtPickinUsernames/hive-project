/* eslint-env browser */
/* global main */
/* global Phaser */

main.items = function (game) {
  "use strict";

  var that = {},
    items,
    coffeeMug,
    coffeeMugItem,
    janitorWagon,
    inventoryGroup,
    slotOneFilled = false,
    slotTwoFilled = false,
    slotThreeFilled = false;

  // Inventory
  function createInventory() {
    var inventoryButton,
      inventoryBackground,
      itemSlotOne,
      itemSlotTwo,
      itemSlotThree;

    inventoryGroup = game.add.group();

    // ToggleInventory Button
    inventoryButton = game.add.button(30, game.world.height / 2, 'inventory-button', toggleInventory);
    inventoryButton.anchor.set(0.5);
    inventoryGroup.add(inventoryButton);

    // Inventory background
    inventoryBackground = game.add.image(-130, 0, 'inventory-case');

    inventoryBackground.anchor.set(0);
    inventoryGroup.add(inventoryBackground);

    // 1st item slot
    itemSlotOne = game.add.button(-70, game.world.height / 2 - 150, 'empty-slot', function () {
      //console.log("Item Slot 1 has been clicked!");
    });

    itemSlotOne.anchor.set(0.5);
    inventoryGroup.add(itemSlotOne);

    // 2nd item slot
    itemSlotTwo = game.add.button(-70, game.world.height / 2, 'empty-slot', function () {
      //console.log("Item Slot 2 has been clicked!");
    });

    itemSlotTwo.anchor.set(0.5);
    inventoryGroup.add(itemSlotTwo);

    // 3rd item slot
    itemSlotThree = game.add.button(-70, game.world.height / 2 + 150, 'empty-slot', function () {
      //console.log("Item Slot 3 has been clicked!");
    });

    itemSlotThree.anchor.set(0.5);
    inventoryGroup.add(itemSlotThree);
  }

  function createItems() {
    items = game.add.group();
    items.enableBody = true;

    coffeeMugItem = items.create(1030, game.world.height - 39, 'Joels coffee');
    coffeeMugItem.body.immovable = true;
    coffeeMugItem.enableBody = true;
    
    janitorWagon = items.create(280, 698, 'the janitors wagon');
    janitorWagon.body.immovable = true;
    janitorWagon.enableBody = true;
  }

  // Inventory inspired by http://codepen.io/cardex107/pen/VaPRXo
  function toggleInventory() {
    if (inventoryGroup.x == 0) {
      game.add.tween(inventoryGroup).to({
        x: 130
      }, 500, Phaser.Easing.Bounce.Out, true);
    }
    if (inventoryGroup.x == 130) {
      game.add.tween(inventoryGroup).to({
        x: 0
      }, 500, Phaser.Easing.Bounce.Out, true);
    }
    // console.log("Inventory got toggled.");
  }

  function createCoffeeInInv() {
    coffeeMug = game.add.image(-70, game.world.height / 2 - 150, 'Joels coffee in my suitcase');
    coffeeMug.anchor.set(0.5);
    coffeeMug.inputEnabled = true;
    coffeeMug.input.enableDrag();
    inventoryGroup.add(coffeeMug);
    // coffeeMug.events.onDragStart.add(onDragStart, this);
    coffeeMug.events.onDragStop.add(onDragStop, this);
  }

  function onDragStop() {
    coffeeMug.x = -70;
    coffeeMug.y = game.world.height / 2 - 150;
  }

  function pickUpItem() {
    if (slotOneFilled === false) {
      slotOneFilled = true;
      createCoffeeInInv();
      coffeeMugItem.kill();
    } else if (slotOneFilled === true && slotTwoFilled === false) {
      slotTwoFilled = true;
    } else if (slotTwoFilled === true && slotThreeFilled === false) {
      slotThreeFilled = true;
    }
  }

  // Level 1
  function getCoffeeMugInv() {
    return coffeeMug;
  }

  function getCoffeeMugItem() {
    return coffeeMugItem;
  }

  that.createItems = createItems;
  that.createInventory = createInventory;
  that.getCoffeeMugItem = getCoffeeMugItem;
  that.getCoffeeMugInv = getCoffeeMugInv;
  that.pickUpItem = pickUpItem;
  that.toggleInventory = toggleInventory;

  return that;
}
