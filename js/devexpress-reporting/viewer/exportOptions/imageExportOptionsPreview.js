﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\imageExportOptionsPreview.js)
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
var imageMetaData_1 = require("../../common/exportOptions/imageMetaData");
var imageExportOptions_1 = require("../../common/exportOptions/imageExportOptions");
var metadata_1 = require("./metadata");
var imageExportOptionsSerializationInfoPreview = [].concat(imageMetaData_1.imageExportOptionsSerializationInfoBase);
var ImageExportOptionsPreview = (function (_super) {
    __extends(ImageExportOptionsPreview, _super);
    function ImageExportOptionsPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageExportOptionsPreview.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, value.getInfo(), refs);
    };
    ImageExportOptionsPreview.prototype.getInfo = function () {
        var variableInfo = this._getVariableInfo();
        return variableInfo.concat(imageExportOptionsSerializationInfoPreview);
    };
    ImageExportOptionsPreview.prototype._getVariableInfo = function () {
        return [metadata_1.imageExportModePreview];
    };
    return ImageExportOptionsPreview;
}(imageExportOptions_1.ImageExportOptions));
exports.ImageExportOptionsPreview = ImageExportOptionsPreview;
var ImageExportOptionsMergedPreview = (function (_super) {
    __extends(ImageExportOptionsMergedPreview, _super);
    function ImageExportOptionsMergedPreview(model, serializer) {
        var _this = _super.call(this, model, serializer) || this;
        _this.imageExportMode(metadata_1.excludeModesForMergedDocuments(_this.imageExportMode())());
        return _this;
    }
    ImageExportOptionsMergedPreview.prototype._getVariableInfo = function () {
        return [metadata_1.imageExportModeMergedPreview];
    };
    ImageExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
        return _super.prototype.isPropertyDisabled.call(this, name) || name === metadata_1.imageExportModeMergedPreview.propertyName;
    };
    return ImageExportOptionsMergedPreview;
}(ImageExportOptionsPreview));
exports.ImageExportOptionsMergedPreview = ImageExportOptionsMergedPreview;
