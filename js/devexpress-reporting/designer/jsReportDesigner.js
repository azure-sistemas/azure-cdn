﻿/**
* DevExpress HTML/JS Reporting (designer\jsReportDesigner.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = require("./utils/settings");
var groups_1 = require("./widgets/groups");
var reportStorageWeb_1 = require("./services/reportStorageWeb");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var parameterSettings_1 = require("./dataObjects/parameters/parameterSettings");
var JSReportDesigner = (function () {
    function JSReportDesigner(_designerModel) {
        this._designerModel = _designerModel;
    }
    Object.defineProperty(JSReportDesigner.prototype, "designerModel", {
        get: function () {
            return this._designerModel();
        },
        set: function (newVal) {
            this._designerModel(newVal);
        },
        enumerable: true,
        configurable: true
    });
    JSReportDesigner.prototype.UpdateLocalization = function (localization) {
        analytics_utils_1.updateLocalization(localization);
    };
    JSReportDesigner.prototype.GetDesignerModel = function () {
        return this.designerModel;
    };
    JSReportDesigner.prototype.GetPreviewModel = function () {
        return this.designerModel.reportPreviewModel;
    };
    JSReportDesigner.prototype.GetPropertyInfo = function (controlType, path) {
        return settings_1.controlsFactory().getPropertyInfo(controlType, path);
    };
    JSReportDesigner.prototype.GetButtonStorage = function () {
        return this.designerModel.actionStorage;
    };
    JSReportDesigner.prototype.RunWizard = function (wizardType) {
        this.designerModel._wizardRunner.run(wizardType);
    };
    JSReportDesigner.prototype.GetJsonReportModel = function () {
        return this.designerModel.model().serialize();
    };
    JSReportDesigner.prototype.IsModified = function () {
        return this.designerModel && this.designerModel.isDirty();
    };
    JSReportDesigner.prototype.ResetIsModified = function () {
        if (this.designerModel) {
            this.designerModel.isDirty(false);
            this.designerModel.undoEngine && this.designerModel.undoEngine().clearHistory();
        }
    };
    JSReportDesigner.prototype.AddToPropertyGrid = function (groupName, property) {
        var group = groups_1.groups[groupName];
        if (group) {
            group.info.push(property);
        }
        else {
            groups_1.groups[groupName] = { info: [property] };
        }
    };
    JSReportDesigner.prototype.AddParameterType = function (parameterInfo, editorInfo) {
        parameterSettings_1.parameterTypeValues.push(parameterInfo);
        analytics_internal_1.editorTypeMapper[parameterInfo.value] = editorInfo;
    };
    JSReportDesigner.prototype.RemoveParameterType = function (parameterType) {
        var position = parameterSettings_1.parameterTypeValues.indexOf(this.GetParameterInfo(parameterType));
        if (position !== -1) {
            parameterSettings_1.parameterTypeValues.splice(position, 1);
        }
    };
    JSReportDesigner.prototype.GetParameterInfo = function (parameterType) {
        return parameterSettings_1.parameterTypeValues.filter(function (val) { return val.value === parameterType; })[0];
    };
    JSReportDesigner.prototype.GetParameterEditor = function (valueType) {
        return analytics_internal_1.editorTypeMapper[valueType];
    };
    JSReportDesigner.prototype.ReportStorageGetData = function (url) {
        return reportStorageWeb_1.ReportStorageWeb.getData(url);
    };
    JSReportDesigner.prototype.ReportStorageSetData = function (reportLayout, url) {
        return reportStorageWeb_1.ReportStorageWeb.setData(reportLayout, url);
    };
    JSReportDesigner.prototype.ReportStorageSetNewData = function (reportLayout, url) {
        return reportStorageWeb_1.ReportStorageWeb.setNewData(reportLayout, url);
    };
    JSReportDesigner.prototype.SaveReport = function () {
        var navigateByReports = this.designerModel.navigateByReports;
        return this.ReportStorageSetData(navigateByReports.currentTab().context().report.serialize(), navigateByReports.currentTab().context().url());
    };
    JSReportDesigner.prototype.GetTabs = function () {
        return this.designerModel.getTabs();
    };
    JSReportDesigner.prototype.GetCurrentTab = function () {
        return this.designerModel.navigateByReports.currentTab();
    };
    JSReportDesigner.prototype.CloseTab = function (tab, force) {
        if (force === void 0) { force = false; }
        this.designerModel.closeTab(tab, force);
    };
    JSReportDesigner.prototype.CloseCurrentTab = function () {
        this.designerModel.navigateByReports.removeTab(this.designerModel.navigateByReports.currentTab());
    };
    JSReportDesigner.prototype.AdjustControlCore = function () {
        this.designerModel && this.designerModel.updateSurfaceSize();
    };
    JSReportDesigner.prototype.SaveNewReport = function (reportName) {
        var navigateByReports = this.designerModel.navigateByReports;
        return this.ReportStorageSetNewData(navigateByReports.currentTab().context().report.serialize(), reportName);
    };
    JSReportDesigner.prototype.ReportStorageGetUrls = function () {
        return reportStorageWeb_1.ReportStorageWeb.getUrls();
    };
    JSReportDesigner.prototype.OpenReport = function (url) {
        this.designerModel.openReport(url);
    };
    JSReportDesigner.prototype.ShowPreview = function () {
        this.designerModel.showPreview();
    };
    return JSReportDesigner;
}());
exports.JSReportDesigner = JSReportDesigner;
