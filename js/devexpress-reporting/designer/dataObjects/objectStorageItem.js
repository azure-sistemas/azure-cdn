﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\objectStorageItem.js)
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
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var $ = require("jquery");
var ObjectItem = (function (_super) {
    __extends(ObjectItem, _super);
    function ObjectItem(model, dsHelperProvider, serializer) {
        var _this = _super.call(this) || this;
        _this.dsHelperProvider = dsHelperProvider;
        _this.preInitProperties(model, dsHelperProvider, serializer);
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(_this, model);
        _this.afterDeserialization(model, serializer);
        return _this;
    }
    ObjectItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.dsHelperProvider = null;
    };
    ObjectItem.prototype.getInfo = function () {
        return [{ propertyName: 'objectType', modelName: '@ObjectType' }];
    };
    ObjectItem.prototype.afterDeserialization = function (model, serializer) {
        analytics_internal_1.cutRefs(model);
    };
    ObjectItem.prototype.preInitProperties = function (model, dsHelperProvider, serializer) { };
    return ObjectItem;
}(analytics_utils_1.Disposable));
exports.ObjectItem = ObjectItem;
var ObjectStorageItem = (function (_super) {
    __extends(ObjectStorageItem, _super);
    function ObjectStorageItem(model, dsHelperProvider, serializer) {
        return _super.call(this, $.extend({ '@ObjectType': 'DevExpress.XtraReports.Serialization.ObjectStorageInfo' }, model), dsHelperProvider, serializer) || this;
    }
    ObjectStorageItem.prototype._getInfo = function () {
        return _super.prototype.getInfo.call(this).concat([{ propertyName: 'content', modelName: '@Content' }, { propertyName: 'type', modelName: '@Type' },
            { propertyName: 'name', modelName: '@Name', defaultVal: '' }]);
    };
    ObjectStorageItem.prototype.preInitProperties = function (model) {
        var _this = this;
        this.getInfo = (model && model['@Base64']) ? function () {
            return _this._getInfo().concat({ propertyName: 'base64', modelName: '@Base64' });
        } : function () { return _this._getInfo(); };
    };
    ObjectStorageItem.prototype.isEmpty = function () {
        return this.type && this.type() === 'System.DateTime'
            && this.content && (this.content() === undefined || this.content() === null);
    };
    return ObjectStorageItem;
}(ObjectItem));
exports.ObjectStorageItem = ObjectStorageItem;
var ObjectStorageParameter = (function (_super) {
    __extends(ObjectStorageParameter, _super);
    function ObjectStorageParameter(model, serializer) {
        return _super.call(this, model, serializer, [{ propertyName: '_type', modelName: '@Type', link: true }, parameter_1.parameterLookUpSettingsSerializationInfo]) || this;
    }
    return ObjectStorageParameter;
}(analytics_elements_1.SerializableModel));
exports.ObjectStorageParameter = ObjectStorageParameter;
var parameter_1 = require("./metadata/parameters/parameter");
