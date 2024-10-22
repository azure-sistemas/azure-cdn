﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\mhtExportOptionsPreview.js)
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
var mhtMetaData_1 = require("../../common/exportOptions/mhtMetaData");
var mhtExportOptions_1 = require("../../common/exportOptions/mhtExportOptions");
var metadata_1 = require("./metadata");
var mhtExportOptionsSerializationInfoPreview = [].concat(mhtMetaData_1.mhtExportOptionsSerializationInfoBase);
var MhtExportOptionsPreview = (function (_super) {
    __extends(MhtExportOptionsPreview, _super);
    function MhtExportOptionsPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MhtExportOptionsPreview.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, value.getInfo(), refs);
    };
    MhtExportOptionsPreview.prototype.getInfo = function () {
        var variableInfo = this._getVariableInfo();
        return variableInfo.concat(mhtExportOptionsSerializationInfoPreview);
    };
    MhtExportOptionsPreview.prototype._getVariableInfo = function () {
        return [metadata_1.htmlExportModePreview];
    };
    return MhtExportOptionsPreview;
}(mhtExportOptions_1.MhtExportOptions));
exports.MhtExportOptionsPreview = MhtExportOptionsPreview;
var MhtExportOptionsMergedPreview = (function (_super) {
    __extends(MhtExportOptionsMergedPreview, _super);
    function MhtExportOptionsMergedPreview(model, serializer) {
        var _this = _super.call(this, model, serializer) || this;
        _this.htmlExportMode(metadata_1.excludeModesForMergedDocuments(_this.htmlExportMode())());
        return _this;
    }
    MhtExportOptionsMergedPreview.prototype._getVariableInfo = function () {
        return [metadata_1.htmlExportModeMergedPreview];
    };
    MhtExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
        return _super.prototype.isPropertyDisabled.call(this, name) || name === metadata_1.htmlExportModeMergedPreview.propertyName;
    };
    return MhtExportOptionsMergedPreview;
}(MhtExportOptionsPreview));
exports.MhtExportOptionsMergedPreview = MhtExportOptionsMergedPreview;
