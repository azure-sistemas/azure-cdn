﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\docxExportOptionsPreview.js)
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
var metadata_1 = require("../../common/exportOptions/metadata");
var rtfMetaData_1 = require("../../common/exportOptions/rtfMetaData");
var docxMetaData_1 = require("../../common/exportOptions/docxMetaData");
var docxExportOptions_1 = require("../../common/exportOptions/docxExportOptions");
var metadata_2 = require("./metadata");
var docxExportOptionsSerializationInfoPreview = [
    metadata_1.pageRange,
    metadata_1.docxTableLayout,
    rtfMetaData_1.keepRowHeight,
    metadata_1.rasterizeImages,
    metadata_1.rasterizationResolution,
    metadata_1.exportPageBreaks,
    metadata_1.exportWatermarks,
    docxMetaData_1.docxDocumentOptions,
];
var DocxExportOptionsPreview = (function (_super) {
    __extends(DocxExportOptionsPreview, _super);
    function DocxExportOptionsPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DocxExportOptionsPreview.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, value.getInfo(), refs);
    };
    DocxExportOptionsPreview.prototype.getInfo = function () {
        var variableInfo = this._getVariableInfo();
        return variableInfo.concat(docxExportOptionsSerializationInfoPreview);
    };
    DocxExportOptionsPreview.prototype._getVariableInfo = function () {
        return [metadata_1.docxExportMode];
    };
    return DocxExportOptionsPreview;
}(docxExportOptions_1.DocxExportOptions));
exports.DocxExportOptionsPreview = DocxExportOptionsPreview;
var DocxExportOptionsMergedPreview = (function (_super) {
    __extends(DocxExportOptionsMergedPreview, _super);
    function DocxExportOptionsMergedPreview(model, serializer) {
        var _this = _super.call(this, model, serializer) || this;
        _this.docxExportMode(metadata_2.excludeModesForMergedDocuments(_this.docxExportMode())());
        return _this;
    }
    DocxExportOptionsMergedPreview.prototype._getVariableInfo = function () {
        return [metadata_2.docxExportModeMergedPreview];
    };
    DocxExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
        return _super.prototype.isPropertyDisabled.call(this, name) || name === metadata_2.docxExportModeMergedPreview.propertyName;
    };
    return DocxExportOptionsMergedPreview;
}(DocxExportOptionsPreview));
exports.DocxExportOptionsMergedPreview = DocxExportOptionsMergedPreview;
