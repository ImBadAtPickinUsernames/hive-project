/* eslint-env browser */
/* global main */
/* global Phaser */

main.items = function (game) {
  "use strict";

  var that = {},
    items,
    coffeeMug,
    coffeeMugItem,
    inventoryGroup,
    slotOneFilled = false,
    slotTwoFilled = false,
    slotThreeFilled = false,
    slotFourFilled = false,
    slotFiveFilled = false;

  // Inventory

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
      //console.log("Item Slot 1 has been clicked!");
    });

    itemSlotOne.anchor.set(0.5);
    inventoryGroup.add(itemSlotOne);

    // 2nd item slot
    itemSlotTwo = game.add.button(game.world.width / 2 - 200, -70, 'empty-slot', function () {
      //console.log("Item Slot 2 has been clicked!");
    });

    itemSlotTwo.anchor.set(0.5);
    inventoryGroup.add(itemSlotTwo);

    // 3rd item slot
    itemSlotThree = game.add.button(game.world.width / 2, -70, 'empty-slot', function () {
      //console.log("Item Slot 3 has been clicked!");
    });

    itemSlotThree.anchor.set(0.5);
    inventoryGroup.add(itemSlotThree);

    // 4th item slot
    itemSlotFour = game.add.button(game.world.width / 2 + 200, -70, 'empty-slot', function () {
      //console.log("Item Slot 4 has been clicked!");
    });

    itemSlotFour.anchor.set(0.5);
    inventoryGroup.add(itemSlotFour);

    // 5th item slot
    itemSlotFive = game.add.button(game.world.width / 2 + 400, -70, 'empty-slot', function () {
      //console.log("Item Slot 5 has been clicked!");
    });

    itemSlotFive.anchor.set(0.5);
    inventoryGroup.add(itemSlotFive);
  }

  function createItems() {
    items = game.add.group();
    items.enableBody = true;

    coffeeMugItem = items.create(1013, game.world.height - 46, 'coffee-mug-single');
    coffeeMugItem.body.immovable = true;
    coffeeMugItem.enableBody = true;
  }

  // Inventory inspired by http://codepen.io/cardex107/pen/VaPRXo
  function toggleInventory() {
    if (inventoryGroup.y == 0) {
      game.add.tween(inventoryGroup).to({
        y: 130
      }, 500, Phaser.Easing.Bounce.Out, true);
    }
    if (inventoryGroup.y == 130) {
      game.add.tween(inventoryGroup).to({
        y: 0
      }, 500, Phaser.Easing.Bounce.Out, true);
    }
  }

  function createCoffeeInInv() {
    coffeeMug = game.add.image(game.world.width / 2 - 400, -70, 'coffee-mug');
    coffeeMug.anchor.set(0.5);
    coffeeMug.inputEnabled = true;
    coffeeMug.input.enableDrag();
    inventoryGroup.add(coffeeMug);
    // coffeeMug.events.onDragStart.add(onDragStart, this);
    coffeeMug.events.onDragStop.add(onDragStop, this);
  }

  function onDragStop() {
    coffeeMug.x = game.world.width / 2 - 400;
    coffeeMug.y = -70;
  }


  function pickUpItem() {
    if (slotOneFilled === false) {
      slotOneFilled = true;
      createCoffeeInInv();
      coffeeMugItem.destroy();
    } else if (slotOneFilled === true && slotTwoFilled === false) {
      slotTwoFilled = true;
    } else if (slotTwoFilled === true && slotThreeFilled === false) {
      slotThreeFilled = true;
    } else if (slotThreeFilled === true && slotFourFilled === false) {
      slotFourFilled = true;
    } else if (slotFourFilled === true && slotFiveFilled === false) {
      slotFiveFilled = true;
    }
  }

  // level 1
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
