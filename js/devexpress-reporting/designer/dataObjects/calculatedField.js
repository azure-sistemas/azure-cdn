﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\calculatedField.js)
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
var calculatedField_1 = require("./metadata/calculatedField");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var CalculatedField = (function (_super) {
    __extends(CalculatedField, _super);
    function CalculatedField(model, serializer) {
        var _this = _super.call(this) || this;
        _this.templateName = 'dx-treelist-item';
        _this.contenttemplate = 'dxrd-calculatedfield-content';
        _this.isList = false;
        _this.isCalculated = true;
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(_this, model);
        return _this;
    }
    CalculatedField.prototype.getInfo = function () {
        return calculatedField_1.calculatedFieldSerializationInfo;
    };
    Object.defineProperty(CalculatedField.prototype, "displayName", {
        get: function () {
            return this['displayNameObject']() || this.calculatedFieldName();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalculatedField.prototype, "name", {
        get: function () {
            return this.calculatedFieldName();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalculatedField.prototype, "specifics", {
        get: function () {
            var type = this.fieldType();
            if (['Byte', 'Int16', 'Int32'].indexOf(type) > -1) {
                return 'calcinteger';
            }
            else if (['Float', 'Double', 'Decimal'].indexOf(type) > -1) {
                return 'calcfloat';
            }
            else if (['DateTime', 'TimeSpan'].indexOf(type) > -1) {
                return 'calcdate';
            }
            return 'calc' + (type === 'None' ? 'default' : type.toLowerCase());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalculatedField.prototype, "type", {
        get: function () {
            return this.fieldType();
        },
        enumerable: true,
        configurable: true
    });
    CalculatedField.prototype.lockedInUserDesigner = function () {
        return false;
    };
    return CalculatedField;
}(analytics_utils_1.Disposable));
exports.CalculatedField = CalculatedField;
