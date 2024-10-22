﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressioneditor\reportExpressionEditor.js)
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
var ko = require("knockout");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var reportExpressionEditorAdapter_1 = require("./reportExpressionEditorAdapter");
var ReportExpressionEditor = (function (_super) {
    __extends(ReportExpressionEditor, _super);
    function ReportExpressionEditor(modelPropertyInfo, level, parentDisabled, textToSearch) {
        var _this = _super.call(this, modelPropertyInfo, level, parentDisabled, textToSearch) || this;
        _this.popupVisible = ko.observable(false);
        return _this;
    }
    ReportExpressionEditor.prototype.patchOptions = function (reportExplorerProvider, editableObject) {
        if (!this._adapter) {
            this._adapter = new reportExpressionEditorAdapter_1.ReportExpressionEditorAdapter(this.values, this.value);
            this._disposables.push(this._adapter);
        }
        return this._adapter.patchOptions(reportExplorerProvider, editableObject);
    };
    return ReportExpressionEditor;
}(analytics_widgets_1.Editor));
exports.ReportExpressionEditor = ReportExpressionEditor;
