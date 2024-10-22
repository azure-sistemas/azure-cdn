﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressioneditor\reportComplexExpressionEditor.js)
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
var reportExpressionEditorWrapper_1 = require("./reportExpressionEditorWrapper");
var reportExpressionEditor_1 = require("./reportExpressionEditor");
var ReportComplexExpressionEditor = (function (_super) {
    __extends(ReportComplexExpressionEditor, _super);
    function ReportComplexExpressionEditor(modelPropertyInfo, level, parentDisabled, textToSearch) {
        var _this = _super.call(this, modelPropertyInfo, level, parentDisabled, textToSearch) || this;
        _this.editorTemplateName = 'dxrd-reportexpression-ellipsis';
        _this.wrapper = new reportExpressionEditorWrapper_1.ReportExpressionEditorWrapper(ko.observable(), _this.value);
        _this.popupVisible = _this.wrapper.popupVisible;
        _this._disposables.push(_this.wrapper);
        return _this;
    }
    ReportComplexExpressionEditor.prototype.showPopup = function (editableObject) {
        this.wrapper.control(editableObject);
        this.popupVisible(true);
    };
    return ReportComplexExpressionEditor;
}(reportExpressionEditor_1.ReportExpressionEditor));
exports.ReportComplexExpressionEditor = ReportComplexExpressionEditor;
