﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\htmlExportOptionsPreview.js)
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
var htmlMetaData_1 = require("../../common/exportOptions/htmlMetaData");
var htmlExportOptions_1 = require("../../common/exportOptions/htmlExportOptions");
var metadata_1 = require("./metadata");
var htmlExportOptionsSerializationInfoPreview = [].concat(htmlMetaData_1.htmlExportOptionsSerializationInfoBase);
var HtmlExportOptionsPreview = (function (_super) {
    __extends(HtmlExportOptionsPreview, _super);
    function HtmlExportOptionsPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HtmlExportOptionsPreview.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, value.getInfo(), refs);
    };
    HtmlExportOptionsPreview.prototype.getInfo = function () {
        var variableInfo = this._getVariableInfo();
        return variableInfo.concat(htmlExportOptionsSerializationInfoPreview);
    };
    HtmlExportOptionsPreview.prototype._getVariableInfo = function () {
        return [metadata_1.htmlExportModePreview];
    };
    return HtmlExportOptionsPreview;
}(htmlExportOptions_1.HtmlExportOptions));
exports.HtmlExportOptionsPreview = HtmlExportOptionsPreview;
var HtmlExportOptionsMergedPreview = (function (_super) {
    __extends(HtmlExportOptionsMergedPreview, _super);
    function HtmlExportOptionsMergedPreview(model, serializer) {
        var _this = _super.call(this, model, serializer) || this;
        _this.htmlExportMode(metadata_1.excludeModesForMergedDocuments(_this.htmlExportMode())());
        return _this;
    }
    HtmlExportOptionsMergedPreview.prototype._getVariableInfo = function () {
        return [metadata_1.htmlExportModeMergedPreview];
    };
    HtmlExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
        return _super.prototype.isPropertyDisabled.call(this, name) || name === metadata_1.htmlExportModeMergedPreview.propertyName;
    };
    return HtmlExportOptionsMergedPreview;
}(HtmlExportOptionsPreview));
exports.HtmlExportOptionsMergedPreview = HtmlExportOptionsMergedPreview;
