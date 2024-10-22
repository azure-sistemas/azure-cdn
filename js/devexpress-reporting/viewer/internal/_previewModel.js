﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewModel.js)
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
var PreviewDisposableModel = (function (_super) {
    __extends(PreviewDisposableModel, _super);
    function PreviewDisposableModel(options) {
        var _this = _super.call(this) || this;
        _this.rootStyle = options.rootStyle;
        _this.reportPreview = options.reportPreview;
        _this.parametersModel = options.parametersModel;
        _this.exportModel = options.exportModel;
        _this.searchModel = options.searchModel;
        _this.rtl = options.rtl;
        _this._disposables.push(options.reportPreview);
        _this._disposables.push(options.parametersModel);
        _this._disposables.push(options.exportModel);
        _this._disposables.push(options.searchModel);
        return _this;
    }
    PreviewDisposableModel.prototype._addDisposable = function (object) {
        this._disposables.push(object);
    };
    PreviewDisposableModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeProperties();
    };
    PreviewDisposableModel.prototype.GetParametersModel = function () {
        return this.parametersModel;
    };
    PreviewDisposableModel.prototype.OpenReport = function (reportName) {
        this.reportPreview.openReport(reportName);
    };
    PreviewDisposableModel.prototype.Print = function (pageIndex) {
        this.reportPreview.printDocument(pageIndex);
    };
    PreviewDisposableModel.prototype.ExportTo = function (format, inlineResult) {
        if (!this.reportPreview.exportDisabled()) {
            this.reportPreview.exportDocumentTo(format || 'pdf', inlineResult);
        }
    };
    PreviewDisposableModel.prototype.GetCurrentPageIndex = function () {
        return this.reportPreview.pageIndex();
    };
    PreviewDisposableModel.prototype.GoToPage = function (pageIndex) {
        this.reportPreview.goToPage(pageIndex);
    };
    PreviewDisposableModel.prototype.Close = function () {
        this.reportPreview.deactivate();
    };
    PreviewDisposableModel.prototype.ResetParameters = function () {
        this.parametersModel && this.parametersModel.restore();
    };
    PreviewDisposableModel.prototype.StartBuild = function () {
        this.parametersModel && this.parametersModel.submit();
    };
    PreviewDisposableModel.prototype.PerformCustomDocumentOperation = function (customData, hideMessageFromUser) {
        return this.reportPreview.customDocumentOperation(customData, hideMessageFromUser);
    };
    return PreviewDisposableModel;
}(analytics_utils_1.Disposable));
exports.PreviewDisposableModel = PreviewDisposableModel;
var PreviewModel = (function (_super) {
    __extends(PreviewModel, _super);
    function PreviewModel(options) {
        var _this = _super.call(this, options) || this;
        _this.documentMapModel = options.documentMapModel;
        _this.tabPanel = options.tabPanel;
        _this.actionLists = options.actionLists;
        _this.accessibilityCompliant = options.accessibilityCompliant;
        _this._disposables.push(options.documentMapModel);
        _this._disposables.push(options.tabPanel);
        _this._disposables.push(options.actionLists);
        return _this;
    }
    return PreviewModel;
}(PreviewDisposableModel));
exports.PreviewModel = PreviewModel;
