﻿/**
* DevExpress HTML/JS Reporting (chart\internal\data\_dataMemberBase.js)
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
var DataMemberBase = (function (_super) {
    __extends(DataMemberBase, _super);
    function DataMemberBase(value, valueScaleType) {
        var _this = _super.call(this) || this;
        _this._separator = ';';
        _this._assignValueDataMembers(_this, value);
        if (valueScaleType) {
            _this.valueScaleType = valueScaleType;
            _this._disposables.push(_this.valueScaleType.subscribe(function (newVal) {
                _this._assignValueDataMembers(_this, '');
            }));
        }
        return _this;
    }
    DataMemberBase.prototype._assignValueDataMembers = function (valueDataMember, value) {
        var values = (value || '').split(this._separator);
        valueDataMember.arrayValueDataMemberNames.forEach(function (name, index) {
            if (valueDataMember[name])
                valueDataMember[name](values[index] || '');
            else
                valueDataMember[name] = ko.observable(values[index] || '');
        });
    };
    DataMemberBase.prototype._valueDataMembersToString = function (valueDataMember) {
        var result = [];
        valueDataMember.arrayValueDataMemberNames.forEach(function (name) {
            result.push(valueDataMember[name]() || '');
        });
        return result.join(this._separator);
    };
    DataMemberBase.prototype.toString = function () {
        var _this = this;
        var shouldSerialize = false;
        this.arrayValueDataMemberNames.forEach(function (name) {
            shouldSerialize = shouldSerialize || _this[name]();
        });
        return shouldSerialize ? this._valueDataMembersToString(this) : null;
    };
    return DataMemberBase;
}(analytics_utils_1.Disposable));
exports.DataMemberBase = DataMemberBase;
