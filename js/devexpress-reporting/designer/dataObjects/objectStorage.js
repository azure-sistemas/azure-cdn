﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\objectStorage.js)
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
var objectStorageItem_1 = require("./objectStorageItem");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ObjectsStorage = (function (_super) {
    __extends(ObjectsStorage, _super);
    function ObjectsStorage(objects, dsHelperProvider) {
        var _this = _super.call(this) || this;
        _this.objects = objects;
        _this.dsHelperProvider = dsHelperProvider;
        return _this;
    }
    ObjectsStorage.prototype.findType = function (content) {
        var objectStorages = this.objects().filter(function (item) { return item instanceof objectStorageItem_1.ObjectStorageItem; });
        var result = objectStorages.filter(function (item) {
            return !!item.type && item.type() === 'System.Type' && item.content() === content;
        });
        return result.length === 0 ? null : result[0];
    };
    ObjectsStorage.prototype.getType = function (type) {
        var typeObject = this.findType(type);
        if (!typeObject) {
            typeObject = new objectStorageItem_1.ObjectStorageItem({
                '@Content': type,
                '@Type': 'System.Type'
            }, this.dsHelperProvider);
            this.objects.push(typeObject);
        }
        return typeObject;
    };
    ObjectsStorage.prototype.addValue = function () {
        var newValueRef = new objectStorageItem_1.ObjectStorageItem({ '@Content': '' }, this.dsHelperProvider);
        this.objects.push(newValueRef);
        return newValueRef;
    };
    ObjectsStorage.prototype.createStaticLookUpSetting = function () {
        var lookUpObject = new lookupSettings_1.StaticListLookUpSettings({}, this.dsHelperProvider);
        this.objects.push(lookUpObject);
        return lookUpObject;
    };
    ObjectsStorage.prototype.createDynamicLookUpSetting = function () {
        var lookUpObject = new lookupSettings_1.DynamicListLookUpSettings({}, this.dsHelperProvider);
        this.objects.push(lookUpObject);
        return lookUpObject;
    };
    ObjectsStorage.prototype.createRangeSetting = function () {
        var rangeSettingsObject = new rangeSettings_1.RangeParametersSettings({}, this.dsHelperProvider);
        this.objects.push(rangeSettingsObject);
        var startParameter = new rangeSettings_1.RangeStartParameter({}, this.dsHelperProvider);
        rangeSettingsObject.startParameter(startParameter);
        this.objects.push(startParameter);
        var endParameter = new rangeSettings_1.RangeEndParameter({}, this.dsHelperProvider);
        rangeSettingsObject.endParameter(endParameter);
        this.objects.push(endParameter);
        return rangeSettingsObject;
    };
    return ObjectsStorage;
}(analytics_utils_1.Disposable));
exports.ObjectsStorage = ObjectsStorage;
var rangeSettings_1 = require("./parameters/rangeSettings");
var lookupSettings_1 = require("./parameters/lookupSettings");
