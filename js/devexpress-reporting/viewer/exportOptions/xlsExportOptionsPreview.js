﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\xlsExportOptionsPreview.js)
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
var xlsExportOptions_1 = require("../../common/exportOptions/xlsExportOptions");
var metadata_1 = require("./metadata");
var xlsExportOptionsSerializationInfoPreview = [].concat(xlsMetaData_1.xlsExportOptionsSerializationInfoBase, xlsMetaData_1.xlsExportOptionsSerializationInfoCommon);
var XlsExportOptionsPreview = (function (_super) {
    __extends(XlsExportOptionsPreview, _super);
    function XlsExportOptionsPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XlsExportOptionsPreview.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, value.getInfo(), refs);
    };
    XlsExportOptionsPreview.prototype.getInfo = function () {
        var variableInfo = this._getVariableInfo();
        return variableInfo.concat(xlsExportOptionsSerializationInfoPreview);
    };
    XlsExportOptionsPreview.prototype._getVariableInfo = function () {
        return [metadata_1.xlsExportModePreview];
    };
    return XlsExportOptionsPreview;
}(xlsExportOptions_1.XlsExportOptions));
exports.XlsExportOptionsPreview = XlsExportOptionsPreview;
var XlsExportOptionsMergedPreview = (function (_super) {
    __extends(XlsExportOptionsMergedPreview, _super);
    function XlsExportOptionsMergedPreview(model, serializer) {
        var _this = _super.call(this, model, serializer) || this;
        _this.xlsExportMode(metadata_1.excludeModesForMergedDocuments(_this.xlsExportMode())());
        return _this;
    }
    XlsExportOptionsMergedPreview.prototype._getVariableInfo = function () {
        return [metadata_1.xlsExportModeMergedPreview];
    };
    XlsExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
        return _super.prototype.isPropertyDisabled.call(this, name) || name === metadata_1.xlsExportModeMergedPreview.propertyName;
    };
    return XlsExportOptionsMergedPreview;
}(XlsExportOptionsPreview));
exports.XlsExportOptionsMergedPreview = XlsExportOptionsMergedPreview;
