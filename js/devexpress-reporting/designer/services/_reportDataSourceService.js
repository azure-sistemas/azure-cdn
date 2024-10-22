﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportDataSourceService.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = require("../utils/settings");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var $ = require("jquery");
var ReportDataSourceService = (function () {
    function ReportDataSourceService() {
    }
    ReportDataSourceService.fieldListCallback = function (request) {
        var requestJson = JSON.stringify(request);
        var encodedJson = encodeURIComponent(requestJson);
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'fieldList', encodedJson);
    };
    ReportDataSourceService.getCustomQueriesPreset = function (dataSource) {
        return $.Deferred().resolve([]).promise();
    };
    ReportDataSourceService.sqlDataSourceFromBase64 = function (base64) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'dataSourceFromBase64', encodeURIComponent(base64));
    };
    ReportDataSourceService.getSqlDataSourceBase64 = function (dataSource) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'getDataSourceBase64', encodeURIComponent(JSON.stringify({ sqlDataSourceJSON: JSON.stringify({ SqlDataSource: new analytics_utils_1.ModelSerializer().serialize(dataSource) }) })));
    };
    ReportDataSourceService.getJsonDataSourceBase64 = function (dataSource) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'getJsonDataSourceBase64', encodeURIComponent(JSON.stringify({ jsonDataSourceJSON: JSON.stringify({ JsonDataSource: new analytics_utils_1.ModelSerializer().serialize(dataSource) }) })));
    };
    ReportDataSourceService.getObjectDataSourceBase64 = function (json) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'getObjectDataSourceBase64', encodeURIComponent(JSON.stringify(json)));
    };
    ReportDataSourceService.editObjectDataSourceParameters = function (json, base64) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'editObjectDataSourceParameters', encodeURIComponent(JSON.stringify({ objectDataSourceModel: json, base64: base64 })));
    };
    ReportDataSourceService.objectDataSourceFromBase64 = function (base64) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'objectDataSourceFromBase64', encodeURIComponent(base64));
    };
    ReportDataSourceService.jsonDataSourceFromBase64 = function (base64) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'jsonDataSourceFromBase64', encodeURIComponent(JSON.stringify({ base64: base64 })));
    };
    return ReportDataSourceService;
}());
exports.ReportDataSourceService = ReportDataSourceService;
