﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\csvExportOptionsPreview.js)
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
var csvExportOptions_1 = require("../../common/exportOptions/csvExportOptions");
var metadata_1 = require("../../common/exportOptions/metadata");
var CsvExportOptionsPreview = (function (_super) {
    __extends(CsvExportOptionsPreview, _super);
    function CsvExportOptionsPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CsvExportOptionsPreview.from = function (model, serializer) {
        return new CsvExportOptionsPreview(model || {}, serializer);
    };
    CsvExportOptionsPreview.prototype.isPropertyVisible = function (name) {
        return name !== metadata_1.useCustomSeparator.propertyName;
    };
    CsvExportOptionsPreview.prototype.isPropertyDisabled = function (name) {
        return false;
    };
    return CsvExportOptionsPreview;
}(csvExportOptions_1.CsvExportOptions));
exports.CsvExportOptionsPreview = CsvExportOptionsPreview;
