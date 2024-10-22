﻿/**
* DevExpress HTML/JS Reporting (designer\services\reportStorageWeb.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xrReport_1 = require("../controls/xrReport");
var _utils_1 = require("../internal/_utils");
var _settings_1 = require("../internal/_settings");
var settings_1 = require("../utils/settings");
var types_1 = require("../../common/types");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var $ = require("jquery");
var ReportStorageWeb = (function () {
    function ReportStorageWeb() {
    }
    ReportStorageWeb.getErrorMessageHandler = function (defaultErrorMessage) {
        return function (message, jqXHR, textStatus) {
            var error = analytics_internal_1.getErrorMessage(jqXHR);
            analytics_internal_1.NotifyAboutWarning(error || defaultErrorMessage || message || 'Internal Server Error', true);
        };
    };
    ReportStorageWeb.getReportByUrl = function (url) {
        var $deferred = $.Deferred();
        ReportStorageWeb.getData(url).done(function (result) {
            if (result) {
                var model = new xrReport_1.ReportViewModel(JSON.parse(result.reportLayout));
                _utils_1.updateDataSourceRefs(model, result.dataSourceRefInfo);
                $deferred.resolve(model);
            }
            else {
                $deferred.reject();
            }
        }).fail(function () { return $deferred.reject(); });
        return $deferred.promise();
    };
    ReportStorageWeb.getData = function (url) {
        if (_settings_1.reportStorageWebIsRegister()) {
            return analytics_internal_1.ajax(settings_1.HandlerUri(), 'getData', encodeURIComponent(JSON.stringify({
                reportUrl: url
            })), ReportStorageWeb.getErrorMessageHandler());
        }
        else {
            return $.Deferred().promise();
        }
    };
    ReportStorageWeb.setData = function (layout, url) {
        if (_settings_1.reportStorageWebIsRegister()) {
            return analytics_internal_1.ajax(settings_1.HandlerUri(), 'setData', encodeURIComponent(JSON.stringify({
                reportLayout: JSON.stringify({
                    'XtraReportsLayoutSerializer': layout
                }),
                reportUrl: url
            })), ReportStorageWeb.getErrorMessageHandler(analytics_utils_1.getLocalization('Cannot save the report.', 'ASPxReportsStringId.ReportDesigner_SaveReport_Error')));
        }
        else {
            return $.Deferred().promise();
        }
    };
    ReportStorageWeb.setNewData = function (layout, url) {
        if (_settings_1.reportStorageWebIsRegister()) {
            return analytics_internal_1.ajax(settings_1.HandlerUri(), 'setNewData', encodeURIComponent(JSON.stringify({
                reportLayout: JSON.stringify({
                    'XtraReportsLayoutSerializer': layout
                }),
                reportUrl: url
            })), ReportStorageWeb.getErrorMessageHandler(analytics_utils_1.getLocalization('Cannot save the report.', 'ASPxReportsStringId.ReportDesigner_SaveReport_Error')));
        }
        else {
            return $.Deferred().promise();
        }
    };
    ReportStorageWeb.getUrls = function (subreports) {
        if (_settings_1.reportStorageWebIsRegister()) {
            return analytics_internal_1.ajax(settings_1.HandlerUri(), 'getUrls', encodeURIComponent('true'));
        }
        else {
            return $.Deferred().resolve(types_1.convertMapToKeyValuePair(subreports)).promise();
        }
    };
    return ReportStorageWeb;
}());
exports.ReportStorageWeb = ReportStorageWeb;
