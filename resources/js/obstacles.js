/* eslint-env browser */
/* global main */

main.obstacles = function (game) {
  "use strict";

  var that = {},
    platforms;

  function initPlatforms() {
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
  }

  function initGround() {
    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
  }

  function createPlatforms() {
    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;
  }

  function getPlatforms() {
    return platforms;
  }

  that.initPlatforms = initPlatforms;
  that.initGround = initGround;
  that.createPlatforms = createPlatforms;
  that.getPlatforms = getPlatforms;

  return that;
}
