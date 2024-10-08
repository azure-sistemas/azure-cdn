﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\_utils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reportWizardState_1 = require("./reportWizardState");
var ko = require("knockout");
function getFormattedValueInUnits(value, unit) {
    var format = unit === reportWizardState_1.GraphicsUnit.Inch ? 2 : 1;
    return value.toFixed(format);
}
exports.getFormattedValueInUnits = getFormattedValueInUnits;
var ListViewModel = (function () {
    function ListViewModel(caption) {
        var _this = this;
        this.caption = caption;
        this._items = ko.observableArray([]).extend({ deferred: true });
        this._refreshActiveItem = function (previousActivItemIndex) {
            if (previousActivItemIndex === void 0) { previousActivItemIndex = -1; }
            if (_this.isEmpty) {
                _this.activeItemArray.removeAll();
            }
            else if (previousActivItemIndex < 0) {
                _this.activeItemArray.splice(0, 1, _this._items()[0]);
            }
            else {
                if (previousActivItemIndex >= _this._items().length) {
                    previousActivItemIndex = _this._items().length - 1;
                }
                _this.activeItemArray.splice(0, 1, _this._items()[previousActivItemIndex]);
            }
        };
        this.activeItemArray = ko.observableArray([]).extend({ deferred: true });
    }
    Object.defineProperty(ListViewModel.prototype, "items", {
        get: function () {
            return this._items();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewModel.prototype, "activeItem", {
        get: function () {
            return this.activeItemArray().length === 1 ? this.activeItemArray()[0] : null;
        },
        set: function (value) {
            if (this._items().indexOf(value) > -1) {
                this.activeItemArray.splice(0, 1, value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ListViewModel.prototype.add = function (item) {
        this._items.push(item);
        this.activeItemArray.splice(0, 1, item);
    };
    ListViewModel.prototype.addRange = function (items) {
        this.setItems(this._items().concat(items));
    };
    ListViewModel.prototype.removeActiveItem = function () {
        var index = this._items.indexOf(this.activeItemArray()[0]);
        this._items.remove(this.activeItemArray()[0]);
        this._refreshActiveItem(index);
    };
    ListViewModel.prototype.removeAll = function () {
        this._items.removeAll();
        this.activeItemArray.removeAll();
    };
    ListViewModel.prototype.setItems = function (items) {
        this._items(items);
        this.activeItemArray([this._items()[0]]);
        this._refreshActiveItem();
    };
    ListViewModel.prototype.moveUp = function () {
        if (this.isMoveUpEnabled()) {
            var index = this._items.indexOf(this.activeItem);
            this.activeItemArray.removeAll();
            this._items.splice(index - 1, 2, this._items()[index], this._items()[index - 1]);
            this.activeItemArray.splice(0, 1, this._items()[index - 1]);
        }
    };
    ListViewModel.prototype.moveDown = function () {
        if (this.isMoveDownEnabled()) {
            var index = this._items.indexOf(this.activeItem);
            this.activeItemArray.removeAll();
            this._items.splice(index, 2, this._items()[index + 1], this._items()[index]);
            this.activeItemArray.splice(0, 1, this._items()[index + 1]);
        }
    };
    Object.defineProperty(ListViewModel.prototype, "isEmpty", {
        get: function () {
            return this._items().length === 0;
        },
        enumerable: true,
        configurable: true
    });
    ListViewModel.prototype.isMoveUpEnabled = function () {
        return this._items.indexOf(this.activeItemArray()[0]) > 0;
    };
    ListViewModel.prototype.isMoveDownEnabled = function () {
        var index = this._items.indexOf(this.activeItemArray()[0]);
        return index > -1 && index < this._items().length - 1;
    };
    return ListViewModel;
}());
exports.ListViewModel = ListViewModel;
