﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewHandlersHelper.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var settings_1 = require("../settings");
var PreviewHandlersHelper = (function () {
    function PreviewHandlersHelper(preview) {
        this._preview = preview;
    }
    PreviewHandlersHelper.prototype.doneStartExportHandler = function (deffered, inlineResult, response, useSameTab, printable) {
        var _this = this;
        if (useSameTab === void 0) { useSameTab = false; }
        if (printable === void 0) { printable = false; }
        try {
            if (!response) {
                this._preview.progressBar.complete();
                return;
            }
            this._preview._currentOperationId(response);
            var progress = 0;
            var doGetExportStatus = function (operationId) {
                var promise = _this._preview.exportHandler.getExportStatus(operationId);
                promise.done(function (result) {
                    if (result && result.requestAgain) {
                        if (progress < result.progress) {
                            progress = result.progress;
                            _this._preview.exportHandler.updateExportStatus(result.progress);
                        }
                        var doStatusRequest = function () { doGetExportStatus(operationId); };
                        settings_1.PollingDelay() ? setTimeout(doStatusRequest, settings_1.PollingDelay()) : doStatusRequest();
                    }
                    else {
                        _this._preview.progressBar.complete();
                        if (!result.requestAgain && result.completed) {
                            _this._preview.exportHandler.updateExportStatus(result.progress);
                            _this._preview.exportHandler.getExportResult(operationId, inlineResult, useSameTab, result.token, printable, result.uri);
                        }
                    }
                });
            };
            doGetExportStatus(this._preview._currentOperationId());
        }
        finally {
            deffered.resolve(true);
            this._preview._startBuildOperationId = '';
        }
    };
    PreviewHandlersHelper.prototype.errorStartExportHandler = function (deffered, error) {
        this._preview.progressBar.complete();
    };
    PreviewHandlersHelper.prototype.doneExportStatusHandler = function (deffered, operationId, response) {
        try {
            if (!response) {
                deffered.resolve({ requestAgain: false });
                this._preview.progressBar.complete();
                return;
            }
            this._preview.progressBar && this._preview.progressBar.progress() < response.progress && this._preview.progressBar.progress(response.progress);
            deffered.resolve(response);
        }
        finally {
            if (!deffered.state || deffered.state() === 'pending') {
                deffered.resolve({ requestAgain: false });
            }
        }
    };
    PreviewHandlersHelper.prototype.errorExportStatusHandler = function (deffered, error) {
        this._preview.progressBar.complete();
        deffered.resolve({ requestAgain: false, completed: false });
    };
    PreviewHandlersHelper.prototype.doneStartBuildHandler = function (deffered, response, startBuildOperationId) {
        var _this = this;
        try {
            var removeAllEmptyPages = function (all) {
                all && _this._preview.pages.removeAll();
                _this._preview.removeEmptyPages();
            };
            if (!response || !response.documentId) {
                this._preview.progressBar.complete();
                removeAllEmptyPages();
                return;
            }
            var stopBuildRequest = this._preview._stopBuildRequests[startBuildOperationId];
            var closeDocumentRequest = this._preview._closeDocumentRequests[startBuildOperationId];
            if (startBuildOperationId && (stopBuildRequest || closeDocumentRequest)) {
                if (closeDocumentRequest) {
                    closeDocumentRequest && this._preview.closeDocument(response.documentId);
                }
                else {
                    stopBuildRequest && this._preview.stopBuild(response.documentId);
                }
                this._preview.progressBar.complete();
                removeAllEmptyPages();
                return;
            }
            this._preview._currentDocumentId(response.documentId);
            var doGetBuildStatus = this._preview.getDoGetBuildStatusFunc();
            doGetBuildStatus(this._preview._currentDocumentId());
        }
        finally {
            deffered.resolve(true);
        }
    };
    PreviewHandlersHelper.prototype.errorStartBuildHandler = function (deffered, error) {
        this._preview.pageLoading(false);
        this._preview.errorMessage(analytics_utils_1.getLocalization('Document creation was cancelled due to server error', 'WebDocumentViewer_DocumentCreationCancelled'));
        this._preview.progressBar.complete();
        deffered.resolve(true);
        this._preview.removeEmptyPages();
    };
    PreviewHandlersHelper.prototype.errorGetBuildStatusHandler = function (deffered, error, ignoreError) {
        deffered.resolve({ requestAgain: false, completed: false });
    };
    PreviewHandlersHelper.prototype.doneGetBuildStatusHandler = function (deffered, documentId, response, stopProcessingPredicate) {
        var _this = this;
        try {
            if (!response) {
                deffered.resolve({ requestAgain: false });
                return;
            }
            this._preview.progressBar.progress() < response.progress && !this._preview._stopBuildRequests[documentId] && !stopProcessingPredicate()
                && this._preview.progressBar.progress(response.progress);
            var wereNoPagesAndNewOnesExist = this._preview.pageIndex() === -1 && response.pageCount > 0;
            if (wereNoPagesAndNewOnesExist) {
                this._preview.pageIndex(0);
            }
            for (var i = 0; i < response.pageCount && !this._preview._stopBuildRequests[documentId] && !stopProcessingPredicate(); i++) {
                var createNewPage = function (index) {
                    return _this._preview.createPage(index, _this._preview.createBrickClickProcessor(index));
                };
                if (i < this._preview.pages().length) {
                    var page = this._preview.pages()[i];
                    if (!page || page.isEmpty) {
                        page = createNewPage(i);
                        this._preview.pages.splice(i, 1, page);
                    }
                    if (page.pageIndex === -1) {
                        page.pageIndex = i;
                        if (this._preview.pageIndex.peek() === i) {
                            page.isClientVisible(true);
                        }
                    }
                }
                else {
                    var newPage = createNewPage(i);
                    this._preview.pages.push(newPage);
                }
            }
            this._preview._raiseOnSizeChanged();
            if (wereNoPagesAndNewOnesExist) {
                var pageIndex = this._preview.pages().length ? 0 : -1;
                this._preview.goToPage(pageIndex, true);
            }
            deffered.resolve(response);
        }
        finally {
            if (deffered.state() === 'pending') {
                deffered.resolve({ requestAgain: false });
            }
        }
    };
    return PreviewHandlersHelper;
}());
exports.PreviewHandlersHelper = PreviewHandlersHelper;
