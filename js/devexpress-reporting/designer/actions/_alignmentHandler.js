﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_alignmentHandler.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var $ = require("jquery");
var AlignmentHandler = (function () {
    function AlignmentHandler(selectionProvider, surfaceContext) {
        this._selectionProvider = selectionProvider;
        this._surfaceContext = surfaceContext;
    }
    AlignmentHandler.prototype._getFocusedItem = function () { return this._selectionProvider.focused(); };
    AlignmentHandler.prototype._getFocusedParent = function () { return this._selectionProvider.focused().parent; };
    AlignmentHandler.prototype._getPositionFromBand = function (surface) {
        var rect = $.extend({}, surface.rect());
        var parent = surface.parent;
        if (!(surface instanceof xrBand_1.BandSurface)) {
            while (!(parent instanceof xrBand_1.BandSurface)) {
                rect.left += parent.rect().left;
                rect.top += parent.rect().top;
                parent = parent.parent;
            }
            rect.bottom = rect.top + rect.height;
            rect.right = rect.left + rect.width;
        }
        else {
            parent = surface;
        }
        rect.band = parent;
        return rect;
    };
    AlignmentHandler.prototype._visitAllSelectedItemsInSameContainerWithFocused = function (iterator) {
        var focused = this._selectionProvider.focused();
        var rect = this._getPositionFromBand(focused);
        this._selectionProvider.selectedItems.filter(function (item) { return !item.locked; }).filter(function (item) {
            return item !== focused;
        }).forEach(function (item) {
            iterator(item, rect);
        });
    };
    AlignmentHandler.prototype._centerByBand = function (isHoriz, margins, rtl) {
        if (rtl === void 0) { rtl = false; }
        var items = this._selectionProvider.selectedItems.filter(function (x) { return !x.locked; });
        if (!items.length)
            return;
        var axisProperty = isHoriz ? 'left' : 'top', lengthProperty = isHoriz ? 'width' : 'height', focusedParent = items[0].parent, bandOffset = focusedParent instanceof xrBand_1.BandSurface ? margins.right() : 0, parentLengthProperty = focusedParent.rect()[lengthProperty] - bandOffset, minAxis = items[0].rect()[axisProperty], maxSide = items[0].rect()[axisProperty] + items[0].rect()[lengthProperty], newOffset;
        items.forEach(function (item) {
            var axis = item.rect()[axisProperty];
            var side = item.rect()[axisProperty] + item.rect()[lengthProperty];
            if (axis < minAxis) {
                minAxis = axis;
            }
            if (side > maxSide) {
                maxSide = side;
            }
        });
        newOffset = (parentLengthProperty - (maxSide - minAxis)) / 2 - minAxis + (rtl ? bandOffset : 0);
        items.forEach(function (item) {
            var newVal = {};
            newVal[axisProperty] = item.rect()[axisProperty] + newOffset;
            newVal[lengthProperty] = item.rect()[lengthProperty];
            item.rect(newVal);
        });
    };
    AlignmentHandler.prototype._roundingValue = function (value, snapGridSize) {
        return Math.round(value / snapGridSize) * snapGridSize;
    };
    AlignmentHandler.prototype.alignLeft = function () {
        var _this = this;
        this._visitAllSelectedItemsInSameContainerWithFocused(function (item, rect) {
            if (item instanceof xrTableRow_1.XRTableRowSurface) {
                item = item.parent;
            }
            var parentRect = _this._getPositionFromBand(item.parent);
            var left = rect.left - parentRect.left;
            item.rect({ left: left });
        });
    };
    AlignmentHandler.prototype.alignTop = function () {
        var _this = this;
        this._visitAllSelectedItemsInSameContainerWithFocused(function (item, rect) {
            if (item instanceof xrTableCell_1.XRTableCellSurface) {
                item = item.parent;
            }
            var parentRect = _this._getPositionFromBand(item.parent);
            if (parentRect['band'] === rect['band']) {
                var top = rect.top - parentRect.top;
                item.rect({ top: top });
            }
        });
    };
    AlignmentHandler.prototype.alignRight = function () {
        var _this = this;
        this._visitAllSelectedItemsInSameContainerWithFocused(function (item, rect) {
            if (item instanceof xrTableRow_1.XRTableRowSurface) {
                item = item.parent;
            }
            var parentRect = _this._getPositionFromBand(item.parent);
            var right = rect.left - parentRect.left + rect.width;
            var left = right - item.rect().width;
            item.rect({ right: right, left: left });
        });
    };
    AlignmentHandler.prototype.alignBottom = function () {
        var _this = this;
        this._visitAllSelectedItemsInSameContainerWithFocused(function (item, rect) {
            if (item instanceof xrTableCell_1.XRTableCellSurface) {
                item = item.parent;
            }
            var parentRect = _this._getPositionFromBand(item.parent);
            if (parentRect['band'] === rect['band']) {
                var bottom = rect.top - parentRect.top + rect.height;
                var top = bottom - item.rect().height;
                item.rect({ bottom: bottom, top: top });
            }
        });
    };
    AlignmentHandler.prototype.alignVerticalCenters = function () {
        var focused = this._getFocusedItem();
        var verticalCenter = focused.rect().left + focused.rect().width / 2;
        this._visitAllSelectedItemsInSameContainerWithFocused(function (item) {
            if (item instanceof xrTableCell_1.XRTableCellSurface) {
                item = item.parent.parent;
            }
            else if (item instanceof xrTableRow_1.XRTableRowSurface) {
                item = item.parent;
            }
            item.rect({ left: verticalCenter - item.rect().width / 2 });
        });
    };
    AlignmentHandler.prototype.alignHorizontalCenters = function () {
        var focused = this._getFocusedItem();
        var horizontalCenter = focused.rect().top + focused.rect().height / 2;
        this._visitAllSelectedItemsInSameContainerWithFocused(function (item) {
            if (item instanceof xrTableCell_1.XRTableCellSurface) {
                item = item.parent.parent;
            }
            else if (item instanceof xrTableRow_1.XRTableRowSurface) {
                item = item.parent;
            }
            if (focused.parent === item.parent) {
                item.rect({ top: horizontalCenter - item.rect().height / 2 });
            }
        });
    };
    AlignmentHandler.prototype.sizeToControlWidth = function () {
        var newWidth = this._getFocusedItem().rect().width;
        this._visitAllSelectedItemsInSameContainerWithFocused(function (item) {
            if (item instanceof xrTableRow_1.XRTableRowSurface) {
                item = item.parent;
            }
            item.rect({ width: newWidth });
        });
    };
    AlignmentHandler.prototype.sizeToControlHeight = function () {
        var newHeight = this._getFocusedItem().rect().height;
        this._visitAllSelectedItemsInSameContainerWithFocused(function (item) {
            if (item instanceof xrTableCell_1.XRTableCellSurface) {
                item = item.parent;
            }
            item.rect({ height: newHeight });
        });
    };
    AlignmentHandler.prototype.sizeToControl = function () {
        var newWidth = this._getFocusedItem().rect().width, newHeight = this._getFocusedItem().rect().height;
        this._visitAllSelectedItemsInSameContainerWithFocused(function (item) {
            if (item instanceof xrTableCell_1.XRTableCellSurface) {
                item.rect({ width: newWidth });
                item.parent.rect({ height: newHeight });
            }
            else if (item instanceof xrTableRow_1.XRTableRowSurface) {
                item.rect({ height: newHeight });
                item.parent.rect({ width: newWidth });
            }
            else {
                item.rect({ width: newWidth, height: newHeight });
            }
        });
    };
    AlignmentHandler.prototype.centerHorizontally = function () {
        this._centerByBand(true, this._surfaceContext().margins, this._surfaceContext().rtl());
    };
    AlignmentHandler.prototype.centerVertically = function () {
        this._centerByBand(false, new analytics_elements_1.Margins(0, 0, 0, 0));
    };
    AlignmentHandler.prototype.alignToGrid = function () {
        var _this = this;
        var snapGridSize = this._surfaceContext().snapGridSize();
        this._selectionProvider.selectedItems.filter(function (item) { return !item.locked; }).forEach(function (item) {
            if (item instanceof xrTableCell_1.XRTableCellSurface) {
                item.rect({
                    left: _this._roundingValue(item.rect().left, snapGridSize)
                });
                item.parent.rect({
                    top: _this._roundingValue(item.rect().top, snapGridSize)
                });
            }
            else if (item instanceof xrTableRow_1.XRTableRowSurface) {
                item.rect({
                    top: _this._roundingValue(item.rect().top, snapGridSize)
                });
                item.parent.rect({
                    left: _this._roundingValue(item.rect().left, snapGridSize)
                });
            }
            else {
                item.rect({
                    left: _this._roundingValue(item.rect().left, snapGridSize),
                    top: _this._roundingValue(item.rect().top, snapGridSize)
                });
            }
        });
    };
    AlignmentHandler.prototype.sizeToGrid = function () {
        var _this = this;
        var snapGridSize = this._surfaceContext().snapGridSize();
        this._selectionProvider.selectedItems.filter(function (item) { return !item.locked; }).forEach(function (item) {
            if (item instanceof xrTableCell_1.XRTableCellSurface) {
                item.rect({
                    left: _this._roundingValue(item.rect().left, snapGridSize),
                    width: _this._roundingValue(item.rect().width, snapGridSize)
                });
                item.parent.rect({
                    top: _this._roundingValue(item.rect().top, snapGridSize),
                    height: _this._roundingValue(item.rect().height, snapGridSize)
                });
            }
            else if (item instanceof xrTableRow_1.XRTableRowSurface) {
                item.rect({
                    top: _this._roundingValue(item.rect().top, snapGridSize),
                    height: _this._roundingValue(item.rect().height, snapGridSize)
                });
                item.parent.rect({
                    left: _this._roundingValue(item.rect().left, snapGridSize),
                    width: _this._roundingValue(item.rect().width, snapGridSize)
                });
            }
            else {
                item.rect({
                    left: _this._roundingValue(item.rect().left, snapGridSize),
                    top: _this._roundingValue(item.rect().top, snapGridSize),
                    width: _this._roundingValue(item.rect().width, snapGridSize),
                    height: _this._roundingValue(item.rect().height, snapGridSize)
                });
            }
        });
    };
    AlignmentHandler.prototype.sendToBack = function () {
        this._selectionProvider.selectedItems.filter(function (item) { return !item.locked; }).forEach(function (item) {
            if (!item.focused()) {
                item.getControlModel()['sendToBack']();
            }
        });
        this._getFocusedItem().getControlModel()['sendToBack']();
    };
    AlignmentHandler.prototype.bringToFront = function () {
        var reverseSelectedItems = this._selectionProvider.selectedItems.filter(function (item) { return !item.locked; });
        reverseSelectedItems.reverse();
        reverseSelectedItems.forEach(function (item) {
            item.getControlModel()['bringToFront']();
        });
    };
    AlignmentHandler.prototype.canChangeZOrder = function () {
        var focusedItem = this._getFocusedItem(), parent = focusedItem && focusedItem.parent;
        if (!focusedItem || !parent)
            return false;
        var childrenCollection = parent.getChildrenCollection();
        return (childrenCollection && childrenCollection.peek().length) > 1;
    };
    return AlignmentHandler;
}());
exports.AlignmentHandler = AlignmentHandler;
var xrBand_1 = require("../bands/xrBand");
var xrTableRow_1 = require("../controls/xrTableRow");
var xrTableCell_1 = require("../controls/xrTableCell");
