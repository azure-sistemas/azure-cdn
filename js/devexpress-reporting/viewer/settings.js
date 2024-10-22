﻿/**
* DevExpress HTML/JS Reporting (viewer\settings.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
exports.EditablePreviewEnabled = ko.observable(true);
exports.SearchAvailable = ko.observable(true);
exports.ReportServerInvokeUri = '/RSWebDocumentViewerApi/Invoke';
exports.ReportServerExportUri = '/RSWebDocumentViewerApi/Download';
exports.AsyncExportApproach = analytics_internal_1.createGlobalModuleVariableFunc(false);
exports.MessageHandler = analytics_internal_1.createGlobalModuleVariableFunc({
    processError: function (message, showForUser, prefix) {
        if (prefix === void 0) { prefix = ''; }
        showForUser && analytics_internal_1.ShowMessage(message.substr(prefix.length));
        analytics_internal_1.NotifyAboutWarning(message, false);
    },
    processMessage: function (message, showForUser) { showForUser && analytics_internal_1.ShowMessage(message, analytics_internal_1.NotifyType.success, 10000); },
    processWarning: function (message, showForUser) { showForUser && analytics_internal_1.ShowMessage(message); }
});
exports.HandlerUri = analytics_internal_1.createGlobalModuleVariableFunc('DXXRDV.axd');
exports.previewDefaultResolution = analytics_internal_1.createGlobalModuleVariableFunc(96);
exports.ReportServerDownloadUri = analytics_internal_1.createGlobalModuleVariableFunc('');
exports.PollingDelay = analytics_internal_1.createGlobalModuleVariableFunc(300);
exports.TimeOut = analytics_internal_1.createGlobalModuleVariableFunc(105000);
