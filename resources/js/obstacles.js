/* eslint-env browser */
/* global main */
/* global Phaser */

main.obstacles = function (game) {
  "use strict";

  var that = {},
    platforms,
    elevator,
    elevatorClosed = true;

  function initPlatforms() {
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
  }

  function initGround() {
    // Here we create the ground.
    var ground = platforms.create(164, game.world.height - 5, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2.428, 0.5);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
  }

  function initElevator() {
    // The player and its settings
    elevator = game.add.sprite(200, game.world.height - 65, 'elevator');
  }

  function createPlatforms() {
    var floor,
      wall;

    // 3rd floor
    floor = platforms.create(164, 100, 'ground');
    floor.scale.setTo(2.428, 0.5);
    floor.body.immovable = true;
    // 2nd floor
    floor = platforms.create(164, 300, 'ground');
    floor.scale.setTo(2.428, 0.5);
    floor.body.immovable = true;
    // 1st floor
    floor = platforms.create(164, 500, 'ground');
    floor.scale.setTo(2.428, 0.5);
    floor.body.immovable = true;

    // building walls

    // left
    wall = platforms.create(150, 0, 'wall')
    wall.scale.setTo(0.5, 3);
    wall.body.immovable = true;
    // right
    wall = platforms.create(1130, 0, 'wall')
    wall.scale.setTo(0.5, 3);
    wall.body.immovable = true;
  }

  function setElevatorAnimation() {
    elevator.animations.add('open', [0, 1, 2, 3, 5, 6, 7, 8, 9], 15, true);
    elevator.animations.add('close', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 15, true);
  }

  function closeElevator() {
    elevator.animations.play('close');
    elevatorClosed = true;

  }

  function openElevator() {
    elevator.animations.play('open');
    elevatorClosed = false;
  }

  function updateObs() {
    var e;

    e = game.input.keyboard.addKey(Phaser.Keyboard.E);

    handleControls(e);

    if (e.isDown && elevatorClosed === true) {
      openElevator();
    } else if (e.isDown && elevatorClosed === false) {
      closeElevator();
    } else {
      if (elevatorClosed === true) {
        elevator.frame = 0;
      } else if (elevatorClosed === false) {
        elevator.frame = 9;
      }
    }
  }

  function handleControls(e) {
    if (e.isDown && elevator.frame === 0) {
      openElevator();
    }

    if (e.isDown && elevator.frame === 9) {
      closeElevator();
    }
  }

  function getPlatforms() {
    return platforms;
  }

  that.initPlatforms = initPlatforms;
  that.initGround = initGround;
  that.initElevator = initElevator;
  that.setElevatorAnimation = setElevatorAnimation;
  that.createPlatforms = createPlatforms;
  that.updateObs = updateObs;
  that.getPlatforms = getPlatforms;

  return that;
}
