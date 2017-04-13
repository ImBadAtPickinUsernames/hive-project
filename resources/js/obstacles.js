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
    var ground = platforms.create(164, game.world.height - 5, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2.428, 0.5);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
  }

  function createPlatforms() {
    //  Now let's create two ledges
    var ledge = platforms.create(164, 300, 'ground');
    
    ledge.scale.setTo(2.428, 0.5);
    
    ledge.body.immovable = true;

    ledge = platforms.create(164, 500, 'ground');
    
    ledge.scale.setTo(2.428, 0.5);
    
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
