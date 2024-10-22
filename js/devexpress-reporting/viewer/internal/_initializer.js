﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_initializer.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var previewParametersViewModel_1 = require("../parameters/previewParametersViewModel");
var _previewModel_1 = require("./_previewModel");
var _previewRequestWrapper_1 = require("./_previewRequestWrapper");
var reportPreview_1 = require("../reportPreview");
var _searchViewModel_1 = require("../search/_searchViewModel");
var _documentMapModel_1 = require("../documentMap/_documentMapModel");
var previewParameterHelper_1 = require("../parameters/previewParameterHelper");
var exportOptionsModel_1 = require("../exportOptions/exportOptionsModel");
var _utils_1 = require("../../common/utils/_utils");
var _actions_1 = require("./_actions");
var constants_1 = require("../constants");
var _progressBarUtils_1 = require("./_progressBarUtils");
var _sizeUtils_1 = require("./_sizeUtils");
var settings_1 = require("../settings");
var _mobileInitializer_1 = require("../mobile/utils/_mobileInitializer");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var config_1 = require("devextreme/core/config");
var _utils_2 = require("../search/_utils");
function createDesktopPreview(bindingSettings) {
    _utils_1.processZoomFactor(bindingSettings.model.accessibilityCompliant);
    var enableKeyboardSupport = !!bindingSettings.model.accessibilityCompliant;
    var callbacks = bindingSettings.callbacks;
    var bindingModel = bindingSettings.model;
    var bindingElement = bindingSettings.element;
    var previewWrapper = new _previewRequestWrapper_1.PreviewRequestWrapper(null, callbacks), reportPreview = new reportPreview_1.ReportPreview(bindingModel.handlerUri, previewWrapper, undefined, callbacks, bindingModel.rtl, enableKeyboardSupport, bindingModel.exportSettings), searchModel = new _searchViewModel_1.SearchViewModel(reportPreview, enableKeyboardSupport);
    var documentMapModel = new _documentMapModel_1.DocumentMapModel(reportPreview);
    var parametersModel = new previewParametersViewModel_1.PreviewParametersViewModel(reportPreview, new previewParameterHelper_1.PreviewParameterHelper(bindingModel.parametersInfo && bindingModel.parametersInfo.knownEnums, bindingSettings.callbacks), enableKeyboardSupport);
    var exportModel = new exportOptionsModel_1.ExportOptionsModel(reportPreview, enableKeyboardSupport);
    reportPreview.canSwitchToDesigner = !bindingModel.previewVisible;
    reportPreview.allowURLsWithJSContent = bindingModel.allowURLsWithJSContent;
    previewWrapper.initialize(reportPreview, parametersModel, searchModel);
    var tabPanel = new analytics_utils_1.TabPanel({
        tabs: [
            parametersModel.tabInfo,
            exportModel.tabInfo,
            searchModel.tabInfo,
            documentMapModel.tabInfo
        ],
        autoSelectTab: true,
        rtl: bindingModel.rtl
    });
    tabPanel.collapsed(true);
    var fullscreenEnabled = _utils_1.createFullscreenComputed(bindingElement, reportPreview);
    var previewActions = new _actions_1.PreviewActions(reportPreview);
    var designPreviewActions = new _actions_1.PreviewDesignerActions(reportPreview, fullscreenEnabled);
    var globalActionProviders = ko.observableArray([previewActions, exportModel, searchModel, designPreviewActions]);
    var actionLists = new _actions_1.ActionLists(reportPreview, globalActionProviders, callbacks && callbacks.customizeActions, reportPreview.previewVisible);
    reportPreview.previewVisible(bindingModel.previewVisible);
    var designerModelOptions = {
        rootStyle: 'dxrd-preview dxd-back-primary-invariant' + (reportPreview.canSwitchToDesigner ? ' dxrd-designer-preview' : ''),
        reportPreview: reportPreview,
        parametersModel: parametersModel,
        exportModel: exportModel,
        searchModel: searchModel,
        documentMapModel: documentMapModel,
        tabPanel: tabPanel,
        actionLists: actionLists,
        rtl: reportPreview.rtlViewer,
        accessibilityCompliant: bindingModel.accessibilityCompliant
    };
    var designerModel = new _previewModel_1.PreviewModel(designerModelOptions);
    designerModel._addDisposable(previewActions);
    designerModel._addDisposable(designPreviewActions);
    designerModel.parts = [
        { id: constants_1.PreviewElements.Toolbar, templateName: constants_1.PreviewElements.Toolbar, model: { actionLists: actionLists, keyboardHelper: new analytics_internal_1.ToolbarKeyboardHelper(actionLists.toolbarItems), canSwitchToDesigner: reportPreview.canSwitchToDesigner } },
        { id: constants_1.PreviewElements.Surface, templateName: constants_1.PreviewElements.Surface, model: designerModel.reportPreview },
        { id: constants_1.PreviewElements.RightPanel, templateName: constants_1.PreviewElements.RightPanel, model: designerModel },
        { id: constants_1.PreviewElements.ExportTool, templateName: constants_1.PreviewElements.ExportTool, model: designerModel.reportPreview.exportHandler }
    ];
    callbacks && callbacks.customizeParts && callbacks.customizeParts(designerModel.parts);
    var $window = $(window);
    var timers = [];
    var updateProgressPosition = _progressBarUtils_1.getUpdateProgressBarCallback(bindingModel.progressBarSettings, designerModel, reportPreview, bindingElement, $window);
    var updatePreviewContentSize_ = _sizeUtils_1.updatePreviewContentSize(reportPreview.previewSize, bindingElement, bindingModel.rtl);
    if (bindingModel.tabPanelSettings) {
        bindingModel.tabPanelSettings.width && tabPanel.width(parseInt(bindingModel.tabPanelSettings.width));
        bindingModel.tabPanelSettings.position && tabPanel.position(bindingModel.tabPanelSettings.position);
    }
    var updateSizesCallback = function () {
        updatePreviewContentSize_ && updatePreviewContentSize_(tabPanel.position());
        updateProgressPosition && updateProgressPosition();
    };
    designerModel.updateSurfaceSize = updateSizesCallback;
    designerModel.resizeCallback = updateSizesCallback;
    window.addEventListener('resize', designerModel.resizeCallback);
    designerModel._addDisposable(fullscreenEnabled);
    designerModel._addDisposable(fullscreenEnabled.subscribe(designerModel.resizeCallback));
    designerModel._addDisposable(tabPanel.width.subscribe(function () {
        timers.push(setTimeout(function () { return updatePreviewContentSize_(tabPanel.position()); }, 1));
    }));
    designerModel._addDisposable(tabPanel.position.subscribe(function (newVal) {
        updatePreviewContentSize_(newVal);
    }));
    designerModel._addDisposable(tabPanel.isEmpty.subscribe(function () {
        timers.push(setTimeout(function () {
            updatePreviewContentSize_(tabPanel.position());
        }, 1));
    }));
    updateSizesCallback();
    designerModel._addDisposable({
        dispose: function () {
            window.removeEventListener('resize', designerModel.resizeCallback);
            designerModel.updateSurfaceSize = null;
            designerModel.resizeCallback = null;
            timers.forEach(function (x) { return clearTimeout(x); });
            updatePreviewContentSize_ = null;
            updateProgressPosition = null;
        }
    });
    analytics_internal_1.appendStaticContextToRootViewModel(designerModel, {
        _static: __assign({}, analytics_internal_1.staticContext._static, { formatSearchResult: _utils_2.formatSearchResult })
    }, 'dx-report-viewer');
    if (bindingElement && !reportPreview.canSwitchToDesigner && bindingSettings.applyBindings) {
        callbacks.beforeRender && callbacks.beforeRender(designerModel);
        $(bindingElement).children().remove();
        ko.applyBindings(designerModel, bindingElement);
    }
    return designerModel;
}
exports.createDesktopPreview = createDesktopPreview;
function _createPreview(bindingSettings) {
    var bindingModel = bindingSettings.model;
    bindingModel.previewVisible = bindingModel.previewVisible !== undefined ? bindingModel.previewVisible : true;
    bindingModel.allowURLsWithJSContent = bindingModel.allowURLsWithJSContent !== undefined ? bindingModel.allowURLsWithJSContent : false;
    bindingModel.accessibilityCompliant = bindingModel.accessibilityCompliant !== undefined ? bindingModel.accessibilityCompliant : false;
    bindingSettings.applyBindings = bindingSettings.applyBindings !== undefined ? bindingSettings.applyBindings : true;
    var disposableCallback = bindingSettings.callbacks && bindingSettings.callbacks.onServerError && analytics_internal_1.processErrorEvent(bindingSettings.callbacks.onServerError);
    config_1.default({ rtlEnabled: !!bindingModel.rtl });
    if (bindingModel.remoteSettings && (bindingModel.remoteSettings.authToken || bindingModel.remoteSettings.serverUri)) {
        settings_1.AsyncExportApproach(true);
        bindingModel.handlerUri = analytics_internal_1.RequestHelper.generateUri(bindingModel.remoteSettings.serverUri, settings_1.ReportServerInvokeUri);
        settings_1.SearchAvailable(false);
        settings_1.EditablePreviewEnabled(false);
        settings_1.ReportServerDownloadUri(analytics_internal_1.RequestHelper.generateUri(bindingModel.remoteSettings.serverUri, settings_1.ReportServerExportUri));
        if (bindingModel.remoteSettings.authToken) {
            analytics_utils_1.ajaxSetup.ajaxSettings = {
                headers: {
                    'Authorization': 'Bearer ' + bindingModel.remoteSettings.authToken
                }
            };
        }
    }
    var designerModel;
    if (bindingModel.isMobile) {
        designerModel = _mobileInitializer_1.createMobilePreview(bindingSettings);
    }
    else {
        designerModel = createDesktopPreview(bindingSettings);
    }
    if (disposableCallback) {
        designerModel._addDisposable(disposableCallback);
    }
    return designerModel;
}
function createPreview(bindingSettings) {
    if (bindingSettings.model && bindingSettings.model.localization) {
        analytics_utils_1.addCultureInfo({
            messages: bindingSettings.model.localization
        });
    }
    var localizationCallbacks = [];
    bindingSettings.callbacks && bindingSettings.callbacks.customizeLocalization && bindingSettings.callbacks.customizeLocalization(localizationCallbacks);
    return analytics_internal_1.resolveFromPromises(localizationCallbacks, function () {
        return _createPreview(bindingSettings);
    });
}
exports.createPreview = createPreview;
function createAndInitPreviewModel(viewerModel, element, callbacks, applyBindings) {
    return createPreviewModel(viewerModel, element, callbacks, applyBindings).done(function (previewModel) {
        initPreviewModel(previewModel, viewerModel);
    });
}
exports.createAndInitPreviewModel = createAndInitPreviewModel;
function createPreviewModel(viewerModel, element, callbacks, applyBindings) {
    analytics_internal_1.initGlobalize(viewerModel);
    return createPreview({ model: viewerModel, element: element, callbacks: callbacks, applyBindings: applyBindings }).done(function () {
        $.extend(true, _utils_1.cultureInfo, viewerModel.cultureInfoList);
    });
}
exports.createPreviewModel = createPreviewModel;
function initPreviewModel(previewModel, viewerModel) {
    if (viewerModel.reportId || viewerModel.documentId) {
        previewModel.reportPreview.initialize($.Deferred().resolve(viewerModel).promise());
    }
    else {
        var unwrappedUrl = ko.unwrap(viewerModel.reportUrl);
        if (unwrappedUrl) {
            previewModel.OpenReport(unwrappedUrl);
        }
    }
}
exports.initPreviewModel = initPreviewModel;
