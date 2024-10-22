﻿/**
* DevExpress HTML/JS Reporting (viewer\reportPreview.js)
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
var editingField_1 = require("./editing/editingField");
var _previewRequestWrapper_1 = require("./internal/_previewRequestWrapper");
var _sortingProcessor_1 = require("./internal/_sortingProcessor");
var _page_1 = require("./internal/_page");
var settings_1 = require("./settings");
var _previewHandlersHelper_1 = require("./internal/_previewHandlersHelper");
var _utils_1 = require("../common/utils/_utils");
var exportOptionsPreview_1 = require("./exportOptions/exportOptionsPreview");
var _progressViewModel_1 = require("./internal/_progressViewModel");
var constants_1 = require("./constants");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var _previewBricksKeyboardHelper_1 = require("./accessibility/_previewBricksKeyboardHelper");
var _exportHandler_1 = require("./internal/_exportHandler");
var _utils_2 = require("./internal/_utils");
var ReportPreview = (function (_super) {
    __extends(ReportPreview, _super);
    function ReportPreview(handlerUri, previewRequestWrapper, previewHandlersHelper, callbacks, rtl, enableKeyboardSupport, exportSettings) {
        if (rtl === void 0) { rtl = false; }
        var _this = _super.call(this) || this;
        _this.enableKeyboardSupport = enableKeyboardSupport;
        _this.predefinedZoomLevels = ko.observableArray([5, 2, 1.5, 1, 0.75, 0.5, 0.25]);
        _this._pageWidth = ko.observable(818);
        _this._pageHeight = ko.observable(1058);
        _this._pageBackColor = ko.observable('');
        _this._currentReportId = ko.observable(null);
        _this._currentReportUrl = ko.observable(null);
        _this._currentDocumentId = ko.observable(null);
        _this._unifier = ko.observable('');
        _this._currentOperationId = ko.observable(null);
        _this._stopBuildRequests = {};
        _this._closeReportRequests = {};
        _this._closeDocumentRequests = {};
        _this._editingFields = ko.observable([]);
        _this._startBuildOperationId = '';
        _this._editingValuesSubscriptions = [];
        _this._drillDownState = [];
        _this._sortingState = [];
        _this._sortingProcessor = new _sortingProcessor_1.SortingProcessor(function () { return _this._sortingState || []; });
        _this._getBuildStatusDeferreds = [];
        _this._timeouts = [];
        _this._deferreds = [];
        _this.getSelectedContent = function (punctuationMark) {
            if (punctuationMark === void 0) { punctuationMark = ''; }
            var currentPage = _this.pages()[_this.pageIndex()];
            if (!currentPage || !currentPage.brickColumnWidthArray) {
                return '';
            }
            var activeBricks = [];
            var getActiveBricks = function (currentBrick, resultArray) {
                if (!currentBrick) {
                    return;
                }
                currentBrick.active() && currentBrick.genlIndex != -1 && activeBricks.push(currentBrick);
                currentBrick.bricks && currentBrick.bricks.length != 0 && currentBrick.bricks.forEach(function (innerBrick) { getActiveBricks(innerBrick, resultArray); });
            };
            getActiveBricks(currentPage.brick(), activeBricks);
            if (!activeBricks) {
                return '';
            }
            var sortedActiveBricks = [];
            var extendWithSpaces = function (width, text) {
                var spaceCount = width - text.length;
                for (var i = 0; i <= spaceCount; i++) {
                    text += ' ';
                }
                return text;
            };
            var firstUsedColumn = currentPage.brickColumnWidthArray.length, lastUsedColumn = -1;
            activeBricks.forEach(function (activeBrick) {
                var row = sortedActiveBricks[activeBrick.row];
                if (!row) {
                    row = [];
                    sortedActiveBricks[activeBrick.row] = row;
                }
                row[activeBrick.col] = activeBrick.accessibleDescription || activeBrick.text();
                if (firstUsedColumn > activeBrick.col) {
                    firstUsedColumn = activeBrick.col;
                }
                if (lastUsedColumn < activeBrick.col) {
                    lastUsedColumn = activeBrick.col;
                }
            });
            var result = '';
            sortedActiveBricks.forEach(function (row, index) {
                for (var c = firstUsedColumn; c <= lastUsedColumn; c++) {
                    var rowText = row[c] ? row[c] + punctuationMark : '';
                    result += c == lastUsedColumn ? rowText : extendWithSpaces(currentPage.brickColumnWidthArray[c], rowText);
                }
                if (index != sortedActiveBricks.length - 1) {
                    result += '\r\n';
                }
            });
            return result;
        };
        _this.rtlReport = ko.observable(false);
        _this.currentPage = ko.observable(null);
        _this.originalParametersInfo = ko.observable(null);
        _this.pageIndex = ko.observable(-1);
        _this.showMultipagePreview = ko.observable(false);
        _this.documentMap = ko.observable();
        _this.exportOptionsModel = ko.observable();
        _this.pageLoading = ko.observable(false);
        _this.errorMessage = ko.observable('');
        _this.documentBuilding = ko.observable(false);
        _this.reportOpening = ko.observable(false);
        _this.pages = ko.observableArray([]).extend({ rateLimit: { timeout: 20, method: 'notifyWhenChangesStop' } });
        _this.isAutoFit = ko.observable(true);
        _this.autoFitBy = ko.observable(constants_1.ZoomAutoBy.WholePage);
        _this.exportDisabled = ko.pureComputed(function () {
            var inProgress = _this.progressBar.inProgress();
            var documentBuilding = _this.documentBuilding();
            return _this.pageIndex() === -1 || inProgress || documentBuilding;
        });
        _this._zoom = ko.observable(1);
        _this.zoom = ko.pureComputed({
            read: function () {
                var autoFitBy = _this.autoFitBy();
                if (autoFitBy != constants_1.ZoomAutoBy.None || _this._zoom() === 0) {
                    return autoFitBy;
                }
                return _this._zoom();
            },
            write: function (val) {
                if (val > 0) {
                    _this.autoFitBy(constants_1.ZoomAutoBy.None);
                    _this._zoom(val);
                }
                else {
                    _this.autoFitBy(val);
                }
            }
        });
        _this.editingFieldsProvider = function () { return _this._editingFields(); };
        _this._currentPageText = ko.pureComputed(function () {
            if (_this.pageIndex() === -1) {
                return analytics_utils_1.getLocalization('0 pages', 'ASPxReportsStringId.WebDocumentViewer_0Pages');
            }
            else {
                var ofText = analytics_utils_1.getLocalization('of', 'ASPxReportsStringId.ToolBarItemText_OfLabel');
                return (_this.pageIndex() + 1) + ' ' + ofText + ' ' + _this.pages().length;
            }
        });
        _this._raiseOnSizeChanged = function () { _this.onSizeChanged() && _this.onSizeChanged()(); };
        _this.previewSize = ko.observable(0);
        _this.onSizeChanged = ko.observable();
        _this.previewVisible = ko.observable(false);
        _this.editingFieldsHighlighted = ko.observable(false);
        _this.canSwitchToDesigner = true;
        _this.allowURLsWithJSContent = false;
        _this.zoomStep = ko.observable(0.05);
        _this._progressFirstTime = false;
        _this.emptyDocumentCaption = ko.pureComputed(function () {
            var parametersInfo = _this.originalParametersInfo();
            var parametersExist = parametersInfo && parametersInfo.parameters.some(function (x) { return x.Visible; });
            var newCaption = '';
            if (_this.documentBuilding()) {
                if (_this.currentPage()) {
                    if (!_this._progressFirstTime)
                        newCaption = analytics_internal_1.formatUnicorn(analytics_utils_1.getLocalization('Progress {0}%', 'ASPxReportsStringId.WebDocumentViewer_AriaDocumentProgress'), _this.progressBar.progress().toString());
                    else
                        newCaption = _this.progressBar.progress() + '%';
                    _this._progressFirstTime = true;
                }
                else {
                    newCaption = analytics_utils_1.getLocalization('Creating the document...', 'PreviewStringId.Msg_CreatingDocument');
                }
            }
            else if (parametersExist && !_this.documentId) {
                newCaption = analytics_utils_1.getLocalization('Waiting for parameter values...', 'PreviewStringId.Msg_WaitingForParameterValues');
            }
            else if (_this.documentId) {
                _this._progressFirstTime = false;
                if (_this.pageIndex() !== -1 && !_this.progressBar.inProgress()) {
                    newCaption = analytics_utils_1.getLocalization('Document is ready', 'ASPxReportsStringId.WebDocumentViewer_AriaDocumentReady');
                }
                else {
                    newCaption = analytics_utils_1.getLocalization('The document does not contain any pages.', 'PreviewStringId.Msg_EmptyDocument');
                }
            }
            else if (_this.reportOpening()) {
                _this._progressFirstTime = false;
                newCaption = analytics_utils_1.getLocalization('Loading...', 'AnalyticsCoreStringId.Loading');
            }
            else if (_this.errorMessage()) {
                newCaption = _this.errorMessage();
            }
            return newCaption;
        }).extend({ rateLimit: { timeout: 1000 } });
        _this.exportOptionsTabVisible = ko.observable(true);
        settings_1.HandlerUri(handlerUri || settings_1.HandlerUri());
        _this.progressBar = new _progressViewModel_1.ProgressViewModel(enableKeyboardSupport);
        _this.editingFieldChanged = callbacks && callbacks.editingFieldChanged;
        _this.previewHandlersHelper = previewHandlersHelper || new _previewHandlersHelper_1.PreviewHandlersHelper(_this);
        _this.requestWrapper = previewRequestWrapper || new _previewRequestWrapper_1.PreviewRequestWrapper(null, callbacks);
        _this.rtlViewer = rtl;
        _this.exportHandler = new _exportHandler_1.ExportHandler(exportSettings, _this);
        if (callbacks) {
            _this.customProcessBrickClick = callbacks.previewClick;
            _this.customizeExportOptions = callbacks.customizeExportOptions;
            _this.exportHandler.onExportCustomEvent = callbacks.onExport;
            _this._onGetBuildStatus = callbacks._onGetBuildStatus;
            _this._onGetDocumentDetails = callbacks._onGetDocumentDetails;
        }
        _this._disposables.push(settings_1.EditablePreviewEnabled.subscribe(function (newValue) { return !newValue && _this.editingFieldsHighlighted(false); }));
        _this._disposables.push(_this.documentBuilding.subscribe(function (newVal) {
            if (!newVal) {
                _this._unifier(_utils_1.generateGuid());
                var documentId = _this._currentDocumentId();
                var pageCount = _this.pages().length;
                for (var i = 0; i < pageCount; i++) {
                    var page = _this.pages()[i];
                    if (!page.pageLoading()) {
                        page.clearBricks();
                    }
                    page.updateSize(_this._zoom());
                    page.actualResolution = 0;
                    page.isClientVisible() && page._setPageImgSrc(documentId, _this._unifier(), _this._zoom());
                }
                if (callbacks && callbacks.documentReady && documentId) {
                    var self = _this;
                    _this._timeouts.push(setTimeout(function () {
                        callbacks.documentReady(documentId, self._currentReportId(), pageCount);
                    }));
                }
            }
        }));
        _this._disposables.push(_this._currentDocumentId.subscribe(function (newVal) {
            _this._unifier(newVal ? _utils_1.generateGuid() : '');
        }));
        _this._disposables.push(_this.previewSize.subscribe(function () { return _this._raiseOnSizeChanged(); }));
        _this._disposables.push(_this.zoom);
        _this._disposables.push(_this.exportDisabled);
        _this._disposables.push(_this._currentPageText);
        _this._disposables.push(_this.progressBar);
        _this._disposables.push(_this.emptyDocumentCaption);
        _this._disposables.push(_this.showMultipagePreview.subscribe(function () {
            if (!_this.showMultipagePreview()) {
                var currentPage = _this.pages()[_this.pageIndex()];
                currentPage && currentPage.isClientVisible(true);
            }
        }));
        _this._disposables.push(_this._zoom.subscribe(function () {
            if (_this.showMultipagePreview()) {
                _this.pages().forEach(function (page) {
                    page.updateSize(page.zoom());
                    page.isClientVisible(false);
                });
                _this._raiseOnSizeChanged();
            }
            else {
                var currentPage = _this.pages()[_this.pageIndex()];
                currentPage && currentPage.isClientVisible.notifySubscribers(currentPage.isClientVisible.peek());
            }
        }));
        _this._disposables.push(ko.computed(function () {
            var pagesArray = _this.pages();
            var pageIndex = _this.pageIndex();
            if (!pagesArray || pageIndex >= pagesArray.length)
                return;
            var currentPage = null;
            if (pageIndex >= 0)
                currentPage = pagesArray[pageIndex];
            if (currentPage != _this.currentPage.peek())
                _this.currentPage(currentPage);
        }));
        if (enableKeyboardSupport) {
            _this.previewBrickKeyboardHelper = new _previewBricksKeyboardHelper_1.PreviewBricksKeyboardHelper(_this);
            _this._disposables.push(_this.progressBar.visible, _this.previewBrickKeyboardHelper);
        }
        return _this;
    }
    ReportPreview.prototype._doDrillDown = function (drillDownKey) {
        this._drillDownState.forEach(function (x) { return x.Key === drillDownKey && (x.Value = !x.Value); });
        this.closeDocument();
        this.progressBar.complete();
        this.documentMap(null);
        for (var i = this.pages().length - 1; i >= 0; i--) {
            var page = this.pages()[i];
            if (i > this.pageIndex()) {
                this.pages.remove(page);
            }
            else {
                page._clear();
            }
        }
        this._startBuildRequest();
    };
    ReportPreview.prototype._doSorting = function (sortData, shiftKey, ctrlKey) {
        if (!this._sortingProcessor.doSorting(sortData, shiftKey, ctrlKey))
            return;
        this.closeDocument();
        this.progressBar.complete();
        this.documentMap(null);
        this.pages().forEach(function (page) { return page._clear(); });
        this._startBuildRequest();
    };
    ReportPreview.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        (this._timeouts || []).forEach(function (tic) { return clearTimeout(tic); });
        (this._deferreds || []).forEach(function (deferred) { return deferred.reject(); });
        this.exportHandler && this.exportHandler.dispose();
        this.removeProperties();
        this._sortingProcessor = null;
    };
    ReportPreview.prototype.removeEmptyPages = function (all) {
        all && this.pages.removeAll();
        for (var idx = this.pages().length - 1; idx >= 0; idx--) {
            var tempPage = this.pages()[idx];
            (tempPage.isEmpty || tempPage.pageIndex === -1) && this.pages.remove(tempPage);
        }
    };
    ReportPreview.prototype._initialize = function () {
        this._drillDownState = [];
        this._sortingState = [];
        this.closeDocument();
        this._editingFields([]);
        this._editingValuesSubscriptions.forEach(function (item) { return item.dispose(); });
        this._editingValuesSubscriptions = [];
        this.documentMap(null);
        this.pageIndex(-1);
        this.pageLoading(true);
        this.errorMessage('');
        this.progressBar.complete();
        this._getBuildStatusDeferreds.forEach(function (a) { return a.reject(); });
        this._getBuildStatusDeferreds = [];
        this.pages().forEach(function (x) { return x.dispose(); });
        this.pages([this.createPage(-1, undefined, this.pageLoading)]);
        this.exportHandler.reportDisplayName(null);
    };
    ReportPreview.prototype.createPage = function (pageIndex, processClick, loading) {
        return new _page_1.PreviewPage(this, pageIndex, processClick, loading);
    };
    ReportPreview.prototype._cleanTabInfo = function () {
        this.exportOptionsModel(null);
        this.documentMap(null);
    };
    ReportPreview.prototype._clearReportInfo = function () {
        this._cleanTabInfo();
        this.closeReport();
        this.originalParametersInfo(null);
    };
    ReportPreview.prototype.createBrickClickProcessor = function (cyclePageIndex) {
        var _self = this;
        return function (brick, e) {
            _self.goToPage(cyclePageIndex, true);
            if (!brick)
                return;
            var page = _self.pages()[cyclePageIndex];
            if (!page)
                return;
            page.selectBrick('');
            var shiftKey = !!(e && e.shiftKey);
            var ctrlKey = !!(e && e.ctrlKey);
            var brickNavigation = brick && brick.navigation;
            var defaultHandler = function () {
                if (brickNavigation) {
                    if (brickNavigation.drillDownKey && _self.reportId && _self._doDrillDown && _self._drillDownState.length > 0) {
                        if (_self._startBuildOperationId)
                            return;
                        _self._doDrillDown(brickNavigation.drillDownKey);
                    }
                    else if (brickNavigation.sortData && _self.reportId && _self._doSorting && _self._sortingState.length > 0) {
                        if (_self._startBuildOperationId)
                            return;
                        _self._doSorting(brickNavigation.sortData, shiftKey, ctrlKey);
                    }
                    if (brickNavigation.pageIndex >= 0) {
                        var targetPage = _self.pages().filter(function (page) { return page.pageIndex === brickNavigation.pageIndex; })[0];
                        if (targetPage) {
                            _self.goToPage(brickNavigation.pageIndex);
                            targetPage.selectBrick(brickNavigation.indexes);
                            _self.brickClickDocumentMapHandler && _self.brickClickDocumentMapHandler(brickNavigation);
                        }
                    }
                    else {
                        var validateUrl = function (url) {
                            var isUrlString = typeof url === 'string';
                            if (isUrlString) {
                                url = url.toLocaleLowerCase();
                            }
                            if (url === 'empty') {
                                return false;
                            }
                            return _self.allowURLsWithJSContent || (isUrlString && (url.indexOf('javascript:') === -1));
                        };
                        if (brickNavigation.url && validateUrl(brickNavigation.url)) {
                            _utils_2.safelyRunWindowOpen(brickNavigation.url, brickNavigation.target || '_blank');
                        }
                    }
                }
            };
            if (_self.customProcessBrickClick && _self.customProcessBrickClick(cyclePageIndex, brick, defaultHandler))
                return;
            defaultHandler();
        };
    };
    ReportPreview.prototype.delayedInit = function () {
        this.previewBrickKeyboardHelper && this.previewBrickKeyboardHelper.delayedInit();
    };
    ReportPreview.prototype.openReport = function (reportName) {
        this._clearReportInfo();
        var deferred = $.Deferred();
        this._deferreds.push(deferred);
        this._openReportOperationDeferred = deferred;
        this.requestWrapper.openReport(reportName).done(function (response) {
            deferred.resolve(response);
        }).fail(function (error) {
            deferred.reject(error);
        });
        return this.initialize(deferred.promise());
    };
    ReportPreview.prototype.drillThrough = function (customData, closeCurrentReport) {
        var _this = this;
        if (closeCurrentReport === void 0) { closeCurrentReport = true; }
        var deferred = $.Deferred();
        this.requestWrapper.drillThrough(customData).done(function (response) {
            if (closeCurrentReport) {
                _this._clearReportInfo();
                _this.initialize(deferred.promise());
            }
            deferred.resolve(response);
        }).fail(function (error) {
            deferred.reject(error);
        });
        return deferred.promise();
    };
    ReportPreview.prototype.initialize = function (initializeDataPromise) {
        var _this = this;
        this.reportOpening(true);
        this._currentReportId(null);
        this._currentReportUrl(null);
        this._currentDocumentId(null);
        this._initialize();
        var _initializeDeferred = $.Deferred();
        this._deferreds.push(_initializeDeferred);
        _initializeDeferred.done(function () {
            initializeDataPromise.done(function (previewInitialize) {
                _this.reportOpening(false);
                if (previewInitialize && !previewInitialize.error && (previewInitialize.reportId || previewInitialize.documentId)) {
                    _this._currentReportId(previewInitialize.reportId);
                    _this._currentReportUrl(previewInitialize.reportUrl);
                    _this._currentDocumentId(previewInitialize.documentId);
                    _this.rtlReport(previewInitialize.rtlReport);
                    var pageSettings = previewInitialize.pageSettings;
                    if (pageSettings) {
                        if (pageSettings.height)
                            _this._pageHeight(pageSettings.height);
                        if (pageSettings.width)
                            _this._pageWidth(pageSettings.width);
                        _this._pageBackColor((pageSettings.color && _this.readerMode) ? 'rgba(' + pageSettings.color + ')' : '');
                    }
                    var deserializedExportOptions = _this._deserializeExportOptions(previewInitialize.exportOptions, !_this.reportId && (!previewInitialize.documentData || !previewInitialize.documentData.canPerformContinuousExport));
                    var customizeExportOptionsArgs = { exportOptions: deserializedExportOptions, panelVisible: true };
                    _this.customizeExportOptions && _this.customizeExportOptions(customizeExportOptionsArgs);
                    _this.exportOptionsTabVisible(customizeExportOptionsArgs.panelVisible);
                    _this.exportOptionsModel(deserializedExportOptions);
                    _this.originalParametersInfo(previewInitialize.parametersInfo);
                    if (previewInitialize.documentId) {
                        _this.progressBar.startProgress(function () { _this.documentBuilding(false); }, function () { _this.stopBuild(); });
                        _this.documentBuilding(true);
                        var doGetBuildStatusFunc = _this.getDoGetBuildStatusFunc();
                        doGetBuildStatusFunc(previewInitialize.documentId);
                    }
                }
                else {
                    _this.pageLoading(false);
                    _this._processError(analytics_utils_1.getLocalization('The report preview initialization has failed', 'ASPxReportsStringId.WebDocumentViewer_InitializationError'), previewInitialize && previewInitialize.error);
                }
            }).fail(function (error) {
                _this.reportOpening(false);
                _this.removeEmptyPages();
            });
        }).resolve();
        return initializeDataPromise;
    };
    ReportPreview.prototype._deserializeExportOptions = function (exportOptionsString, isMerged) {
        var jsonModel = exportOptionsString && JSON.parse(exportOptionsString);
        return isMerged ? new exportOptionsPreview_1.ExportOptionsMergedPreview(jsonModel) : new exportOptionsPreview_1.ExportOptionsPreview(jsonModel);
    };
    ReportPreview.prototype.deactivate = function () {
        this._initialize();
        this._cleanTabInfo();
        this.closeReport();
        this._currentDocumentId(null);
        this._currentReportId(null);
        this._currentReportUrl(null);
        this.originalParametersInfo(null);
    };
    ReportPreview.prototype.startBuild = function () {
        this._initialize();
        return this._startBuildRequest();
    };
    ReportPreview.prototype.customDocumentOperation = function (customData, hideMessageFromUser) {
        var documentId = this._currentDocumentId();
        if (this.documentBuilding() || !documentId)
            return;
        var serializedExportOptions = this.exportOptionsModel() ? JSON.stringify(new analytics_utils_1.ModelSerializer().serialize(this.exportOptionsModel())) : null;
        var editingFields = this._editingFields && this._editingFields().map(function (item) { return item.editValue(); });
        var deferred = $.Deferred();
        this.requestWrapper.customDocumentOperation(documentId, serializedExportOptions, editingFields, customData, hideMessageFromUser)
            .done(function (response) {
            try {
                if (response && response.message) {
                    var handler = response.succeeded ? settings_1.MessageHandler().processMessage : settings_1.MessageHandler().processError;
                    handler(response.message, !hideMessageFromUser);
                }
            }
            finally {
                deferred.resolve(response);
            }
        })
            .fail(function (error) {
            var response = { message: analytics_utils_1.getLocalization('The requested document operation cannot be performed.', 'ASPxReportsStringId.WebDocumentViewer_CustomDocumentOperationsDenied_Error') };
            deferred.reject(response);
        });
        return deferred.promise();
    };
    ReportPreview.prototype._initializeStartBuild = function () {
        var _this = this;
        if (this.documentBuilding() || this._startBuildOperationId) {
            return false;
        }
        this._startBuildOperationId = _utils_1.generateGuid();
        this._currentDocumentId(null);
        this.progressBar.text(analytics_utils_1.getLocalization('Creating the document...', 'PreviewStringId.Msg_CreatingDocument'));
        this.progressBar.cancelText(analytics_utils_1.getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel'));
        this.progressBar.startProgress(function () { _this.documentBuilding(false); }, function () { _this.stopBuild(); });
        this.documentBuilding(true);
        return true;
    };
    ReportPreview.prototype._startBuildRequest = function () {
        var _this = this;
        if (!this._initializeStartBuild()) {
            return null;
        }
        var deffered = $.Deferred();
        var currentReportId = this._currentReportId();
        var startBuildOperationId = this._startBuildOperationId;
        var shouldIgnoreError = function () { return _this._closeReportRequests[currentReportId]; };
        this.requestWrapper.startBuildRequest(shouldIgnoreError)
            .done(function (response) { _this.previewHandlersHelper && _this.previewHandlersHelper.doneStartBuildHandler(deffered, response, startBuildOperationId); })
            .fail(function (error) { _this.previewHandlersHelper && _this.previewHandlersHelper.errorStartBuildHandler(deffered, error); });
        deffered.always(function () { return _this._startBuildOperationId = ''; });
        return deffered.promise();
    };
    ReportPreview.prototype.getBuildStatus = function (documentId) {
        var _this = this;
        var deffered = $.Deferred();
        this._deferreds.push(deffered);
        var sessionDeffered = $.Deferred();
        this._getBuildStatusDeferreds.push(sessionDeffered);
        this._timeouts.push(setTimeout(function () {
            var ignorePredicate = function () { return _this._closeDocumentRequests[documentId]; };
            _this.requestWrapper.getBuildStatusRequest(documentId, ignorePredicate)
                .done(function (response) {
                sessionDeffered.resolve(response);
            })
                .fail(function (error) {
                sessionDeffered.reject(error);
            });
            sessionDeffered.done(function (response) {
                _this._onGetBuildStatus && _this._onGetBuildStatus(response);
                _this.previewHandlersHelper && _this.previewHandlersHelper.doneGetBuildStatusHandler(deffered, documentId, response, ignorePredicate);
            }).fail(function (error) {
                _this.previewHandlersHelper && _this.previewHandlersHelper.errorGetBuildStatusHandler(deffered, error, ignorePredicate);
            });
        }, 250));
        return deffered.promise();
    };
    ReportPreview.prototype.getDoGetBuildStatusFunc = function () {
        var _this = this;
        var preview = this;
        var doGetBuildStatus = function (documentId) {
            var promise = preview.getBuildStatus(documentId);
            promise.done(function (result) {
                if (documentId !== preview._currentDocumentId())
                    return;
                if (result && result.requestAgain && !preview._stopBuildRequests[documentId] && !preview._closeDocumentRequests[documentId]) {
                    var doStatusRequest = function () {
                        if (!preview._stopBuildRequests[documentId] && !preview._closeDocumentRequests[documentId]) {
                            doGetBuildStatus(documentId);
                        }
                    };
                    settings_1.PollingDelay() ? _this._timeouts.push(setTimeout(doStatusRequest, settings_1.PollingDelay())) : doStatusRequest();
                }
                else {
                    try {
                        if (result.error || !result.requestAgain && !result.pageCount) {
                            preview.pageLoading(false);
                            preview.removeEmptyPages(!result.pageCount);
                            if (!preview.pages().length)
                                preview.pageIndex(-1);
                            return;
                        }
                        if (!result.completed) {
                            return;
                        }
                        else if (result.pageCount < preview.pages().length) {
                            preview.pageIndex(Math.min(result.pageCount - 1, preview.pageIndex()));
                            preview.pages.splice(result.pageCount, preview.pages().length);
                        }
                        preview.getDocumentData(documentId);
                    }
                    finally {
                        preview.progressBar.complete();
                        _this._timeouts.push(setTimeout(preview._raiseOnSizeChanged, 1000));
                    }
                }
            });
        };
        return doGetBuildStatus;
    };
    ReportPreview.prototype.getDocumentData = function (documentId) {
        var _this = this;
        var ignoreErrorPredicate = function () { return _this._closeDocumentRequests[documentId]; };
        this.requestWrapper.getDocumentData(documentId, ignoreErrorPredicate)
            .done(function (response) {
            if (!response) {
                return;
            }
            _this._onGetDocumentDetails && _this._onGetDocumentDetails(response);
            _this.exportHandler.reportDisplayName(response.displayName);
            _this._drillDownState = response.drillDownKeys || [];
            _this._sortingState = response.sortingState || [];
            if (response.canPerformContinuousExport === false && _this.reportId) {
                var deserializedExportOptions = _this._deserializeExportOptions(response.exportOptions || {}, true);
                var customizeExportOptionsArgs = { exportOptions: deserializedExportOptions, panelVisible: true };
                _this.customizeExportOptions && _this.customizeExportOptions(customizeExportOptionsArgs);
                _this.exportOptionsTabVisible(customizeExportOptionsArgs.panelVisible);
                _this.exportOptionsModel(deserializedExportOptions);
            }
            _this.documentMap(response.documentMap);
            _this._editingValuesSubscriptions.forEach(function (item) { return item.dispose(); });
            _this._editingValuesSubscriptions = [];
            _this._editingFields((response.editingFields || []).map(function (item, index) {
                var field = _this.createEditingField(item, index);
                if (_this.editingFieldChanged) {
                    field.editingFieldChanged = _this.editingFieldChanged;
                }
                _this._editingValuesSubscriptions.push(field.editValue);
                return field;
            }));
        });
    };
    ReportPreview.prototype.exportDocumentTo = function (format, inlineResult) {
        if (!this._currentDocumentId())
            return;
        var serializedExportOptions = this.exportOptionsModel() ? JSON.stringify(new analytics_utils_1.ModelSerializer().serialize(this.exportOptionsModel())) : null;
        var args = encodeURIComponent(JSON.stringify({
            documentId: this._currentDocumentId(),
            exportOptions: serializedExportOptions,
            format: format,
            inlineResult: inlineResult,
            editingFieldValues: this._editingFields && this._editingFields().map(function (item) {
                var editValue = item.editValue();
                if (typeof editValue === 'string')
                    return _utils_1.transformNewLineCharacters(editValue);
                return editValue;
            })
        }));
        this.exportHandler.export(args, settings_1.HandlerUri(), inlineResult);
    };
    ReportPreview.prototype.printDocument = function (pageIndex) {
        if (!this._currentDocumentId())
            return;
        var exportOptions = new exportOptionsPreview_1.ExportOptionsPreview({});
        exportOptions.pdf['showPrintDialogOnOpen'] = true;
        pageIndex = parseInt(pageIndex);
        if ((!!pageIndex && pageIndex > 0 || pageIndex === 0) && (this.pages().length > pageIndex)) {
            (exportOptions.pdf['pageRange'] = pageIndex + 1);
        }
        var serializedExportOptions = JSON.stringify(new analytics_utils_1.ModelSerializer().serialize(exportOptions));
        var args = encodeURIComponent(JSON.stringify({
            documentId: this._currentDocumentId(),
            exportOptions: serializedExportOptions,
            format: 'printpdf',
            inlineResult: true,
            editingFieldValues: this._editingFields && this._editingFields().map(function (item) { return item.editValue(); })
        }));
        this.exportHandler.export(args, settings_1.HandlerUri(), true, true);
    };
    ReportPreview.prototype.stopBuild = function (documentId) {
        var id = documentId || this._currentDocumentId();
        if (!id) {
            this._startBuildOperationId && (this._stopBuildRequests[this._startBuildOperationId] = true);
            return;
        }
        this._stopBuildRequests[id] = true;
        this.progressBar.complete();
        this.requestWrapper.stopBuild(id);
    };
    ReportPreview.prototype.closeDocument = function (documentId) {
        var _documentId = documentId || this._currentDocumentId();
        if (!_documentId) {
            this._startBuildOperationId && (this._closeDocumentRequests[this._startBuildOperationId] = true);
            return;
        }
        this._closeDocumentRequests[_documentId] = true;
        this.progressBar.complete();
        this.requestWrapper.sendCloseRequest(_documentId);
    };
    ReportPreview.prototype.closeReport = function () {
        this._openReportOperationDeferred && this._openReportOperationDeferred.reject();
        var currentReportId = this._currentReportId();
        if (!currentReportId) {
            return;
        }
        this._closeReportRequests[currentReportId] = true;
        this.requestWrapper.sendCloseRequest(null, currentReportId);
    };
    ReportPreview.prototype.goToPage = function (pageIndex, forcePageChanging, throttle) {
        var _this = this;
        if (!forcePageChanging && this.pageIndex.peek() === pageIndex || this.pages.peek().length === 0 || pageIndex < 0 || pageIndex >= this.pages.peek().length) {
            return;
        }
        if (this._goToPageTimer !== undefined) {
            clearTimeout(this._goToPageTimer);
        }
        var updateActivePage = function (activePageIndex) {
            _this.pages.peek().forEach(function (page) {
                var visible = page.pageIndex === activePageIndex;
                page.active(visible);
                page.isClientVisible(visible);
            });
            _this._goToPageTimer = undefined;
        };
        if (throttle)
            this._timeouts.push(this._goToPageTimer = setTimeout(function () { return updateActivePage(_this.pageIndex()); }, throttle));
        else
            updateActivePage(pageIndex);
        this.pageIndex(pageIndex);
    };
    ReportPreview.prototype.createEditingField = function (item, index) {
        return new editingField_1.EditingField(item, index, this.requestWrapper);
    };
    ReportPreview.prototype.currentPageAriaLabelImgAlt = function (index) {
        return analytics_internal_1.formatUnicorn(analytics_utils_1.getLocalization('Report Preview page {0} of {1}', 'ASPxReportsStringId.WebDocumentViewer_AriaLabelPreviewPage'), index + 1, this.pages().length);
    };
    ReportPreview.prototype._getErrorMessage = function (jqXHR) {
        var serverError = analytics_internal_1.getErrorMessage(jqXHR);
        if (!serverError)
            return jqXHR && jqXHR.responseJSON && jqXHR.responseJSON.result && jqXHR.responseJSON.result.faultMessage ?
                jqXHR.responseJSON.result.faultMessage :
                serverError;
        return serverError;
    };
    ReportPreview.prototype._processError = function (error, jqXHR, showForUser) {
        if (showForUser === void 0) { showForUser = true; }
        var prefix = error + ': ';
        var serverError = this._getErrorMessage(jqXHR);
        serverError && (error = prefix + serverError);
        settings_1.MessageHandler().processError(error, showForUser, serverError && prefix);
    };
    Object.defineProperty(ReportPreview.prototype, "reportId", {
        get: function () {
            return this._currentReportId();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportPreview.prototype, "reportUrl", {
        get: function () {
            return this._currentReportUrl();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportPreview.prototype, "documentId", {
        get: function () {
            return this._currentDocumentId();
        },
        enumerable: true,
        configurable: true
    });
    return ReportPreview;
}(analytics_utils_1.Disposable));
exports.ReportPreview = ReportPreview;
