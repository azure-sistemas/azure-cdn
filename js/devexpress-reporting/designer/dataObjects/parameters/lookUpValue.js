﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\lookUpValue.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lookUpValue_1 = require("../metadata/parameters/lookUpValue");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var LookUpValue = (function () {
    function LookUpValue(model, serializer) {
        var _this = this;
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
        this.value = ko.pureComputed({
            read: function () {
                return _this._value() && _this._value().content();
            },
            write: function (newValue) {
                _this._value() && _this._value().content(newValue);
            }
        });
    }
    LookUpValue.createNew = function () {
        return new LookUpValue({});
    };
    LookUpValue.from = function (model, serializer) {
        return new LookUpValue(model, serializer);
    };
    LookUpValue.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, lookUpValue_1.lookUpValueSerializationInfo, refs);
    };
    LookUpValue.prototype.getInfo = function () {
        if (this.valueInfo) {
            return lookUpValue_1.lookUpValueSerializationInfo.concat(this.valueInfo());
        }
        return lookUpValue_1.lookUpValueSerializationInfo;
    };
    Object.defineProperty(LookUpValue.prototype, "isEmpty", {
        get: function () {
            return this._value() === null || this._value() === undefined;
        },
        enumerable: true,
        configurable: true
    });
    return LookUpValue;
}());
exports.LookUpValue = LookUpValue;
