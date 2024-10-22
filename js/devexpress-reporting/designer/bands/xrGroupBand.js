﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrGroupBand.js)
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
var xrBand_1 = require("./xrBand");
var groupfield_1 = require("./groupfield");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var GroupHeaderBand = (function (_super) {
    __extends(GroupHeaderBand, _super);
    function GroupHeaderBand(band, parent, serializer) {
        var _this = _super.call(this, band, parent, serializer) || this;
        _this.groupFields = analytics_utils_1.deserializeArray(band.GroupFields, function (field) { return new groupfield_1.GroupFieldModel(field, serializer); });
        _this.sortingSummary.getPath = function (propertyName) {
            if (propertyName === 'fieldName') {
                return _this.getPath('groupFields');
            }
        };
        return _this;
    }
    GroupHeaderBand.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.groupFields);
        this.resetObservableArray(this.groupFields);
    };
    return GroupHeaderBand;
}(xrBand_1.BandViewModel));
exports.GroupHeaderBand = GroupHeaderBand;
