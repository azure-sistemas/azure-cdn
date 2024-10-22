﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\rtfExportOptionsPreview.js)
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
var rtfMetaData_1 = require("../../common/exportOptions/rtfMetaData");
var rtfExportOptions_1 = require("../../common/exportOptions/rtfExportOptions");
var metadata_1 = require("../../common/exportOptions/metadata");
var metadata_2 = require("./metadata");
var rtfExportOptionsSerializationInfoPreview = [].concat(rtfMetaData_1.rtfExportOptionsSerializationInfoBase);
var RtfExportOptionsPreview = (function (_super) {
    __extends(RtfExportOptionsPreview, _super);
    function RtfExportOptionsPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RtfExportOptionsPreview.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, value.getInfo(), refs);
    };
    RtfExportOptionsPreview.prototype.getInfo = function () {
        var variableInfo = this._getVariableInfo();
        return variableInfo.concat(rtfExportOptionsSerializationInfoPreview);
    };
    RtfExportOptionsPreview.prototype._getVariableInfo = function () {
        return [metadata_1.rtfExportMode];
    };
    return RtfExportOptionsPreview;
}(rtfExportOptions_1.RtfExportOptions));
exports.RtfExportOptionsPreview = RtfExportOptionsPreview;
var RtfExportOptionsMergedPreview = (function (_super) {
    __extends(RtfExportOptionsMergedPreview, _super);
    function RtfExportOptionsMergedPreview(model, serializer) {
        var _this = _super.call(this, model, serializer) || this;
        _this.rtfExportMode(metadata_2.excludeModesForMergedDocuments(_this.rtfExportMode())());
        return _this;
    }
    RtfExportOptionsMergedPreview.prototype._getVariableInfo = function () {
        return [metadata_2.rtfExportModeMergedPreview];
    };
    RtfExportOptionsMergedPreview.prototype.isPropertyDisabled = function (name) {
        return _super.prototype.isPropertyDisabled.call(this, name) || name === metadata_2.rtfExportModeMergedPreview.propertyName;
    };
    return RtfExportOptionsMergedPreview;
}(RtfExportOptionsPreview));
exports.RtfExportOptionsMergedPreview = RtfExportOptionsMergedPreview;
