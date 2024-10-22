﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportScriptService.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = require("../utils/settings");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var $ = require("jquery");
var ReportScriptService = (function () {
    function ReportScriptService() {
    }
    ReportScriptService.validateScripts = function (report) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'validateScripts', encodeURIComponent(JSON.stringify({
            report: JSON.stringify({
                'XtraReportsLayoutSerializer': report.serialize()
            })
        })));
    };
    ReportScriptService.getCompletions = function (editor, session, pos, prefix, callback, report, editorInstance, guid) {
        if (guid) {
            return analytics_internal_1.ajax(settings_1.HandlerUri(), 'getCompletions', encodeURIComponent(JSON.stringify({
                Line: pos.row,
                Column: pos.column,
                Guid: guid,
                Script: editorInstance.getValue()
            })));
        }
        else {
            return $.Deferred().resolve().promise();
        }
    };
    ReportScriptService.setCodeDom = function (key, reportLayout) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'setReportLayout', encodeURIComponent(JSON.stringify({
            ReportLayout: reportLayout,
            Key: key
        })));
    };
    return ReportScriptService;
}());
exports.ReportScriptService = ReportScriptService;
