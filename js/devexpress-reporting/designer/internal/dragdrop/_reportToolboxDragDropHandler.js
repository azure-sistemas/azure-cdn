﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_reportToolboxDragDropHandler.js)
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
var _utils_1 = require("./_utils");
var _utils_2 = require("../_utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var $ = require("jquery");
var _tocUtils_1 = require("../../controls/utils/_tocUtils");
var ReportToolboxDragDropHandler = (function (_super) {
    __extends(ReportToolboxDragDropHandler, _super);
    function ReportToolboxDragDropHandler(surface, selection, undoEngine, snapHelper, dragHelperContent, controlsFactory, onComponentAdded) {
        var _this = _super.call(this, surface, selection, undoEngine, snapHelper, dragHelperContent, controlsFactory) || this;
        _this._wholeWideControls = ['XRTableOfContents', 'XRPdfContent'];
        _this.onComponentAdded = function (e) { onComponentAdded && onComponentAdded(e); };
        return _this;
    }
    ReportToolboxDragDropHandler.prototype.dispose = function () {
        this.surface = null;
        this.dragHelperContent = null;
        this.snapHelper = null;
    };
    ReportToolboxDragDropHandler.prototype.helper = function (draggable) {
        _super.prototype.helper.call(this, draggable);
        var toolboxItem = draggable;
        if (this._wholeWideControls.indexOf(toolboxItem.type) !== -1) {
            var width = this.surface().pageWidth() - (this.surface().margins.right() + this.surface().margins.left());
            var height = toolboxItem.type === 'XRTableOfContents' ? 46 : 23;
            var size = new analytics_elements_1.Size(width, height);
            this.recalculateSize(size);
            this.dragHelperContent.reset();
            this.dragHelperContent.setContent(new analytics_elements_1.Rectangle(0, 0, width, this._size.height()));
        }
    };
    ReportToolboxDragDropHandler.prototype._processProperty = function (propertyName, target, callback) {
        var _this = this;
        if (target instanceof Object && !$.isFunction(target)) {
            !!target[propertyName] && callback(target);
            Object.keys(target).forEach(function (name) {
                if (target[name] instanceof Object && !$.isFunction(target[name])) {
                    _this._processProperty(propertyName, target[name], callback);
                }
            });
        }
    };
    ReportToolboxDragDropHandler.prototype.doStopDrag = function (ui, draggable) {
        var reportSurface = this.surface();
        var toolboxItem = $.extend(true, {}, draggable);
        this._processProperty('@Padding', toolboxItem.info, function (target) {
            var model = analytics_elements_1.PaddingModel.from(target['@Padding']);
            analytics_elements_1.PaddingModel.unitProperties.forEach(function (name) {
                model[name](model[name]() * reportSurface.dpi() / 100);
            });
            model.dpi(reportSurface.dpi());
            target['@Padding'] = model.toString();
        });
        _super.prototype.doStopDrag.call(this, ui, toolboxItem);
    };
    ReportToolboxDragDropHandler.prototype.addControl = function (control, dropTargetSurface, size) {
        if (control.controlType === 'XRTableOfContents') {
            var dropTargetModel = dropTargetSurface.getControlModel();
            if (!_tocUtils_1.isHeaderOrFooterBandType(dropTargetModel) || !!_tocUtils_1.getExistTableOfContents(dropTargetModel)) {
                var reportSurface = this.surface();
                var reportModel = reportSurface.getControlModel();
                var targetBand = reportModel.getOrCreateBandForToC().band;
                if (!targetBand)
                    return;
                dropTargetSurface = analytics_internal_1.findSurface(targetBand);
            }
            if (!dropTargetSurface)
                return;
            var band = dropTargetSurface.getControlModel();
            var tocModel = control;
            tocModel.allLevels().forEach(function (lvl) {
                lvl.height(_utils_2.recalculateUnit(lvl.height(), band.dpi()));
            });
        }
        _super.prototype.addControl.call(this, control, dropTargetSurface, size);
        var parent = dropTargetSurface.getControlModel();
        _utils_1.dragDropComponentAdded(control, parent);
        this.onComponentAdded({ parent: parent, model: control });
    };
    return ReportToolboxDragDropHandler;
}(analytics_internal_1.ToolboxDragDropHandler));
exports.ReportToolboxDragDropHandler = ReportToolboxDragDropHandler;
