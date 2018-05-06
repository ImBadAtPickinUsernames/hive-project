/* eslint-env browser */
/* global main */

main.text = function ( /*game*/ ) {
    "use strict";

    var that = {},
        descText;

    function initText() {
        /*descText = game.add.text(5, 5, "This is a placeholder for item decriptions");
        descText.font = 'Revalia';
        descText.fontSize = 20;
        descText.align = 'left';
        descText.stroke = '#000000';
        descText.strokeThickness = 1.5;*/
    }

    function preloadText() {}

    function updateText() {}

    function textWhenToggle() {
        console.log("Opened inventory.");
    }

    function textWhenPickup() {
        console.log("Picked up coffee mug.");
    }

    function giveItemDescription() {
        descText.setText("Sample Descrition");
    }

    that.textWhenPickup = textWhenPickup;
    that.giveItemDescrition = giveItemDescription;
    that.preloadText = preloadText;
    that.initText = initText;
    that.updateText = updateText;
    that.textWhenToggle = textWhenToggle;

    return that;
};
