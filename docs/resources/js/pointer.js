/* eslint-env browser */
/* global main */
/* global Phaser */

main.pointer = function (game) {
    "use strict";

    var that = {},
        descriptionText,
        textBox,
        canClick = true;

    function initHoverEffect(stuff) {
        stuff.inputEnabled = true;
        stuff.events.onInputOver.add(over, this);
        stuff.events.onInputOut.add(out, this);
        stuff.events.onInputDown.add(function () {
            if (canClick === true) {
                textBox = game.add.image(game.world.width / 2, 0, 'text-box');
                textBox.anchor.x = 0.5;
                descriptionText = game.add.text(game.world.width / 2, 20, "This is " + stuff.key + ".");
                descriptionText.font = 'Share Tech Mono';
                // descriptionText.fontWeight = "bold";
                descriptionText.fill = "#000000";
                descriptionText.anchor.x = 0.5;
                game.time.events.add(Phaser.Timer.SECOND * 2, destroyText, this);
                canClick = false;
            }
        }, this);
    }

    function destroyText() {
        descriptionText.destroy();
        textBox.destroy();
        canClick = true;
    }

    function over(object, pointer) {
        object.alpha = 0.6;
    }

    function out(object, pointer) {
        object.alpha = 1;
    }

    that.initHoverEffect = initHoverEffect;

    return that;
};
