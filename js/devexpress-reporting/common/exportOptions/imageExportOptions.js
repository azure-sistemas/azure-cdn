﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\imageExportOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ImageExportOptions = (function () {
    function ImageExportOptions(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    ImageExportOptions.from = function (model, serializer) {
        return new ImageExportOptions(model || {}, serializer);
    };
    ImageExportOptions.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, imageMetaData_1.imageExportOptionsSerializationInfo, refs);
    };
    ImageExportOptions.prototype.getInfo = function () {
        return imageMetaData_1.imageExportOptionsSerializationInfo;
    };
    ImageExportOptions.prototype.isPropertyDisabled = function (name) {
        return ((name === 'pageRange') || (name === 'pageBorderWidth')) && ((this.imageExportMode ? this.imageExportMode() : metadata_1.imageExportMode.defaultVal) === 'SingleFile');
    };
    return ImageExportOptions;
}());
exports.ImageExportOptions = ImageExportOptions;
var imageMetaData_1 = require("./imageMetaData");
var metadata_1 = require("./metadata");
