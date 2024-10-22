﻿/**
* DevExpress HTML/JS Reporting (viewer\binding\jsReportViewer.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var JSReportViewer = (function () {
    function JSReportViewer(_previewModel) {
        this._previewModel = _previewModel;
    }
    Object.defineProperty(JSReportViewer.prototype, "previewModel", {
        get: function () {
            return this._previewModel();
        },
        set: function (newVal) {
            this._previewModel(newVal);
        },
        enumerable: true,
        configurable: true
    });
    JSReportViewer.prototype.previewExists = function () {
        return this.previewModel && this.previewModel.reportPreview;
    };
    JSReportViewer.prototype.GetReportPreview = function () {
        return this.previewExists();
    };
    JSReportViewer.prototype.GetPreviewModel = function () {
        return this.previewModel;
    };
    JSReportViewer.prototype.GetParametersModel = function () {
        return this.previewModel && this.previewModel.GetParametersModel();
    };
    JSReportViewer.prototype.PerformCustomDocumentOperation = function (customData, hideMessageFromUser) {
        return this.previewExists() && this.previewModel.PerformCustomDocumentOperation(customData, hideMessageFromUser);
    };
    JSReportViewer.prototype.OpenReport = function (reportName) {
        return this.previewExists() && this.previewModel.OpenReport(reportName);
    };
    JSReportViewer.prototype.Print = function (pageIndex) {
        return this.previewExists() && this.previewModel.Print(pageIndex);
    };
    JSReportViewer.prototype.ExportTo = function (format, inlineResult) {
        this.previewExists() && this.previewModel.ExportTo(format, inlineResult);
    };
    JSReportViewer.prototype.GetCurrentPageIndex = function () {
        return this.previewExists() && this.previewModel.GetCurrentPageIndex();
    };
    JSReportViewer.prototype.GoToPage = function (pageIndex) {
        this.previewExists() && this.previewModel.GoToPage(pageIndex);
    };
    JSReportViewer.prototype.Close = function () {
        this.previewExists() && this.previewModel.Close();
    };
    JSReportViewer.prototype.ResetParameters = function () {
        this.previewModel && this.previewModel.ResetParameters();
    };
    JSReportViewer.prototype.StartBuild = function () {
        return this.previewModel && this.previewModel.StartBuild();
    };
    JSReportViewer.prototype.UpdateLocalization = function (localization) {
        analytics_utils_1.updateLocalization(localization);
    };
    JSReportViewer.prototype.AdjustControlCore = function () {
        this.previewModel && this.previewModel.updateSurfaceSize && this.previewModel.updateSurfaceSize();
    };
    return JSReportViewer;
}());
exports.JSReportViewer = JSReportViewer;
