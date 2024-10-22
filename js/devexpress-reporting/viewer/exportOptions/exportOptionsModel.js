﻿/**
* DevExpress HTML/JS Reporting (viewer\exportOptions\exportOptionsModel.js)
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
var constants_1 = require("../constants");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ExportOptionsModel = (function (_super) {
    __extends(ExportOptionsModel, _super);
    function ExportOptionsModel(reportPreview, enableKeyboardSupport) {
        var _this = _super.call(this) || this;
        _this.actions = [];
        _this._reportPreview = reportPreview;
        var tabPanelVisible = ko.pureComputed(function () { return !!reportPreview.exportOptionsModel() && (!reportPreview.exportOptionsTabVisible || reportPreview.exportOptionsTabVisible()); });
        _this.tabInfo = new analytics_utils_1.TabInfo({
            text: 'Export Options',
            template: 'dxrd-preview-export-options',
            model: reportPreview.exportOptionsModel,
            keyboardHelper: enableKeyboardSupport ? new analytics_internal_1.AccordionKeyboardHelper() : undefined,
            localizationId: 'DevExpress.XtraPrinting.ExportOptions',
            imageClassName: 'properties',
            imageTemplateName: 'dxrd-svg-tabs-properties',
            visible: tabPanelVisible
        });
        var exportItems = ko.pureComputed(function () {
            var result = _this._getExportFormatItems();
            return [{
                    text: 'Export To',
                    textId: 'ASPxReportsStringId.WebDocumentViewer_ExportToText',
                    imageClassName: 'dxrd-image-export-to',
                    imageTemplateName: 'dxrd-svg-preview-export-export-to',
                    items: result
                }];
        });
        _this.actions.push({
            id: constants_1.ActionId.ExportTo,
            text: 'Export To',
            textId: 'ASPxReportsStringId.WebDocumentViewer_ExportToText',
            disabled: reportPreview.exportDisabled,
            visible: true,
            clickAction: function (model) {
                if (reportPreview.exportDisabled())
                    return;
                _this._exportDocumentByFormat(model.itemData.format);
            },
            items: exportItems,
            templateName: 'dxrd-preview-export-to',
            eventHandlers: new ExportOptionsEventHandlers()
        });
        _this._disposables.push(tabPanelVisible, _this.tabInfo, exportItems);
        return _this;
    }
    ExportOptionsModel.prototype._getExportFormatItems = function () {
        var result = [];
        var exportOptionsModel = this._reportPreview.exportOptionsModel();
        if (exportOptionsModel) {
            exportOptionsModel.pdf && result.push(constants_1.ExportFormatID.PDF);
            exportOptionsModel.xls && result.push(constants_1.ExportFormatID.XLS);
            exportOptionsModel.xlsx && result.push(constants_1.ExportFormatID.XLSX);
            exportOptionsModel.rtf && result.push(constants_1.ExportFormatID.RTF);
            exportOptionsModel.docx && result.push(constants_1.ExportFormatID.DOCX);
            exportOptionsModel.mht && result.push(constants_1.ExportFormatID.MHT);
            exportOptionsModel.html && result.push(constants_1.ExportFormatID.HTML);
            exportOptionsModel.textExportOptions && result.push(constants_1.ExportFormatID.Text);
            exportOptionsModel.csv && result.push(constants_1.ExportFormatID.CSV);
            exportOptionsModel.image && result.push(constants_1.ExportFormatID.Image);
        }
        return result;
    };
    ExportOptionsModel.prototype._exportDocumentByFormat = function (format) {
        format && this._reportPreview.exportDocumentTo(format);
    };
    ExportOptionsModel.prototype.getActions = function (context) {
        return this.actions;
    };
    ExportOptionsModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeArray(this.actions);
        this.removeProperties();
    };
    return ExportOptionsModel;
}(analytics_utils_1.Disposable));
exports.ExportOptionsModel = ExportOptionsModel;
var ExportOptionsEventHandlers = (function () {
    function ExportOptionsEventHandlers() {
    }
    ExportOptionsEventHandlers.prototype.onSubmenuShowing = function (popupContainer, element) {
        var _this = this;
        return function (e) {
            e.submenu._overlay.option('container', popupContainer);
            e.submenu._overlay.option('focusStateEnabled', false);
            e.submenu._overlay.option('position', { my: 'left top', at: 'left bottom', of: element, collision: 'none', boundary: popupContainer });
            _this._menuButton = e.component.option('focusedElement');
            e.submenu.repaint();
        };
    };
    ExportOptionsEventHandlers.prototype.onSubmenuShown = function (e) {
        var submenu = e.submenu;
        submenu.registerKeyHandler('escape', function (e) { return submenu.hide(); });
        submenu.registerKeyHandler('leftArrow', function (e) { return submenu.hide(); });
        submenu.registerKeyHandler('rightArrow', function (e) { return submenu.hide(); });
    };
    ExportOptionsEventHandlers.prototype.onSubmenuHiding = function (e) {
        if (e.model.eventHandlers._menuButton) {
            e.component.option('focusedElement', e.model.eventHandlers._menuButton);
            e.component.focus();
        }
    };
    return ExportOptionsEventHandlers;
}());
exports.ExportOptionsEventHandlers = ExportOptionsEventHandlers;
