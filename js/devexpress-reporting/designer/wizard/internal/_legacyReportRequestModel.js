﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_legacyReportRequestModel.js)
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
var _commonRequestModel_1 = require("./_commonRequestModel");
var paperKind_1 = require("../../utils/paperKind");
var reportWizardState_1 = require("../reportWizardState");
var LegacyReportRequestModel = (function (_super) {
    __extends(LegacyReportRequestModel, _super);
    function LegacyReportRequestModel(state) {
        var _this = _super.call(this, state) || this;
        if (state.reportType === reportWizardState_1.ReportType.Databound) {
            _this.AdjustFieldWidth = state.fitFieldsToPage;
            if (state.fields.length) {
                _this.Columns = state.fields.map(function (value) { return value.name; });
                _this.ColumnInfo = state.fields.map(function (value) {
                    return {
                        Name: value.name,
                        DisplayName: value.displayName,
                        TypeSpecifics: 0
                    };
                });
            }
            else {
                _this.Columns = null;
                _this.ColumnInfo = null;
            }
            _this.DataSourceName = null;
            _this.GroupingLevels = state.groups;
            _this.Layout = state.layout;
            _this.Portrait = state.portrait;
            _this.ReportStyleId = state.style;
            _this.SummaryOptions = (state.summaryOptions || []).map(function (item) {
                return {
                    ColumnName: item.columnName,
                    Flags: item.flags
                };
            });
            if (state.pageSetup) {
                _this.PaperKind = paperKind_1.PaperKind[state.pageSetup.paperKind];
                _this.PaperSize = {
                    width: state.pageSetup.width,
                    height: state.pageSetup.height
                };
                _this.Margins = {
                    Left: state.pageSetup.marginLeft,
                    Right: state.pageSetup.marginRight,
                    Top: state.pageSetup.marginTop,
                    Bottom: state.pageSetup.marginBottom
                };
                _this.Unit = state.pageSetup.unit;
            }
        }
        return _this;
    }
    return LegacyReportRequestModel;
}(_commonRequestModel_1.CommonRequestModel));
exports.LegacyReportRequestModel = LegacyReportRequestModel;
