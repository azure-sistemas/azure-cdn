﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\style.js)
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
var style_1 = require("../metadata/properties/style");
var _locker_1 = require("../../../common/utils/_locker");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var StyleModel = (function (_super) {
    __extends(StyleModel, _super);
    function StyleModel(model, serializer) {
        var _this = _super.call(this) || this;
        _this.className = function () {
            return 'stylemodel';
        };
        _this.controlType = 'XRStyleModel';
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(_this, model);
        ['backColor', 'foreColor', 'borderColor'].forEach(function (propertyName) {
            _this._disposables.push(_this[propertyName] = ko.pureComputed({
                read: function () { return _this['_' + propertyName] && _this['_' + propertyName]() || StyleModel.defaults[propertyName]; },
                write: function (val) { _this['_' + propertyName](val); }
            }));
        });
        _this._disposables.push(_this.paddingObj = new analytics_elements_1.PaddingModel());
        _this.paddingObj.applyFromString(_this['padding']());
        var lock = new _locker_1.Locker().lock;
        _this._disposables.push(_this.padding.subscribe(function (newVal) {
            lock(function () { return _this.paddingObj.applyFromString(newVal); });
        }));
        ['left', 'right', 'top', 'bottom'].forEach(function (name) {
            _this._disposables.push(_this.paddingObj[name].subscribe(function (newVal) {
                lock(function () { return _this.padding(_this.paddingObj.toString()); });
            }));
        });
        return _this;
    }
    StyleModel.prototype.getInfo = function () {
        return style_1.styleSerializationInfo;
    };
    StyleModel.prototype.isPropertyModified = function (name) {
        var needName = this['_' + name] ? '_' + name : name;
        var property = ko.unwrap(this[needName]);
        if (property instanceof Object) {
            return !property.isEmpty();
        }
        else {
            return !!property;
        }
    };
    StyleModel.prototype.displayType = function () {
        return analytics_utils_1.getLocalization('Control Style', 'DevExpress.XtraReports.UI.XRControlStyle');
    };
    StyleModel.defaults = {
        'backColor': 'transparent',
        'foreColor': 'Black',
        'borderColor': 'Black'
    };
    return StyleModel;
}(analytics_utils_1.Disposable));
exports.StyleModel = StyleModel;
