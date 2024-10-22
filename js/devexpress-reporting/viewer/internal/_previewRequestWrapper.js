﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewRequestWrapper.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = require("../settings");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ColumnSortOrder;
(function (ColumnSortOrder) {
    ColumnSortOrder[ColumnSortOrder["None"] = 0] = "None";
    ColumnSortOrder[ColumnSortOrder["Ascending"] = 1] = "Ascending";
    ColumnSortOrder[ColumnSortOrder["Descending"] = 2] = "Descending";
})(ColumnSortOrder = exports.ColumnSortOrder || (exports.ColumnSortOrder = {}));
var PreviewRequestWrapper = (function () {
    function PreviewRequestWrapper(handlers, _callbacks) {
        var _this = this;
        this._callbacks = _callbacks;
        Object.keys(handlers || {}).forEach(function (name) {
            _this[name] = handlers[name];
        });
    }
    PreviewRequestWrapper.getProcessErrorCallback = function (reportPreview, defaultErrorMessage, showMessage) {
        if (showMessage === void 0) { showMessage = true; }
        return function (message, jqXHR, textStatus) {
            if (jqXHR) {
                var statusCodeText = analytics_utils_1.getLocalization(jqXHR.statusText, 'ASPxReportsStringId.HttpResponseStatusCode_' + jqXHR.status);
                if (defaultErrorMessage) {
                    var stringFormat = analytics_utils_1.getLocalization('{0} ({1} {2})', 'ASPxReportsStringId.Error_WithStatus');
                    var messageWithStatusCode = analytics_internal_1.formatUnicorn(stringFormat, defaultErrorMessage, jqXHR.status, statusCodeText);
                }
                else {
                    messageWithStatusCode = statusCodeText;
                }
            }
            if (!reportPreview) {
                var error = analytics_internal_1.getErrorMessage(jqXHR);
                settings_1.MessageHandler().processError(error || messageWithStatusCode || defaultErrorMessage || 'Internal Server Error', showMessage);
            }
            else {
                reportPreview._processError(messageWithStatusCode, jqXHR, showMessage);
            }
        };
    };
    PreviewRequestWrapper.getPage = function (url, ignoreError) {
        return analytics_internal_1.ajax(url, undefined, undefined, PreviewRequestWrapper.getProcessErrorCallback(), ignoreError, { type: 'GET' });
    };
    PreviewRequestWrapper.prototype.initialize = function (reportPreview, parametersModel, searchModel) {
        this._reportPreview = reportPreview;
        this._parametersModel = parametersModel;
        this._searchModel = searchModel;
    };
    PreviewRequestWrapper.prototype.findTextRequest = function (text, ignore) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'findText', encodeURIComponent(JSON.stringify({
            text: text,
            documentId: this._reportPreview.documentId,
            matchCase: this._searchModel.matchCase(),
            wholeWord: this._searchModel.matchWholeWord(),
            searchUp: this._searchModel.searchUp()
        })), PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, analytics_utils_1.getLocalization('An error occurred during search', 'ASPxReportsStringId.WebDocumentViewer_SearchError')), ignore);
    };
    PreviewRequestWrapper.prototype.stopBuild = function (id) {
        analytics_internal_1.ajax(settings_1.HandlerUri(), 'stopBuild', encodeURIComponent(id), undefined, function () { return true; });
    };
    PreviewRequestWrapper.prototype.sendCloseRequest = function (documentId, reportId) {
        analytics_internal_1.ajax(settings_1.HandlerUri(), 'close', encodeURIComponent(JSON.stringify({
            reportId: reportId,
            documentId: documentId
        })), undefined, function () { return true; });
    };
    PreviewRequestWrapper.prototype.startBuildRequest = function (shouldIgnoreError) {
        var parameters = this._parametersModel.serializeParameters();
        this._callbacks && this._callbacks.parametersSubmitted && this._callbacks.parametersSubmitted(this._parametersModel, parameters);
        return analytics_internal_1.ajax({
            uri: settings_1.HandlerUri(),
            action: 'startBuild',
            arg: encodeURIComponent(JSON.stringify({
                reportId: this._reportPreview.reportId,
                reportUrl: this._reportPreview.reportUrl,
                drillDownKeys: this._reportPreview['_drillDownState'],
                sortingState: this._reportPreview['_sortingState'],
                timeZoneOffset: 0 - new Date().getTimezoneOffset(),
                parameters: parameters
            })),
            ignoreError: shouldIgnoreError,
            isError: function (data) { return !!data.error || !!(data.result && data.result.faultMessage); },
            processErrorCallback: PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, analytics_utils_1.getLocalization('Cannot create a document for the current report', 'ASPxReportsStringId.WebDocumentViewer_DocumentCreationError'))
        });
    };
    PreviewRequestWrapper.prototype.getBuildStatusRequest = function (documentId, shouldIgnoreError) {
        return analytics_internal_1.ajax({
            uri: settings_1.HandlerUri(),
            action: 'getBuildStatus',
            arg: encodeURIComponent(JSON.stringify({
                documentId: documentId,
                timeOut: Math.max(5000, settings_1.TimeOut())
            })),
            processErrorCallback: PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, analytics_utils_1.getLocalization('Error obtaining a build status', 'ASPxReportsStringId.WebDocumentViewer_GetBuildStatusError')),
            ignoreError: shouldIgnoreError,
            isError: function (data) { return !!data.error || !!(data.result && data.result.faultMessage) || !data.success; },
            getErrorMessage: this._reportPreview._getErrorMessage
        });
    };
    PreviewRequestWrapper.prototype.getDocumentData = function (documentId, shouldIgnoreError) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'getDocumentData', encodeURIComponent(documentId), PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, analytics_utils_1.getLocalization('Cannot obtain additional document data for the current document', 'ASPxReportsStringId.WebDocumentViewer_GetDocumentDataError')), shouldIgnoreError);
    };
    PreviewRequestWrapper.prototype.customDocumentOperation = function (documentId, serializedExportOptions, editindFields, customData, hideMessageFromUser) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'documentOperation', encodeURIComponent(JSON.stringify({
            documentId: documentId,
            customData: customData,
            exportOptions: serializedExportOptions,
            editingFieldValues: editindFields
        })), PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, analytics_utils_1.getLocalization('The requested document operation cannot be performed.', 'ASPxReportsStringId.WebDocumentViewer_CustomDocumentOperationsDenied_Error'), !hideMessageFromUser));
    };
    PreviewRequestWrapper.prototype.openReport = function (reportName) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'openReport', encodeURIComponent(reportName), PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, analytics_utils_1.getLocalization('Could not open report', 'ASPxReportsStringId.WebDocumentViewer_OpenReportError') + " '" + reportName + "'"));
    };
    PreviewRequestWrapper.prototype.drillThrough = function (customData) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'drillThrough', encodeURIComponent(JSON.stringify({
            reportId: this._reportPreview.reportId,
            reportUrl: this._reportPreview.reportUrl,
            documentId: this._reportPreview.documentId,
            parameters: this._parametersModel.serializeParameters(),
            editingFields: this._reportPreview.editingFieldsProvider().map(function (field) { return field.model(); }),
            customData: customData
        })), PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, analytics_utils_1.getLocalization('Drill through operation failed', 'ASPxReportsStringId.WebDocumentViewer_DrillThroughError')));
    };
    PreviewRequestWrapper.prototype.getStartExportOperation = function (arg) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'startExport', arg, PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, analytics_utils_1.getLocalization('An error occurred during the export', 'ASPxReportsStringId.WebDocumentViewer_ExportError')));
    };
    PreviewRequestWrapper.prototype.getExportStatusRequest = function (operationId) {
        return analytics_internal_1.ajax({
            uri: settings_1.HandlerUri(),
            action: 'getExportStatus',
            arg: encodeURIComponent(JSON.stringify({
                id: operationId,
                timeOut: Math.max(5000, settings_1.TimeOut())
            })),
            processErrorCallback: PreviewRequestWrapper.getProcessErrorCallback(this._reportPreview, analytics_utils_1.getLocalization('Error obtaining an export status', 'ASPxReportsStringId.WebDocumentViewer_GetExportStatusError')),
            isError: function (data) { return !!data.error || !!(data.result && data.result.faultMessage) || !data.success; },
            getErrorMessage: this._reportPreview._getErrorMessage
        });
    };
    PreviewRequestWrapper.prototype.getEditingFieldHtml = function (value, editingFieldIndex) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'getEditingFieldHtmlValue', encodeURIComponent(JSON.stringify({
            documentId: this._reportPreview.documentId,
            value: value,
            editingFieldIndex: editingFieldIndex
        })));
    };
    return PreviewRequestWrapper;
}());
exports.PreviewRequestWrapper = PreviewRequestWrapper;
