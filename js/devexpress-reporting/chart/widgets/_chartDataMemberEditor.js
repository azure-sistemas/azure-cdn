﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_chartDataMemberEditor.js)
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
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ChartDataMemberEditor = (function (_super) {
    __extends(ChartDataMemberEditor, _super);
    function ChartDataMemberEditor(info, level, parentDisabled) {
        var _this = _super.call(this, info, level, parentDisabled) || this;
        _this.treeListController.itemsFilter = function (item) {
            if (item.isList)
                return true;
            if (_this.name === 'argumentDataMember') {
                return _this._getArgumentDataMemberFilter(item);
            }
            else {
                return _this._getValueDataMemberFilter(item);
            }
        };
        return _this;
    }
    ChartDataMemberEditor.prototype._isNumber = function (specifics) {
        return specifics.indexOf('integer') !== -1 || specifics.indexOf('float') !== -1;
    };
    ChartDataMemberEditor.prototype._isDate = function (specifics) { return specifics.indexOf('date') !== -1; };
    ChartDataMemberEditor.prototype._getArgumentDataMemberFilter = function (item) {
        var scaleType = this._model() && this._model()['argumentScaleType']();
        var itemSpecifics = item.specifics.toLowerCase();
        if (scaleType === 'Numerical') {
            return this._isNumber(itemSpecifics);
        }
        else if (scaleType === 'DateTime') {
            return this._isDate(itemSpecifics);
        }
        else {
            return true;
        }
    };
    ChartDataMemberEditor.prototype._getValueDataMemberFilter = function (item) {
        var itemSpecifics = item.specifics.toLowerCase();
        if (this.name === 'weight') {
            return this._isNumber(itemSpecifics);
        }
        else {
            var scaleType = this._model() && this._model()['valueScaleType']();
            if (scaleType === 'Numerical') {
                return this._isNumber(itemSpecifics);
            }
            else {
                return this._isDate(itemSpecifics);
            }
        }
    };
    return ChartDataMemberEditor;
}(analytics_widgets_1.FieldListEditor));
exports.ChartDataMemberEditor = ChartDataMemberEditor;
