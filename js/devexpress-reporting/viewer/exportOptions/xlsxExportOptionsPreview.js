﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\xlsxExportOptionsPreview.js)
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
var xlsMetaData_1 = require("../../common/exportOptions/xlsMetaData");
var xlsxExportOptions_1 = require("../../common/exportOptions/xlsxExportOptions");
var metadata_1 = require("./metadata");
var xlsxExportOptionsSerializationInfoPreview = [].concat(xlsMetaData_1.xlsExportOptionsSerializationInfoCommon);
var XlsxExportOptionsPreview = (function (_super) {
    __extends(XlsxExportOptionsPreview, _super);
    function XlsxExportOptionsPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XlsxExportOptionsPreview.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, value.getInfo(), refs);
    };
    XlsxExportOptionsPreview.prototype.getInfo = function () {
        var variableInfo = this._getVariableInfo();
        return variableInfo.concat(xlsxExportOptionsSerializationInfoPreview);
    };
    XlsxExportOptionsPreview.prototype._getVariableInfo = function () {
        return [metadata_1.xlsxExportModePreview];
    };
    return XlsxExportOptionsPreview;
}(xlsxExportOptions_1.XlsxExportOptions));
exports.XlsxExportOptionsPreview = XlsxExportOptionsPreview;
var XlsxExportOptionsMergedPreview = (function (_super) {
    __extends(XlsxExportOptionsMergedPreview, _super);
    function XlsxExportOptionsMergedPreview(model, serializer) {
        var _this = _super.call(this, model, serializer) || this;
        _this.xlsxExportMode(metadata_1.excludeModesForMergedDocuments(_this.xlsxExportMode())());
        return _this;
    }
    XlsxExportOptionsMergedPreview.prototype._getVariableInfo = function () {
        return [metadata_1.xlsxExportModeMergedPreview];
    };
    XlsxExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
        return _super.prototype.isPropertyDisabled.call(this, name) || name === metadata_1.xlsxExportModeMergedPreview.propertyName;
    };
    return XlsxExportOptionsMergedPreview;
}(XlsxExportOptionsPreview));
exports.XlsxExportOptionsMergedPreview = XlsxExportOptionsMergedPreview;
