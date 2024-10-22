﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_brickUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
function convertToPercent(childSize, parentSize) {
    return childSize * 100 / parentSize + '%';
}
exports.convertToPercent = convertToPercent;
function getBrickValueForKey(brick, key) {
    if (key === void 0) { key = 'text'; }
    var brickTextProperty = brick.content && brick.content.filter(function (x) { return x.Key === key; })[0];
    return brickTextProperty && brickTextProperty.Value;
}
exports.getBrickValueForKey = getBrickValueForKey;
function brickText(brick, editingFieldsProvider) {
    var fields = editingFieldsProvider ? editingFieldsProvider() : [];
    if (brick.efIndex && brick.efIndex > 0 && brick.efIndex <= fields.length && fields[brick.efIndex - 1].type() === 'text') {
        return fields[brick.efIndex - 1].editValue();
    }
    else {
        return getBrickValueForKey(brick);
    }
}
exports.brickText = brickText;
function updateBricksPosition(brick, height, width) {
    if (!brick) {
        return;
    }
    brick[brick.rtl ? 'rightP' : 'leftP'] = convertToPercent(brick.left, width);
    brick.widthP = convertToPercent(brick.width, width);
    brick.topP = convertToPercent(brick.top, height);
    brick.heightP = convertToPercent(brick.height, height);
    brick.bricks && brick.bricks.forEach(function (childBrick) {
        updateBricksPosition(childBrick, height, width);
    });
}
exports.updateBricksPosition = updateBricksPosition;
function initializeBrick(brick, processClick, zoom, editingFieldBricks) {
    if (!brick) {
        return;
    }
    !!brick.active ? brick.active(false) : (brick.active = ko.observable(false));
    brick['onClick'] = function (e) { processClick && processClick(brick, e); };
    brick.bricks && brick.bricks.forEach(function (childBrick) {
        if (!childBrick)
            return;
        childBrick.top += brick.top;
        childBrick.left += brick.left;
        initializeBrick(childBrick, processClick, zoom, editingFieldBricks);
    });
    if (brick.efIndex > 0) {
        editingFieldBricks.push(brick);
    }
    brick.text = function () { return brickText(brick); };
    brick.accessibleDescription = getBrickValueForKey(brick, 'AccessibleDescription');
}
exports.initializeBrick = initializeBrick;
