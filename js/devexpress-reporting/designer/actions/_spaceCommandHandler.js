﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_spaceCommandHandler.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpaceCommandHandler = (function () {
    function SpaceCommandHandler(selectionProvider, surfaceContext) {
        this._selectionProvider = selectionProvider;
        this._surfaceContext = surfaceContext;
    }
    SpaceCommandHandler.prototype._comparer = function (propertyName) {
        return function (a, b) {
            return a.rect()[propertyName] - b.rect()[propertyName];
        };
    };
    SpaceCommandHandler.prototype._spaceIncrease = function (sign, isHoriz) {
        var sortedSelectedItems = this._selectionProvider.selectedItems.filter(function (item) { return !item.locked; }), axisProperty = isHoriz ? 'left' : 'top', lengthProperty = isHoriz ? 'width' : 'height', margin = isHoriz ? this._surfaceContext().margins.left() : 0, snapGridSize = this._surfaceContext().snapGridSize(), focusedParent = this._selectionProvider.focused().getControlModel().parentModel(), focusedItem = this._selectionProvider.focused();
        sortedSelectedItems.sort(this._comparer(axisProperty));
        var focusedItemIndex = sortedSelectedItems.indexOf(this._selectionProvider.focused());
        this._selectionProvider.selectedItems.filter(function (item) { return !item.locked; }).filter(function (item) { return item !== focusedItem && item.getControlModel().parentModel() === focusedParent; }).forEach(function (item) {
            var itemIndex = sortedSelectedItems.indexOf(item), spaceOffset = Math.abs(itemIndex - focusedItemIndex) * snapGridSize * sign, itemAxisProperty = item.rect()[axisProperty], itemLengthProperty = item.rect()[lengthProperty], parentLengthProperty = item.parent.rect()[lengthProperty] - margin, newValue;
            if (itemIndex < focusedItemIndex) {
                newValue = itemAxisProperty - spaceOffset;
                if (newValue < 0) {
                    newValue = 0;
                }
            }
            else {
                newValue = itemAxisProperty + spaceOffset;
                if ((newValue + itemLengthProperty) > parentLengthProperty) {
                    newValue = parentLengthProperty - itemLengthProperty;
                }
            }
            var val = {};
            val[axisProperty] = newValue;
            item.rect(val);
        });
    };
    SpaceCommandHandler.prototype._spaceMakeEqual = function (isHoriz) {
        this._concatenateWithSpace(isHoriz, function (sortedSelectedItems, axisProperty, lengthProperty) {
            var averageSpace = 0;
            for (var i = 0; i < sortedSelectedItems.length - 1; i++) {
                var currentValue = sortedSelectedItems[i + 1].rect()[axisProperty] - (sortedSelectedItems[i].rect()[axisProperty] + sortedSelectedItems[i].rect()[lengthProperty]);
                averageSpace = (averageSpace * i + currentValue) / (i + 1);
            }
            return averageSpace;
        });
    };
    SpaceCommandHandler.prototype._concatenateWithSpace = function (isHoriz, getSpaceSize) {
        var sortedSelectedItems = this._selectionProvider.selectedItems.filter(function (item) { return !item.locked; }), axisProperty = isHoriz ? 'left' : 'top', lengthProperty = isHoriz ? 'width' : 'height', spaceSize = 0, focusedParent = this._selectionProvider.focused().getControlModel().parentModel();
        sortedSelectedItems.sort(this._comparer(axisProperty));
        spaceSize = getSpaceSize(sortedSelectedItems, axisProperty, lengthProperty);
        this._selectionProvider.selectedItems.filter(function (item) { return !item.locked; }).filter(function (item) { return focusedParent === item.getControlModel().parentModel(); }).forEach(function (item) {
            var itemIndex = sortedSelectedItems.indexOf(item);
            if (itemIndex > 0) {
                var prevControl = sortedSelectedItems[itemIndex - 1], val = {};
                val[axisProperty] = prevControl.rect()[axisProperty] + prevControl.rect()[lengthProperty] + spaceSize;
                item.rect(val);
            }
        });
    };
    SpaceCommandHandler.prototype.horizSpaceConcatenate = function () {
        this._concatenateWithSpace(true, function () { return 0; });
    };
    SpaceCommandHandler.prototype.vertSpaceConcatenate = function () {
        this._concatenateWithSpace(false, function () { return 0; });
    };
    SpaceCommandHandler.prototype.horizSpaceMakeEqual = function () {
        this._spaceMakeEqual(true);
    };
    SpaceCommandHandler.prototype.vertSpaceMakeEqual = function () {
        this._spaceMakeEqual(false);
    };
    SpaceCommandHandler.prototype.horizSpaceDecrease = function () {
        this._spaceIncrease(-1, true);
    };
    SpaceCommandHandler.prototype.horizSpaceIncrease = function () {
        this._spaceIncrease(1, true);
    };
    SpaceCommandHandler.prototype.vertSpaceDecrease = function () {
        this._spaceIncrease(-1, false);
    };
    SpaceCommandHandler.prototype.vertSpaceIncrease = function () {
        this._spaceIncrease(1, false);
    };
    return SpaceCommandHandler;
}());
exports.SpaceCommandHandler = SpaceCommandHandler;
