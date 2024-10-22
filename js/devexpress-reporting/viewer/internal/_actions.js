﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_actions.js)
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
var constants_1 = require("../constants");
var settings_1 = require("../settings");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var PreviewDesignerActions = (function (_super) {
    __extends(PreviewDesignerActions, _super);
    function PreviewDesignerActions(reportPreview, fullscreen) {
        var _this = _super.call(this) || this;
        _this.actions = [];
        var designAction = {
            id: constants_1.ActionId.Design,
            text: 'Design',
            displayText: function () { return analytics_utils_1.getLocalization('Design', 'ASPxReportsStringId.ToolBarItemText_Design'); },
            imageClassName: 'dxrd-image-design',
            imageTemplateName: 'dxrd-svg-preview-report_designer',
            templateName: reportPreview.canSwitchToDesigner ? 'dxrd-toolbar-two-way-switch' : undefined,
            disabled: ko.observable(false),
            visible: reportPreview.canSwitchToDesigner,
            hotKey: { ctrlKey: true, keyCode: 68 },
            clickAction: function () {
                reportPreview.previewVisible(false);
                reportPreview.deactivate();
            }
        };
        designAction.contentData = {
            items: [
                { itemData: designAction, active: false },
                { getDisplayText: function () { return analytics_utils_1.getLocalization('Preview', 'ASPxReportsStringId.ToolBarItemText_Preview'); }, active: true }
            ]
        };
        _this.actions.push(designAction);
        _this.actions.push({
            id: constants_1.ActionId.FullScreen,
            text: analytics_utils_1.getLocalization('Full Screen', 'ASPxReportsStringId.ToolBarItemText_FullScreen'),
            imageClassName: 'dxrd-image-fullscreen',
            imageTemplateName: function () { return fullscreen() ? 'dxrd-svg-toolbar-fullscreen-exit' : 'dxrd-svg-toolbar-fullscreen'; },
            disabled: ko.observable(false),
            visible: !reportPreview.canSwitchToDesigner,
            selected: fullscreen,
            clickAction: function () {
                fullscreen(!fullscreen());
            }
        });
        _this._disposables.push(fullscreen);
        return _this;
    }
    PreviewDesignerActions.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeProperties();
    };
    PreviewDesignerActions.prototype.getActions = function (context) {
        return this.actions;
    };
    return PreviewDesignerActions;
}(analytics_utils_1.Disposable));
exports.PreviewDesignerActions = PreviewDesignerActions;
var ActionLists = (function (_super) {
    __extends(ActionLists, _super);
    function ActionLists(reportPreview, globalActionProviders, customizeActions, enabled) {
        var _this = _super.call(this, enabled) || this;
        _this._reportPreview = reportPreview;
        _this.globalActionProviders = globalActionProviders;
        _this.toolbarItems = ko.computed(function () {
            var globalActions = [];
            globalActionProviders().forEach(function (actionProvider) {
                globalActions.push.apply(globalActions, actionProvider.getActions(reportPreview));
            });
            customizeActions && customizeActions(globalActions);
            return globalActions;
        });
        _this._disposables.push(_this.toolbarItems);
        return _this;
    }
    ActionLists.prototype.processShortcut = function (actions, e) {
        if (this.shouldIgnoreProcessing(e))
            return;
        _super.prototype.processShortcut.call(this, actions, e);
    };
    ActionLists.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.resetObservableArray(this.globalActionProviders);
        this.removeProperties();
    };
    return ActionLists;
}(analytics_internal_1.ActionListsBase));
exports.ActionLists = ActionLists;
var PreviewActions = (function (_super) {
    __extends(PreviewActions, _super);
    function PreviewActions(reportPreview) {
        var _this = _super.call(this) || this;
        _this.actions = [];
        var printDisabled = reportPreview.exportDisabled;
        _this.actions.push({
            id: constants_1.ActionId.FirstPage,
            text: analytics_utils_1.getLocalization('First Page', 'ASPxReportsStringId.DocumentViewer_RibbonCommandText_FirstPage'),
            imageClassName: 'dxrd-image-preview-first',
            imageTemplateName: 'dxrd-svg-preview-first_page',
            disabled: _this.wrapDisposable(ko.pureComputed(function () { return reportPreview.pageIndex() < 1; })),
            visible: _this.wrapDisposable(ko.pureComputed(function () { return reportPreview.previewVisible(); })),
            hotKey: { ctrlKey: true, keyCode: 37 },
            clickAction: function () {
                if (reportPreview.pageIndex() > 0) {
                    reportPreview.goToPage(0);
                }
            }
        });
        _this.actions.push({
            id: constants_1.ActionId.PrevPage,
            text: analytics_utils_1.getLocalization('Previous Page', 'ASPxReportsStringId.ToolBarItemText_PreviousPage'),
            imageClassName: 'dxrd-image-preview-prev',
            imageTemplateName: 'dxrd-svg-preview-previous_page',
            disabled: _this.wrapDisposable(ko.pureComputed(function () { return reportPreview.pageIndex() < 1; })),
            visible: _this.wrapDisposable(ko.pureComputed(function () { return reportPreview.previewVisible(); })),
            hotKey: { ctrlKey: false, keyCode: 37 },
            clickAction: function () {
                if (reportPreview.pageIndex() >= 1) {
                    reportPreview.goToPage(reportPreview.pageIndex() - 1, false, 500);
                }
            },
        });
        var paginationSelectBoxViewModel = {
            id: constants_1.ActionId.Pagination,
            text: 'Pagination',
            imageClassName: 'dxrd-image-pager',
            disabled: _this.wrapDisposable(ko.pureComputed(function () { return reportPreview.pages().length === 0 || reportPreview.pageIndex() === -1; })),
            visible: _this.wrapDisposable(ko.pureComputed(function () { return reportPreview.previewVisible(); })),
            clickAction: $.noop,
            selectedItem: _this.wrapDisposable(ko.pureComputed({
                read: function () {
                    if (reportPreview.pageIndex() < 0) {
                        return null;
                    }
                    var items = paginationSelectBoxViewModel.pageItems();
                    return items && items.store && (items.store.length > reportPreview.pageIndex()) && items.store[reportPreview.pageIndex()];
                },
                write: function (newValue) {
                    if (!!newValue && (newValue.index || newValue.index === 0)) {
                        reportPreview.goToPage(newValue.index);
                    }
                },
                deferEvaluation: true
            })),
            pageItems: _this.wrapDisposable(ko.pureComputed(function () {
                var pageCount = reportPreview.pages().length;
                if (pageCount === 0 || reportPreview.pageIndex.peek() === -1) {
                    return [];
                }
                var pagesArray = new Array();
                for (var i = 0; i < pageCount;) {
                    pagesArray.push({ index: i, text: ++i });
                }
                return {
                    store: pagesArray,
                    paginate: pageCount > 200,
                    pageSize: 100
                };
            })),
            currentPage: reportPreview._currentPageText,
            focusOut: function (e) {
                if (!paginationSelectBoxViewModel._isPageChanged(e.component.option('text'))) {
                    reportPreview._currentPageText.notifySubscribers(reportPreview._currentPageText());
                }
            },
            keyUp: function (e) {
                if (e.event.which !== 13)
                    return;
                if (paginationSelectBoxViewModel._isPageChanged(e.component.option('text'))) {
                    paginationSelectBoxViewModel.opened(false);
                }
            },
            _isPageChanged: function (value) {
                var val = parseInt && parseInt(value);
                if (!!val && val-- > 0 && val < reportPreview.pages().length) {
                    reportPreview.goToPage(val);
                    return true;
                }
                return false;
            },
            displayExpr: function (value) {
                var pageIndex = reportPreview.pageIndex.peek();
                if (pageIndex === -1 || !value || pageIndex === value.index) {
                    return reportPreview._currentPageText.peek();
                }
                else {
                    return value.text;
                }
            },
            itemTemplate: function (value) { return value.text; },
            searchMode: 'startswith',
            searchEnabled: ko.observable(true),
            searchTimeout: 10,
            opened: ko.observable(false),
            templateName: 'dxrd-preview-pager'
        };
        _this.actions.push(paginationSelectBoxViewModel);
        _this.actions.push({
            id: constants_1.ActionId.NextPage,
            text: analytics_utils_1.getLocalization('Next Page', 'ASPxReportsStringId.ToolBarItemText_NextPage'),
            imageClassName: 'dxrd-image-preview-next',
            imageTemplateName: 'dxrd-svg-preview-next_page',
            disabled: _this.wrapDisposable(ko.pureComputed(function () { return reportPreview.pageIndex() < 0 || reportPreview.pageIndex() >= reportPreview.pages().length - 1; })),
            visible: _this.wrapDisposable(ko.pureComputed(function () { return reportPreview.previewVisible(); })),
            hotKey: { ctrlKey: false, keyCode: 39 },
            clickAction: function () {
                if (reportPreview.pageIndex() < reportPreview.pages().length - 1) {
                    reportPreview.goToPage(reportPreview.pageIndex() + 1, false, 500);
                }
            }
        });
        _this.actions.push({
            id: constants_1.ActionId.LastPage,
            text: analytics_utils_1.getLocalization('Last Page', 'ASPxReportsStringId.DocumentViewer_RibbonCommandText_LastPage'),
            imageClassName: 'dxrd-image-preview-last',
            imageTemplateName: 'dxrd-svg-preview-last_page',
            disabled: _this.wrapDisposable(ko.pureComputed(function () { return reportPreview.pageIndex() < 0 || reportPreview.pageIndex() >= reportPreview.pages().length - 1; })),
            visible: _this.wrapDisposable(ko.pureComputed(function () { return reportPreview.previewVisible(); })),
            hotKey: { ctrlKey: true, keyCode: 39 },
            clickAction: function () {
                if (reportPreview.pageIndex() < reportPreview.pages().length - 1) {
                    reportPreview.goToPage(reportPreview.pages().length - 1);
                }
            }
        });
        _this.actions.push({
            id: constants_1.ActionId.MultipageToggle,
            text: analytics_utils_1.getLocalization('Toggle Multipage Mode', 'ASPxReportsStringId.WebDocumentViewer_ToggleMultipageMode'),
            imageClassName: _this.wrapDisposable(ko.pureComputed(function () { return reportPreview.showMultipagePreview() ? 'dxrd-image-preview-single-page' : 'dxrd-image-preview-multipage'; })),
            imageTemplateName: _this.wrapDisposable(ko.pureComputed(function () { return reportPreview.showMultipagePreview() ? 'dxrd-svg-preview-single_page' : 'dxrd-svg-preview-multi_page_preview'; })),
            disabled: ko.observable(false),
            visible: _this.wrapDisposable(ko.pureComputed(function () { return reportPreview.previewVisible(); })),
            hotKey: { ctrlKey: true, keyCode: 77 },
            clickAction: function () {
                var zoom = reportPreview._zoom();
                reportPreview.showMultipagePreview(!reportPreview.showMultipagePreview());
                reportPreview.zoom(zoom);
            },
            hasSeparator: true
        });
        _this.actions.push({
            id: constants_1.ActionId.ZoomOut,
            text: analytics_utils_1.getLocalization('Zoom Out', 'DevExpress.XtraPrinting.PrintingSystemCommand.ZoomOut'),
            imageClassName: 'dxrd-image-zoomout',
            imageTemplateName: 'dxrd-svg-toolbar-zoomout',
            disabled: ko.observable(false),
            visible: true,
            zoomStep: reportPreview.zoomStep,
            hotKey: { ctrlKey: false, keyCode: 109 },
            clickAction: function () {
                var currentZoom = reportPreview.zoom();
                var zoomLevel = currentZoom > 0 ? currentZoom : reportPreview._zoom();
                reportPreview.zoom(Math.max(zoomLevel - reportPreview.zoomStep(), 0.1));
            },
            hasSeparator: true
        });
        _this.actions.push({
            id: constants_1.ActionId.ZoomSelector,
            text: analytics_utils_1.getLocalization('Zoom to Whole Page', 'DevExpress.XtraPrinting.PrintingSystemCommand.ZoomToWholePage'),
            imageClassName: 'dxrd-image-zoom',
            disabled: ko.observable(false),
            visible: true,
            hotKey: { ctrlKey: true, keyCode: 187 },
            clickAction: function () {
                reportPreview.zoom(0);
            },
            templateName: 'dxrd-zoom-autofit-select-template',
            displayExpr: function (val) {
                if (val === constants_1.ZoomAutoBy.PageWidth) {
                    return analytics_utils_1.getLocalization('Page Width', 'DevExpress.XtraReports.UI.XtraReport.PageWidth');
                }
                else if (Math.round(val * 100) === 0) {
                    return analytics_utils_1.getLocalization('Whole Page', 'PreviewStringId.MenuItem_ZoomWholePage');
                }
                else {
                    return Math.round((val || reportPreview.zoom.peek()) * 100) + '%';
                }
            },
            onCustomItemCreating: function (e) { e.customItem = analytics_internal_1.parseZoom(e.text); },
            zoom: reportPreview.zoom,
            zoomLevels: reportPreview.predefinedZoomLevels,
            zoomItems: _this.wrapDisposable(ko.pureComputed(function () {
                var items = reportPreview.predefinedZoomLevels.slice(0);
                if (reportPreview.showMultipagePreview() === false && items.indexOf(0) === -1) {
                    items.push(constants_1.ZoomAutoBy.PageWidth);
                    items.push(constants_1.ZoomAutoBy.WholePage);
                }
                return items;
            }))
        });
        _this.actions.push({
            id: constants_1.ActionId.ZoomIn,
            text: analytics_utils_1.getLocalization('Zoom In', 'DevExpress.XtraPrinting.PrintingSystemCommand.ZoomIn'),
            imageClassName: 'dxrd-image-zoomin',
            imageTemplateName: 'dxrd-svg-toolbar-zoomin',
            disabled: ko.observable(false),
            visible: true,
            zoomStep: reportPreview.zoomStep,
            hotKey: { ctrlKey: false, keyCode: 107 },
            clickAction: function () {
                var currentZoom = reportPreview.zoom();
                var zoomLevel = currentZoom > 0 ? currentZoom : reportPreview._zoom();
                reportPreview.zoom(Math.min(zoomLevel + reportPreview.zoomStep(), 10));
            }
        });
        _this.actions.push({
            id: constants_1.ActionId.HighlightEditingFields,
            text: analytics_utils_1.getLocalization('Highlight Editing Fields', 'DevExpress.XtraPrinting.PrintingSystemCommand.HighlightEditingFields'),
            imageClassName: 'dxrp-image-hightlight-editing-fields',
            imageTemplateName: 'dxrd-svg-toolbar-hightlightEditingFields',
            disabled: _this.wrapDisposable(ko.pureComputed(function () { return reportPreview.editingFieldsProvider().length < 1; })),
            visible: _this.wrapDisposable(ko.pureComputed(function () {
                var available = settings_1.EditablePreviewEnabled();
                var viewerVisible = reportPreview.previewVisible();
                return available && viewerVisible;
            })),
            selected: _this.wrapDisposable(ko.pureComputed(function () { return reportPreview.editingFieldsHighlighted(); })),
            hotKey: { ctrlKey: true, keyCode: 72 },
            clickAction: function () {
                reportPreview.editingFieldsHighlighted(!reportPreview.editingFieldsHighlighted());
            },
            hasSeparator: true
        });
        _this.actions.push({
            id: constants_1.ActionId.Print,
            text: analytics_utils_1.getLocalization('Print', 'ASPxReportsStringId.DocumentViewer_RibbonPrintGroupText'),
            imageClassName: 'dxrd-image-print',
            imageTemplateName: 'dxrd-svg-preview-print',
            hasSeparator: true,
            disabled: printDisabled,
            visible: true,
            hotKey: { ctrlKey: true, keyCode: 80 },
            clickAction: function () {
                if (printDisabled()) {
                    return;
                }
                reportPreview.printDocument();
            }
        });
        _this.actions.push({
            id: constants_1.ActionId.PrintPage,
            text: analytics_utils_1.getLocalization('Print Page', 'ASPxReportsStringId.DocumentViewer_RibbonCommandText_PrintPage'),
            imageClassName: 'dxrd-image-print-page',
            imageTemplateName: 'dxrd-svg-preview-print_page',
            disabled: printDisabled,
            visible: true,
            clickAction: function () {
                if (printDisabled()) {
                    return;
                }
                reportPreview.printDocument(reportPreview.pageIndex());
            }
        });
        return _this;
    }
    PreviewActions.prototype.wrapDisposable = function (object) {
        this._disposables.push(object);
        return object;
    };
    PreviewActions.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.removeProperties();
    };
    PreviewActions.prototype.getActions = function (context) {
        return this.actions;
    };
    return PreviewActions;
}(analytics_utils_1.Disposable));
exports.PreviewActions = PreviewActions;
