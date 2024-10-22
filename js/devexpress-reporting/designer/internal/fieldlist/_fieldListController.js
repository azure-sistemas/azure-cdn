﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_fieldListController.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var ItemsInRangeEnumerator = (function () {
    function ItemsInRangeEnumerator(start, end) {
        this._start = start;
        this._end = end;
    }
    ItemsInRangeEnumerator.prototype._findCommonParent = function (current, last) {
        return current === last ? current :
            this._findCommonParent(current.parent || current, last.parent || last);
    };
    ItemsInRangeEnumerator.prototype._selectItemsBetweenShiftSelection = function (parent) {
        var items = parent.items();
        for (var i = 0; i < items.length; i++) {
            if (this._isSelectedRangeEnded)
                return;
            var item = items[i];
            this._addToSelectedItems(item);
            if (item === this._start || item === this._end) {
                this._isSelectedRangeEnded = this._isInSelectedRage;
                this._isInSelectedRage = !this._isInSelectedRage;
                this._addToSelectedItems(item);
            }
            if (!this._isSelectedRangeEnded && !item.collapsed()) {
                this._selectItemsBetweenShiftSelection(item);
            }
        }
    };
    ItemsInRangeEnumerator.prototype._addToSelectedItems = function (item) {
        if (this._isInSelectedRage) {
            this._callBack(item);
        }
    };
    ItemsInRangeEnumerator.prototype.enumerate = function (callBack) {
        this._isInSelectedRage = false;
        this._isSelectedRangeEnded = false;
        this._callBack = callBack;
        this._selectItemsBetweenShiftSelection(this._findCommonParent(this._start.parent, this._end.parent));
    };
    return ItemsInRangeEnumerator;
}());
var FieldListController = (function () {
    function FieldListController(actionProviders, fieldListActionWrapper, dragDropHandler, customizeFieldListActions) {
        if (actionProviders === void 0) { actionProviders = []; }
        if (customizeFieldListActions === void 0) { customizeFieldListActions = null; }
        this._selectedItems = ko.observableArray([]);
        this.hasItems = FieldListController.isList;
        this._actionProviders = actionProviders;
        this._fieldListActionWrapper = fieldListActionWrapper;
        this.dragDropHandler = dragDropHandler;
        this._customizeFieldListActions = customizeFieldListActions;
    }
    FieldListController.prototype.dispose = function () {
        this._actionProviders.splice(0);
        this._selectedItems.splice(0);
    };
    FieldListController.prototype.itemsFilter = function (item) {
        return item['isCalculated'] === true || item.specifics !== 'none';
    };
    FieldListController.isList = function (item) {
        if (!item)
            return false;
        return item['isCalculated'] ? false : item.specifics === 'List' || item.specifics === 'ListSource' || item.isList === true;
    };
    FieldListController.prototype.select = function (item) {
        this.selectedItem && this.selectedItem.isSelected(false);
        this.selectedItem = item;
        item.isSelected(true);
    };
    FieldListController.prototype.canSelect = function (item) {
        return true;
    };
    FieldListController.prototype.getActions = function (item) {
        var _this = this;
        var result = [];
        (this._actionProviders || []).forEach(function (actionsProvider) {
            var actions = actionsProvider.getActions(item);
            if (_this._fieldListActionWrapper) {
                _this._fieldListActionWrapper(actions);
            }
            result.push.apply(result, actions);
        });
        var getActionPosition = function (action) {
            return action.position === undefined ? 1 : action.position;
        };
        result = $.extend(true, [], result.sort(function (x, y) { return getActionPosition(x) - getActionPosition(y); }));
        this._customizeFieldListActions && this._customizeFieldListActions(item.data, result);
        return result;
    };
    FieldListController.prototype.canMultiSelect = function (item) {
        var path = new analytics_utils_1.PathRequest(item.path).path;
        var isSelectedItemCanMultiSelect = !this.selectedItem || this.selectedItem === item || this.canMultiSelect(this.selectedItem);
        return path.length !== 0 && isSelectedItemCanMultiSelect;
    };
    FieldListController.prototype.multiSelect = function (item, isShiftPressed, isCtrlPressed) {
        var _this = this;
        if (isShiftPressed === void 0) { isShiftPressed = false; }
        if (isCtrlPressed === void 0) { isCtrlPressed = false; }
        if (this.selectedItem) {
            this.selectedItem.isSelected(false);
            this.selectedItem.isMultiSelected(true);
        }
        if (isShiftPressed) {
            var lastSelectedItem = this.selectedItem;
            if (!isCtrlPressed) {
                this._selectedItems.peek().forEach(function (element) { return element.isMultiSelected(false); });
                this._selectedItems([]);
            }
            new ItemsInRangeEnumerator(item, lastSelectedItem).enumerate(function (element) {
                if (!element.isMultiSelected()) {
                    _this._selectedItems.push(element);
                    element.isMultiSelected(true);
                }
            });
            if (this._selectedItems.peek()[0] === lastSelectedItem) {
                this._selectedItems.reverse();
            }
        }
        else if (this._selectedItems.peek().indexOf(item) > -1) {
            this._selectedItems.remove(item);
            item.isMultiSelected(false);
        }
        else {
            this._selectedItems.push(item);
            item.isMultiSelected(true);
        }
    };
    FieldListController.prototype.isDraggable = function (item) {
        return true;
    };
    Object.defineProperty(FieldListController.prototype, "selectedItem", {
        get: function () {
            return this._selectedItems()[this._selectedItems().length - 1];
        },
        set: function (value) {
            this._selectedItems().forEach(function (item) { return item.isMultiSelected(false); });
            this._selectedItems.splice(0);
            this._selectedItems.push(value);
        },
        enumerable: true,
        configurable: true
    });
    FieldListController.prototype.selectedItems = function () {
        return this._selectedItems();
    };
    return FieldListController;
}());
exports.FieldListController = FieldListController;
