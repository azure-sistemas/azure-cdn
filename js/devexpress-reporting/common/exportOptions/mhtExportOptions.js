﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\mhtExportOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./metadata");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var MhtExportOptions = (function () {
    function MhtExportOptions(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    MhtExportOptions.from = function (model, serializer) {
        return new MhtExportOptions(model || {}, serializer);
    };
    MhtExportOptions.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, mhtMetaData_1.mhtExportOptionsSerializationInfo, refs);
    };
    MhtExportOptions.prototype.getInfo = function () {
        return mhtMetaData_1.mhtExportOptionsSerializationInfo;
    };
    MhtExportOptions.prototype.isPropertyDisabled = function (name) {
        return ((name === 'pageRange') || (name === 'pageBorderWidth')) && ((this.htmlExportMode ? this.htmlExportMode() : metadata_1.htmlExportMode.defaultVal) === 'SingleFile');
    };
    return MhtExportOptions;
}());
exports.MhtExportOptions = MhtExportOptions;
var mhtMetaData_1 = require("./mhtMetaData");
