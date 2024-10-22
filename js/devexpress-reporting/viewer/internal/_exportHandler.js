﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_exportHandler.js)
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
var $ = require("jquery");
var browser_1 = require("devextreme/core/utils/browser");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_internal_2 = require("@devexpress/analytics-core/analytics-internal");
var settings_1 = require("../settings");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var _utils_1 = require("./_utils");
var _utils_2 = require("../../common/utils/_utils");
var _previewRequestWrapper_1 = require("./_previewRequestWrapper");
var ExportResultRequestData = (function () {
    function ExportResultRequestData() {
        this.RequestUrl = '';
        this.FormData = {};
        this.QueryParameters = {};
    }
    return ExportResultRequestData;
}());
exports.ExportResultRequestData = ExportResultRequestData;
var ExportHandler = (function (_super) {
    __extends(ExportHandler, _super);
    function ExportHandler(exportSetting, preview) {
        var _this_1 = _super.call(this) || this;
        _this_1.preview = preview;
        _this_1.exportActionUri = ko.observable(null);
        _this_1.exportFormData = ko.observable([]);
        _this_1.reportDisplayName = ko.observable(null);
        _this_1.popupVisible = ko.observable(false);
        _this_1.popupWidth = ko.observable(510);
        _this_1.popupHeight = ko.observable(260);
        _this_1.exportingFrameName = 'dxrd-exporting-frame' + _utils_2.generateGuid();
        _this_1.popupButtons = [
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: analytics_utils_1.getLocalization('Ok', analytics_internal_1.StringId.DataAccessBtnOK), onClick: function () { return _this_1.popupVisible(false); }
                }
            }
        ];
        _this_1.printingLinkCallback = function () { };
        _this_1.printingTextPrefix = ko.observable('');
        _this_1.printingTextPostfix = ko.observable('');
        _this_1.getPopupTitle = function () { return _this_1.reportDisplayName() || ''; };
        _this_1._exportResultRequestData = new ExportResultRequestData();
        _this_1._showPrintNotificationDialog = true;
        _this_1._useSameTabExport = true;
        _this_1._useAsynchronousExport = true;
        _this_1._workerTicker = null;
        _this_1._workerFunctionBlobUrl = null;
        _this_1._workerTickerFunction = function () {
            var started, interval;
            self.onmessage = function (e) {
                if (e.data === 'stop') {
                    clearInterval(interval);
                    return;
                }
                if (started)
                    return;
                interval = setInterval(function () {
                    postMessage.apply(self, ['tick']);
                }, 10);
                started = true;
            };
        };
        _this_1._window = null;
        _this_1._timeouts = [];
        if (exportSetting) {
            if (exportSetting.useAsynchronousExport !== undefined)
                _this_1._useAsynchronousExport = exportSetting.useAsynchronousExport;
            if (exportSetting.useSameTab !== undefined)
                _this_1._useSameTabExport = exportSetting.useSameTab;
            if (exportSetting.showPrintNotificationDialog !== undefined)
                _this_1._showPrintNotificationDialog = exportSetting.showPrintNotificationDialog;
        }
        return _this_1;
    }
    ExportHandler.prototype._getUrlObject = function () {
        return window.URL || window['webkitURL'] || window['mozURL'] || window['msURL'] || window['oURL'];
    };
    ExportHandler.prototype._createWorker = function () {
        this._terminateWorker();
        var blob = new Blob(['(' + this._workerTickerFunction.toString() + ')()'], { type: 'text/javascript' });
        var _url = this._getUrlObject();
        this._workerFunctionBlobUrl = _url.createObjectURL(blob);
        this._workerTicker = new Worker(this._workerFunctionBlobUrl);
        return this._workerTicker;
    };
    ExportHandler.prototype._terminateWorker = function () {
        if (this._workerTicker) {
            this._workerTicker.terminate();
            this._workerTicker = null;
        }
        if (this._workerFunctionBlobUrl) {
            var _url = this._getUrlObject();
            _url && _url.revokeObjectURL(this._workerFunctionBlobUrl);
            this._workerFunctionBlobUrl = null;
        }
    };
    ExportHandler.prototype._callPrint = function (_window) {
        var _this_1 = this;
        var browserVersion = parseInt(browser_1.default.version);
        if (_window && (browser_1.default.chrome && 76 <= browserVersion)) {
            var worker = this._createWorker();
            var checkOnTick = function () {
                try {
                    if (_window.document && _window.document.contentType === 'application/pdf') {
                        _window.print();
                        worker.postMessage('stop');
                        _this_1._terminateWorker();
                    }
                }
                catch (ex) {
                    _this_1._terminateWorker();
                }
            };
            worker.onerror = function (e) { checkOnTick(); };
            worker.onmessage = function (e) { checkOnTick(); };
            worker.postMessage('start');
        }
    };
    ExportHandler.prototype._clearExportingFrame = function () {
        if (this._isNewBrowser()) {
            var iframe = this.exportingFrame.contentWindow;
            iframe && iframe.location.replace('about:blank');
        }
    };
    ExportHandler.prototype._initPrintingWindow = function () {
        var _this_1 = this;
        var printingTextParts = analytics_utils_1.getLocalization('If the operation fails, you can download the {0} and print it out from another application.', 'ASPxReportsStringId.WebDocumentViewer_Print_Popup_Text').split('{0}');
        this.printingTextPrefix(printingTextParts[0]);
        this.printingTextPostfix(printingTextParts[1]);
        if (this._showPrintNotificationDialog) {
            var subscription = this.popupVisible.subscribe(function (newVal) {
                if (!newVal) {
                    _this_1.printingLinkCallback = function () { };
                    _this_1._clearExportingFrame();
                    subscription.dispose();
                }
            });
            this._disposables.push(subscription);
            this.popupVisible(true);
        }
    };
    ExportHandler.prototype._setPrintingLinkCallback = function (printingLinkCallback) {
        if (this._showPrintNotificationDialog) {
            this.printingLinkCallback = printingLinkCallback;
        }
    };
    ExportHandler.prototype._formSubmit = function (_requestData, _formTarget) {
        if (this.postingForm) {
            this.postingForm.target = _formTarget;
            this.exportActionUri(_requestData.RequestUrl);
            var formData = [];
            for (var key in _requestData.FormData) {
                formData.push({ name: key, value: _requestData.FormData[key] });
            }
            this.exportFormData(formData);
            this.postingForm.submit();
        }
    };
    ExportHandler.prototype._doExportSync = function (_exportWindow, printable, useSameTab) {
        this.onExportCustomEvent && this.onExportCustomEvent(this._exportResultRequestData);
        var _requestData = this._exportResultRequestData;
        useSameTab && printable && this._initPrintingWindow();
        var formTarget = useSameTab ? this.exportingFrameName : '_blank';
        if (!printable || !this._isNewBrowser()) {
            this._useSameTabExport ? this._formSubmit(_requestData, formTarget) : this._replaceLocation(_exportWindow, _requestData);
        }
        else {
            if (!_exportWindow) {
                _exportWindow = (useSameTab && this.exportingFrame) ? this.exportingFrame.contentWindow : this._replaceLocation(null, null);
            }
            var method = this._useSameTabExport ? 'POST' : 'GET';
            this._printUsingBlob(_exportWindow, _requestData, method);
        }
    };
    ExportHandler.prototype._initExportWindow = function () {
        var message = analytics_utils_1.getLocalization('Do not close this tab to get the resulting file.', 'ASPxReportsStringId.WebDocumentViewer_AsyncExportCloseWarning');
        var div = this._window.document.createElement('div');
        div.style['text-align'] = 'center';
        div.innerText = message;
        div.style.position = 'absolute';
        div.style.left = '0';
        div.style.top = '0';
        div.style.right = '0';
        div.style.fontSize = '20px';
        this._window.document.title = analytics_utils_1.getLocalization('Exporting...', 'ASPxReportsStringId.WebDocumentViewer_AsyncExportTabTitle');
        this._window.document.body.appendChild(div);
        div = this._window.document.createElement('div');
        div.id = 'loading';
        div.style.position = 'absolute';
        div.style.left = '0';
        div.style.top = '0';
        div.style.bottom = '0';
        div.style.right = '0';
        div.style['text-align'] = 'center';
        div.style.margin = 'auto';
        div.style.height = '0';
        div.style.fontSize = '32px';
        this._window.document.body.appendChild(div);
    };
    ExportHandler.prototype._startExportAsync = function (args, useSameTabLocal, deffered, inlineResult, printable) {
        var _this_1 = this;
        if (printable === void 0) { printable = false; }
        if (useSameTabLocal) {
            this._setPrintingLinkCallback(function () { return _this_1._startExportAsync(args, false, deffered, inlineResult, printable); });
        }
        else {
            if (!this._useSameTabExport) {
                this._window = window.open();
                this._window.onunload = function () {
                    _this_1.preview.progressBar.stop();
                    _this_1._terminateWorker();
                };
                this._initExportWindow();
            }
        }
        this.preview.progressBar.text(analytics_utils_1.getLocalization('Exporting the document...', 'PreviewStringId.Msg_ExportingDocument'));
        this.preview.progressBar.cancelText(analytics_utils_1.getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel'));
        this.preview.progressBar.startProgress(function () { _this_1.preview._currentOperationId(null); });
        this.preview.requestWrapper.getStartExportOperation(args)
            .done(function (response) { _this_1.preview.previewHandlersHelper.doneStartExportHandler(deffered, inlineResult, response, useSameTabLocal, printable); })
            .fail(function (error) {
            _this_1.preview.previewHandlersHelper.errorStartExportHandler(deffered, error);
            !_this_1._useSameTabExport && error.responseJSON && error.responseJSON['error'] && _this_1._showAsyncExportError(_this_1._window, error.responseJSON['error']);
        });
    };
    ExportHandler.prototype.export = function (args, actionUri, inlineResult, printable) {
        var _this_1 = this;
        if (printable === void 0) { printable = false; }
        this._terminateWorker();
        var deffered = $.Deferred();
        var requestData = this._exportResultRequestData;
        requestData.RequestUrl = actionUri;
        if (this.preview._editingFields().length > 0 || settings_1.AsyncExportApproach() || this._useAsynchronousExport || (this.preview.exportOptionsModel() && this.preview.exportOptionsModel().hasSensitiveData())) {
            this._startExportAsync(args, this._useSameTabExport, deffered, inlineResult, printable);
        }
        else {
            deffered.resolve(true);
            if (this._useSameTabExport) {
                requestData.FormData['arg'] = args;
                requestData.FormData['actionKey'] = 'exportTo';
                this._setPrintingLinkCallback(function () { return _this_1._doExportSync(null, true, false); });
            }
            else {
                requestData.QueryParameters['arg'] = args;
                requestData.QueryParameters['actionKey'] = 'exportTo';
            }
            this._doExportSync(null, printable, this._useSameTabExport);
        }
        return deffered.promise();
    };
    ExportHandler.prototype._isNewBrowser = function () {
        var isNewChrome = browser_1.default.chrome && (parseInt(browser_1.default.version) >= 76);
        return (isNewChrome || browser_1.default.mozilla || browser_1.default['safari']);
    };
    ExportHandler.prototype._showAsyncExportError = function (window, message, status, statusText) {
        if (window) {
            var div = window.document.getElementById('loading');
            if (div) {
                if (status || statusText) {
                    var stringFormat = analytics_utils_1.getLocalization('{0} ({1} {2})', 'ASPxReportsStringId.Error_WithStatus');
                    div.innerText = analytics_internal_2.formatUnicorn(stringFormat, message, status, statusText);
                }
                else
                    div.innerText = message;
            }
        }
    };
    ExportHandler.prototype._printUsingBlob = function (_exportWindow, _requestData, _method) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var _url = _this._getUrlObject();
                var blobUrl = _url.createObjectURL(this.response);
                _exportWindow && _exportWindow.location.replace(blobUrl);
                setTimeout(function () { _url.revokeObjectURL(blobUrl); }, 1);
                _this._callPrint(_exportWindow);
            }
            else if (this.readyState == 4 && this.status >= 400) {
                var message = analytics_utils_1.getLocalization('An error occurred during the export', 'ASPxReportsStringId.WebDocumentViewer_ExportError');
                _previewRequestWrapper_1.PreviewRequestWrapper.getProcessErrorCallback(_this.preview, message, true)('', this, '');
                if (_exportWindow && _exportWindow.name != _this.exportingFrameName) {
                    _this._showAsyncExportError(_exportWindow, message, this.status, this.statusText);
                }
            }
        };
        var _exportUrl = (_method === 'GET') ? this._addQueryParamsToUri(_requestData.RequestUrl, _requestData.QueryParameters) : _requestData.RequestUrl;
        xhr.open(_method, _exportUrl);
        xhr.responseType = 'blob';
        var formData = new FormData();
        for (var key in _requestData.FormData) {
            formData.append(key, _requestData.FormData[key]);
        }
        xhr.send(formData);
    };
    ExportHandler.prototype._addQueryParamsToUri = function (_exportUri, _queryParameters) {
        var keys = Object.keys(_queryParameters || {});
        if (keys.length > 0) {
            _exportUri += '?';
            _exportUri += keys.map(function (x) { return x + '=' + _queryParameters[x]; }).join('&');
        }
        return _exportUri;
    };
    ExportHandler.prototype._replaceLocation = function (_exportWindow, _requestData) {
        if (!_requestData) {
            return _utils_1.safelyRunWindowOpen('');
        }
        var _exportUrl = this._addQueryParamsToUri(_requestData.RequestUrl, _requestData.QueryParameters);
        _exportWindow ? _exportWindow.location.replace(_exportUrl) : (_exportWindow = _utils_1.safelyRunWindowOpen(_exportUrl));
        return _exportWindow;
    };
    ExportHandler.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        (this._timeouts || []).forEach(function (tic) { return clearTimeout(tic); });
        this.removeProperties();
    };
    ExportHandler.prototype.updateExportStatus = function (progress) {
        this.preview.progressBar && this.preview.progressBar.progress(progress);
        if (this._window) {
            var div = this._window.document.getElementById('loading');
            div && (div.innerText = analytics_utils_1.getLocalization('Exporting the document...', 'PreviewStringId.Msg_ExportingDocument') + ' ' + progress + '%');
            this._window.document.title = analytics_utils_1.getLocalization('Exporting...', 'ASPxReportsStringId.WebDocumentViewer_AsyncExportTabTitle') + progress + '%';
        }
        if (progress >= 100) {
            this.preview.progressBar.complete();
        }
    };
    ExportHandler.prototype.getExportStatus = function (operationId) {
        var _this_1 = this;
        var deffered = $.Deferred();
        this._timeouts.push(setTimeout(function () {
            _this_1.preview.requestWrapper.getExportStatusRequest(operationId)
                .done(function (response) { _this_1.preview.previewHandlersHelper.doneExportStatusHandler(deffered, operationId, response); })
                .fail(function (error) {
                _this_1.preview.previewHandlersHelper.errorExportStatusHandler(deffered, error);
                !_this_1._useSameTabExport && error.responseJSON && error.responseJSON['error'] && _this_1._showAsyncExportError(_this_1._window, error.responseJSON['error']);
            });
        }, 250));
        return deffered.promise();
    };
    ExportHandler.prototype.getExportResult = function (operationId, inlineDisposition, useSameTab, token, printable, uri) {
        if (printable === void 0) { printable = false; }
        if (uri === void 0) { uri = ''; }
        var requestData = this._exportResultRequestData;
        if (uri) {
            requestData.RequestUrl = uri;
        }
        else if (token) {
            requestData.RequestUrl = settings_1.ReportServerDownloadUri();
            requestData.QueryParameters['token'] = token;
            requestData.QueryParameters['printable'] = printable.toString();
        }
        else {
            var arg = encodeURIComponent(JSON.stringify({ id: operationId, inlineResult: !!inlineDisposition }));
            requestData.RequestUrl = settings_1.HandlerUri();
            if (this._useSameTabExport) {
                requestData.FormData['actionKey'] = 'getExportResult';
                requestData.FormData['arg'] = arg;
            }
            else {
                requestData.QueryParameters['actionKey'] = 'getExportResult';
                requestData.QueryParameters['arg'] = arg;
            }
        }
        this._window && (this._window.onunload = null);
        this._doExportSync(this._window, printable, useSameTab);
        this._window = null;
    };
    return ExportHandler;
}(analytics_utils_1.Disposable));
exports.ExportHandler = ExportHandler;
ko.bindingHandlers['dxViewerExport'] = {
    init: function (element, valueAccessor) {
        var exportHandler = valueAccessor();
        var templateHtml = analytics_widgets_1.getTemplate('dxrd-export-tool-content');
        $(element).append(templateHtml);
        var exportFrame = document.createElement('iframe');
        exportFrame.name = exportHandler.exportingFrameName;
        element.querySelector('.dxrd-visually-hidden').appendChild(exportFrame);
        exportHandler.exportingFrame = exportFrame;
        exportHandler.postingForm = element.querySelector('form');
    }
};
