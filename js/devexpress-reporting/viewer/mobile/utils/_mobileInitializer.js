﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\utils\_mobileInitializer.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mobilePreview_1 = require("../mobilePreview");
var _mobileSearch_1 = require("../internal/_mobileSearch");
var _galleryModel_1 = require("../internal/gallery/_galleryModel");
var _paginator_1 = require("../internal/_paginator");
var previewParametersViewModel_1 = require("../../parameters/previewParametersViewModel");
var _previewRequestWrapper_1 = require("../../internal/_previewRequestWrapper");
var _sizeUtils_1 = require("../internal/_sizeUtils");
var _mobilePreviewParameterHelper_1 = require("../internal/_mobilePreviewParameterHelper");
var exportOptionsModel_1 = require("../../exportOptions/exportOptionsModel");
var constants_1 = require("../../constants");
var _mobileActionList_1 = require("./_mobileActionList");
var _mobilePreviewModel_1 = require("../internal/_mobilePreviewModel");
var _parametersPopup_1 = require("../internal/_parametersPopup");
var constants_2 = require("../constants");
var _progressBarUtils_1 = require("../../internal/_progressBarUtils");
var _sizeUtils_2 = require("../../internal/_sizeUtils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var $ = require("jquery");
function createMobilePreview(bindingSettings) {
    var callbacks = bindingSettings.callbacks;
    var bindingModel = bindingSettings.model;
    var bindingElement = bindingSettings.element;
    var previewWrapper = new _previewRequestWrapper_1.PreviewRequestWrapper(null, callbacks), reportPreview = new mobilePreview_1.MobileReportPreview(bindingModel.handlerUri, previewWrapper, undefined, callbacks, undefined, bindingModel.mobileModeSettings);
    var $root = $(bindingElement);
    var updatePreviewContentSize_ = _sizeUtils_1.updatePreviewContentSizeMobile(reportPreview.previewWrapperSize, $root);
    updatePreviewContentSize_();
    var gallery = new _galleryModel_1.GalleryModel(reportPreview, reportPreview.previewWrapperSize);
    var searchModel = new _mobileSearch_1.MobileSearchViewModel(reportPreview, gallery);
    var parametersModel = new previewParametersViewModel_1.PreviewParametersViewModel(reportPreview, new _mobilePreviewParameterHelper_1.MobilePreviewParameterHelper(bindingModel.parametersInfo && bindingModel.parametersInfo.knownEnums, callbacks));
    var exportModel = new exportOptionsModel_1.ExportOptionsModel(reportPreview);
    reportPreview.allowURLsWithJSContent = bindingModel.allowURLsWithJSContent;
    previewWrapper.initialize(reportPreview, parametersModel, searchModel);
    var exportTypes = ko.observableArray([
        constants_1.ExportFormatID.PDF, constants_1.ExportFormatID.XLS, constants_1.ExportFormatID.XLSX,
        constants_1.ExportFormatID.RTF, constants_1.ExportFormatID.DOCX, constants_1.ExportFormatID.HTML,
        constants_1.ExportFormatID.Text, constants_1.ExportFormatID.CSV, constants_1.ExportFormatID.Image
    ]);
    var mobileActions = _mobileActionList_1.getPreviewActionsMobile({ reportPreview: reportPreview, exportModel: exportModel, parametersModel: parametersModel, searchModel: searchModel, exportTypes: exportTypes, callbacks: callbacks });
    reportPreview.pageIndex.subscribe(function (newVal) { mobileActions.visible(false); });
    reportPreview.actionsVisible = mobileActions.visible;
    var designerModelOptions = {
        rootStyle: 'dxrd-preview dxrdp-mobile dxd-back-primary',
        reportPreview: reportPreview,
        parametersModel: parametersModel,
        exportModel: exportModel,
        searchModel: searchModel,
        rtl: reportPreview.rtlViewer,
        brickEventsDisabled: ko.observable(false),
        gallery: gallery,
        paginator: new _paginator_1.MobilePaginator(reportPreview, gallery),
        availableFormats: exportTypes
    };
    var designerModel = new _mobilePreviewModel_1.MobilePreviewModel(designerModelOptions);
    designerModel.slideOptions = {
        dispose: function () {
            var model = designerModel.slideOptions;
            if (ko.isComputed(model.swipeEnabled))
                model.swipeEnabled.dispose();
            if (ko.isComputed(model.scrollAvailable))
                model.scrollAvailable.dispose();
        },
        readerMode: reportPreview.readerMode,
        animationSettings: reportPreview.animationSettings,
        searchPanel: searchModel,
        topOffset: reportPreview.topOffset,
        previewWrapperSize: reportPreview.previewWrapperSize,
        reachedTop: reportPreview.scrollReachedTop,
        reachedLeft: reportPreview.scrollReachedLeft,
        reachedRight: reportPreview.scrollReachedRight,
        scrollAvailable: ko.computed(function () {
            return !(reportPreview.scrollReachedTop() && reportPreview.scrollReachedLeft()
                && reportPreview.scrollReachedRight() && reportPreview.scrollReachedBottom());
        }),
        disabled: reportPreview.interactionDisabled,
        swipeEnabled: ko.computed(function () {
            if (reportPreview.zoomUpdating()) {
                return false;
            }
            if (searchModel.height() > 0 && !searchModel.editorVisible()) {
                return false;
            }
            if (!reportPreview.scrollReachedLeft() && !reportPreview.scrollReachedRight()) {
                return false;
            }
            return true;
        }),
        autoFitBy: reportPreview.autoFitBy,
        galleryIsAnimated: gallery.isAnimated,
        repaintTimeout: gallery.repaintTimeout,
        zoomUpdating: reportPreview.zoomUpdating,
        brickEventsDisabled: designerModel.brickEventsDisabled
    };
    var parametersPopup = new _parametersPopup_1.ParametersPopupModel(parametersModel, reportPreview);
    designerModel.parts = [
        { id: constants_2.MobilePreviewElements.Surface, templateName: constants_2.MobilePreviewElements.Surface, model: designerModel.reportPreview },
        { id: constants_2.MobilePreviewElements.Search, templateName: constants_2.MobilePreviewElements.Search, model: designerModel.searchModel },
        { id: constants_2.MobilePreviewElements.Pages, templateName: constants_2.MobilePreviewElements.Pages, model: designerModel.paginator },
        { id: constants_2.MobilePreviewElements.MobileActions, templateName: constants_2.MobilePreviewElements.MobileActions, model: mobileActions },
        { id: constants_2.MobilePreviewElements.Parameters, templateName: constants_2.MobilePreviewElements.Parameters, model: parametersPopup },
        { id: constants_1.PreviewElements.ExportTool, templateName: constants_1.PreviewElements.ExportTool, model: designerModel.reportPreview.exportHandler }
    ];
    callbacks && callbacks.customizeParts && callbacks.customizeParts(designerModel.parts);
    var $actions = $root.find('.dxrdp-mobile-actions');
    var $window = $(window);
    var updateProgressPosition = _progressBarUtils_1.getUpdateProgressBarCallback(bindingModel.progressBarSettings, designerModel, reportPreview, bindingElement, $window);
    var updateMobilePreviewActionsPosition_ = _sizeUtils_2.getDockedElementCallback($actions, $root, $window, '.dxrdp-mobile-actions');
    var updateSizesCallback = function () {
        updatePreviewContentSize_ && updatePreviewContentSize_();
        updateProgressPosition && updateProgressPosition();
    };
    designerModel.updateSurfaceSize = updateSizesCallback;
    designerModel.resizeCallback = function () {
        if (parametersModel.popupInfo.visible()) {
            parametersPopup.initVisibilityIcons();
        }
        updateSizesCallback();
        if (reportPreview.actionsVisible())
            updateMobilePreviewActionsPosition_(bindingElement);
    };
    window.addEventListener('resize', designerModel.resizeCallback);
    var onScroll = function () {
        if (reportPreview.actionsVisible())
            updateMobilePreviewActionsPosition_(bindingElement);
    };
    window.addEventListener('scroll', onScroll);
    designerModel._addDisposable({
        dispose: function () {
            window.removeEventListener('resize', designerModel.resizeCallback);
            window.removeEventListener('scroll', onScroll);
            designerModel.slideOptions.dispose();
            mobileActions.dispose();
        }
    });
    designerModel._addDisposable(reportPreview.actionsVisible.subscribe(function (newValue) {
        if (newValue)
            updateMobilePreviewActionsPosition_(bindingElement);
    }));
    analytics_internal_1.appendStaticContextToRootViewModel(designerModel, analytics_internal_1.staticContext);
    if (bindingElement && !reportPreview.canSwitchToDesigner && bindingSettings.applyBindings) {
        callbacks.beforeRender && callbacks.beforeRender(designerModel);
        $(bindingElement).children().remove();
        ko.applyBindings(designerModel, bindingElement);
    }
    return designerModel;
}
exports.createMobilePreview = createMobilePreview;
