﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_crossTabRequestModel.js)
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
var _previewRequestWrapper_1 = require("../../../viewer/internal/_previewRequestWrapper");
var reportWizardState_1 = require("../reportWizardState");
var CrossTabFieldInfoBase = (function () {
    function CrossTabFieldInfoBase(info) {
        this.__type = '';
        this.FieldName = info.name;
        this.DisplayText = info.displayName;
    }
    return CrossTabFieldInfoBase;
}());
exports.CrossTabFieldInfoBase = CrossTabFieldInfoBase;
var CrossTabGroupFieldInfo = (function (_super) {
    __extends(CrossTabGroupFieldInfo, _super);
    function CrossTabGroupFieldInfo(info) {
        var _this = _super.call(this, info) || this;
        _this.SortOrder = _previewRequestWrapper_1.ColumnSortOrder[info.sortOrder] || _previewRequestWrapper_1.ColumnSortOrder.Ascending;
        return _this;
    }
    return CrossTabGroupFieldInfo;
}(CrossTabFieldInfoBase));
exports.CrossTabGroupFieldInfo = CrossTabGroupFieldInfo;
var CrossTabColumnFieldInfo = (function (_super) {
    __extends(CrossTabColumnFieldInfo, _super);
    function CrossTabColumnFieldInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__type = 'CrossTabColumnFieldInfo:#DevExpress.XtraReports.Wizards.CrossTab';
        return _this;
    }
    return CrossTabColumnFieldInfo;
}(CrossTabGroupFieldInfo));
exports.CrossTabColumnFieldInfo = CrossTabColumnFieldInfo;
var CrossTabRowFieldInfo = (function (_super) {
    __extends(CrossTabRowFieldInfo, _super);
    function CrossTabRowFieldInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__type = 'CrossTabRowFieldInfo:#DevExpress.XtraReports.Wizards.CrossTab';
        return _this;
    }
    return CrossTabRowFieldInfo;
}(CrossTabGroupFieldInfo));
exports.CrossTabRowFieldInfo = CrossTabRowFieldInfo;
var CrossTabDataFieldInfo = (function (_super) {
    __extends(CrossTabDataFieldInfo, _super);
    function CrossTabDataFieldInfo(info) {
        var _this = _super.call(this, info) || this;
        _this.__type = 'CrossTabDataFieldInfo:#DevExpress.XtraReports.Wizards.CrossTab';
        _this.SummaryType = reportWizardState_1.PivotSummaryType[info.summaryType] || reportWizardState_1.PivotSummaryType.Sum;
        return _this;
    }
    return CrossTabDataFieldInfo;
}(CrossTabFieldInfoBase));
exports.CrossTabDataFieldInfo = CrossTabDataFieldInfo;
