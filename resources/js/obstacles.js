/* eslint-env browser */
/* global main */

main.obstacles = function (game) {
  "use strict";

  var that = {},
    platforms,
    elevator,
    elevatorClosed = true;

  function initObstacles() {
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(153, game.world.height - 5, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2.537, 0.5);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    // The elevator
    elevator = game.add.sprite(200, game.world.height - 65, 'elevator');
  }

  function createObsacles() {
    var wall;

    // building walls

    // left
    wall = platforms.create(155, 0, 'wall')
    wall.scale.setTo(0.1, 3);
    wall.body.immovable = true;
    // right
    wall = platforms.create(1160, 0, 'wall')
    wall.scale.setTo(0.1, 3);
    wall.body.immovable = true;
  }

  function setElevatorAnimation() {
    elevator.animations.add('open', [0, 1, 2, 3, 5, 6, 7, 8, 9], 10, false);
    elevator.animations.add('close', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10, false);
  }

  function closeElevator() {
    elevator.animations.play('close');
  }

  function openElevator() {
    elevator.animations.play('open');
  }

  function updateObs() {
    // won't work in future
    if (elevatorClosed) {
      elevator.frame = 0;
    } else {
      elevator.frame = 9;
    }
  }

  function getPlatforms() {
    return platforms;
  }

  that.openElevator = openElevator;
  that.closeElevator = closeElevator;
  that.initObstacles = initObstacles;
  that.setElevatorAnimation = setElevatorAnimation;
  that.createObsacles = createObsacles;
  that.updateObs = updateObs;
  that.getPlatforms = getPlatforms;

  return that;
}