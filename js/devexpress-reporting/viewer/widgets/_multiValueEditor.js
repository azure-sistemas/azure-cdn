﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\_multiValueEditor.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var MultiValueEditorOptions = (function (_super) {
    __extends(MultiValueEditorOptions, _super);
    function MultiValueEditorOptions(value, items) {
        var _this = _super.call(this) || this;
        _this.selectedItems = ko.observable([]);
        var values = value();
        _this.value = value;
        var valueHasMutated = function () {
            _this.editorValue.notifySubscribers(_this.displayItems[0]);
        };
        _this._items = items.map(function (item) {
            var selected = ko.observable(_this._isValueSelected(item.value, values));
            return { selected: selected, value: item.value, displayValue: item.displayValue || item.value, toggleSelected: function () { selected(!selected()); valueHasMutated(); } };
        });
        _this._disposables.push(_this.selectedItems = ko.pureComputed(function () {
            return _this._items.filter(function (item) { return item.selected(); });
        }));
        var selectionInProcess = ko.observable(false), isSelectedAllState, stringValue;
        _this._disposables.push(_this.selectedValuesString = ko.pureComputed({
            read: function () {
                if (selectionInProcess())
                    return stringValue;
                stringValue = '';
                _this.selectedItems().forEach(function (item, index, array) {
                    stringValue += item.displayValue;
                    if (index < array.length - 1) {
                        stringValue += ', ';
                    }
                });
                return stringValue;
            },
            write: function (newValue) { }
        }));
        _this._disposables.push(_this.isSelectedAll = ko.pureComputed({
            read: function () {
                if (selectionInProcess())
                    return isSelectedAllState;
                var selectedItemCount = _this.selectedItems().length;
                if (selectedItemCount > 0 && selectedItemCount < _this._items.length) {
                    return undefined;
                }
                isSelectedAllState = selectedItemCount === _this._items.length;
                return isSelectedAllState;
            },
            write: function (newValue) {
                isSelectedAllState = newValue;
                try {
                    selectionInProcess(true);
                    _this._items.forEach(function (item) { item.selected(newValue); });
                }
                finally {
                    selectionInProcess(false);
                }
            }
        }));
        var selectAllItem = { selected: _this.isSelectedAll, value: null, displayValue: analytics_utils_1.getLocalization('(Select All)', 'AnalyticsCoreStringId.SelectAll'), toggleSelected: function () { _this.isSelectedAll(!_this.isSelectedAll()); valueHasMutated(); } };
        _this.displayItems = [selectAllItem].concat(_this._items);
        _this.dataSource = _this.displayItems;
        _this.editorValue = ko.observable(selectAllItem);
        _this.updateValue = function () {
            value(_this._items.filter(function (item) { return item.selected(); }).map(function (item) { return item.value; }));
            valueHasMutated();
        };
        _this.onOptionChanged = function (e) {
            if (e.name !== 'opened' || e.value)
                return;
            _this.updateValue();
        };
        return _this;
    }
    MultiValueEditorOptions.prototype._isValueSelected = function (value, array) {
        if (value instanceof Date) {
            return array.filter(function (item) { return item - value === 0; }).length > 0;
        }
        return array.indexOf(value) !== -1;
    };
    return MultiValueEditorOptions;
}(analytics_utils_1.Disposable));
exports.MultiValueEditorOptions = MultiValueEditorOptions;
