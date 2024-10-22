﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_reportExplorerDragDropHandler.js)
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
var _reportControlsDragDropHelper_1 = require("./_reportControlsDragDropHelper");
var xrReport_1 = require("../../controls/xrReport");
var formattingrules_1 = require("../../controls/properties/formattingrules");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var ko = require("knockout");
var ReportExplorerDragDropHandler = (function (_super) {
    __extends(ReportExplorerDragDropHandler, _super);
    function ReportExplorerDragDropHandler(_canAddItems, surface, selection, undoEngine, dragHelperContent) {
        var _this = _super.call(this, surface, selection, undoEngine, null, dragHelperContent) || this;
        _this._canAddItems = _canAddItems;
        _this.undoEngine = undoEngine;
        _this._lastList = null;
        _this._timeout = null;
        _this._isStyle = function (item) { return item.data && item.data.specifics === 'stylemodel'; };
        _this._isFormatingRule = function (item) { return item.data && item.data.specifics === 'formattingrule'; };
        _this._isReportControl = function (item) { return !_this._isStyle(item) && !_this._isFormatingRule(item); };
        _this.cursor = 'arrow';
        _this.alwaysAlt = true;
        _this.containment = '.dxrd-designer';
        _this['cursorAt'] = {
            top: 0,
            left: 0
        };
        _this.reportControlsDragDropHelper = new _reportControlsDragDropHelper_1.ReportControlsDragDropHelper(_this.dragHelperContent, _this.undoEngine && _this.undoEngine());
        _this.helper = function (draggable, event) {
            var item = draggable;
            _utils_1.selectTreeListItem(item, event);
            if (_this._isReportControl(item)) {
                _this.reportControlsDragDropHelper.helper(draggable, event);
            }
            else {
                var rect = new analytics_elements_1.Rectangle(12, 12, 12, 12);
                var templateId = '';
                if (_this._isStyle(item)) {
                    rect.className = 'dxrd-image-ghost-stylemodel';
                    templateId = 'dxrd-svg-reportexplorer-style';
                }
                else if (_this._isFormatingRule(item)) {
                    rect.className = 'dxrd-image-ghost-formattingrule';
                    templateId = 'dxrd-svg-reportexplorer-formatting_rule';
                }
                _this.dragHelperContent.reset();
                dragHelperContent.setContent(rect, (templateId ? { template: templateId } : null));
                _this._size.width(12);
                _this._size.height(12);
            }
        };
        return _this;
    }
    ReportExplorerDragDropHandler.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.reportControlsDragDropHelper.dispose();
    };
    ReportExplorerDragDropHandler.prototype.startDrag = function (draggable) {
        if (this._isReportControl(draggable)) {
            this.reportControlsDragDropHelper.start(draggable);
        }
        _super.prototype.startDrag.call(this, draggable);
    };
    ReportExplorerDragDropHandler.prototype.drag = function (event, ui) {
        var _this = this;
        var isLocked = this.selection.dropTarget && this.selection.dropTarget.locked;
        if (this.reportControlsDragDropHelper.started) {
            var target = event['toElement'] || (ko.dataFor(event.relatedTarget) && event.relatedTarget) || (event.originalEvent && event.originalEvent.target) || null;
            if (target) {
                this.reportControlsDragDropHelper.setNewDropTarget(ko.dataFor(target), target, event.pageY);
            }
            var _target = this.reportControlsDragDropHelper['_target'];
            if (_target && _target.hasItems && (_target.collapsed && _target.collapsed())) {
                if (this._lastList !== _target) {
                    this._timeout && clearTimeout(this._timeout);
                    this._lastList = _target;
                    this._timeout = setTimeout(function () {
                        _this._lastList.toggleCollapsed();
                    }, 500);
                }
            }
            else {
                this._lastList = null;
                this._timeout && clearTimeout(this._timeout);
            }
            isLocked = isLocked || !this._canAddItems();
        }
        this.dragHelperContent.isLocked(isLocked);
    };
    ReportExplorerDragDropHandler.prototype.doStopDrag = function (ui, draggable, event) {
        this.reportControlsDragDropHelper.started && this.reportControlsDragDropHelper.clearDroppableClasses();
        this.dragHelperContent.reset();
        if (this.dragHelperContent.isLocked())
            return;
        if (this.reportControlsDragDropHelper.started) {
            this.selection.initialize(this.reportControlsDragDropHelper.stop());
        }
        else if (this.selection.dropTarget && !this.selection.dropTarget.locked) {
            if (this.selection.dropTarget instanceof xrReport_1.ReportSurface)
                return;
            var position = this._getAbsoluteSurfacePosition(ui);
            this.selection.dropTarget.underCursor().x = position.left - this.selection.dropTarget['absolutePosition'].x();
            this.selection.dropTarget.underCursor().y = position.top - this.selection.dropTarget['absolutePosition'].y();
            if (this.surface().isFit && this.surface().isFit(this.selection.dropTarget) || this.selection.dropTarget.underCursor().isOver) {
                if (draggable.data && draggable.data.specifics === 'stylemodel') {
                    this.selection.dropTarget.getControlModel()['styleName'] && this.selection.dropTarget.getControlModel()['styleName'](draggable.data.displayName);
                }
                else if (draggable.data && draggable.data.specifics === 'formattingrule') {
                    this.selection.dropTarget.getControlModel()['formattingRuleLinks'] && this.selection.dropTarget.getControlModel()['formattingRuleLinks'].push(formattingrules_1.FormattingRuleLink.createNew(draggable.data.data));
                }
            }
        }
    };
    return ReportExplorerDragDropHandler;
}(analytics_internal_1.DragDropHandler));
exports.ReportExplorerDragDropHandler = ReportExplorerDragDropHandler;
