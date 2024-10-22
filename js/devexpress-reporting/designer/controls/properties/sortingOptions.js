﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\sortingOptions.js)
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
var sortingOptions_1 = require("../metadata/properties/sortingOptions");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var SortingOptions = (function (_super) {
    __extends(SortingOptions, _super);
    function SortingOptions(model, report, serializer) {
        var _this = _super.call(this) || this;
        _this._info = $.extend(true, [], sortingOptions_1.sortingOptionsSerializationsInfo);
        _this._fieldNameInfo = _this._info.filter(function (info) { return info.propertyName == 'fieldName'; })[0];
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(_this, model || {});
        Object.defineProperty(_this._fieldNameInfo, 'valuesArray', {
            get: function () {
                var items = [];
                var currentBand = _this.targetBand && _this.targetBand();
                if (currentBand) {
                    items = _this._getFieldNames(currentBand).map(function (fieldName) { return { value: fieldName, displayValue: fieldName }; });
                }
                return items;
            }
        });
        var _fieldName = _this.fieldName;
        _this._disposables.push(_this.fieldName = ko.computed({
            read: function () {
                var value = _fieldName();
                return _this._getFieldNames(_this.targetBand()).indexOf(value) === -1 ? '' : value;
            },
            write: function (newValue) {
                _fieldName(newValue);
            }
        }));
        return _this;
    }
    SortingOptions.prototype._getFieldNames = function (targetBand) {
        var fieldArray = targetBand && (targetBand['sortFields'] || targetBand['groupFields']);
        return fieldArray ? fieldArray().map(function (item) { return item.fieldName(); }).filter(function (name) { return !!name; }) : [];
    };
    SortingOptions.prototype.getInfo = function () {
        return this._info;
    };
    SortingOptions.prototype.isPropertyDisabled = function (name) {
        return name == 'fieldName' && !this.targetBand();
    };
    SortingOptions.prototype.resetValue = function () {
        this.targetBand(null);
        this.fieldName('');
    };
    SortingOptions.prototype.getPath = function (propertyName) {
        return this.targetBand() && this.targetBand().getPath('groupFields') || '';
    };
    return SortingOptions;
}(analytics_utils_1.Disposable));
exports.SortingOptions = SortingOptions;
