﻿/**
* DevExpress HTML/JS Reporting (designer\tools\smartTags\expressionSmartTag.js)
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
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var reportExpressionEditorWrapper_1 = require("../../widgets/expressioneditor/reportExpressionEditorWrapper");
var ExpressionSmartTag = (function (_super) {
    __extends(ExpressionSmartTag, _super);
    function ExpressionSmartTag(reportElement) {
        var _this = _super.call(this) || this;
        _this.reportElement = reportElement;
        _this.templateName = 'dxrd-smart-tag-exressions';
        _this.imageTemplateName = 'dxrd-svg-properties-propertyexpression';
        _this.expressionEditor = ko.observable();
        return _this;
    }
    ExpressionSmartTag.prototype.onClick = function () {
        this.expressionEditor() && this.expressionEditor().dispose();
        this.expressionEditor(new reportExpressionEditorWrapper_1.ReportExpressionEditorWrapper(ko.observable(this.reportElement), ko.observable(null)));
        this.expressionEditor().popupVisible(true);
    };
    return ExpressionSmartTag;
}(analytics_utils_1.Disposable));
exports.ExpressionSmartTag = ExpressionSmartTag;
