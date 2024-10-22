﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_reportControlsDragDropHelper.js)
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
var xrBand_1 = require("../../bands/xrBand");
var utils_1 = require("../../utils/utils");
var xrReport_1 = require("../../controls/xrReport");
var xrTableRow_1 = require("../../controls/xrTableRow");
var xrTableCell_1 = require("../../controls/xrTableCell");
var xrTable_1 = require("../../controls/xrTable");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var $ = require("jquery");
var ReportControlsDragDropHelper = (function (_super) {
    __extends(ReportControlsDragDropHelper, _super);
    function ReportControlsDragDropHelper(_dragHelperContent, _undoEngine) {
        var _this = _super.call(this, _dragHelperContent) || this;
        _this._dragHelperContent = _dragHelperContent;
        _this._undoEngine = _undoEngine;
        _this._isTargetContainer = false;
        _this._orderingAreaHeight = 8;
        _this._tableControlTypes = ['XRTable', 'XRTableCell', 'XRTableRow'];
        return _this;
    }
    ReportControlsDragDropHelper.prototype._canReorder = function (currentTarget, draggableData) {
        var currentModel = this._getElementViewModel(currentTarget);
        if (xrBand_1.BandViewModel.isReorderingBand(this._draggableModel) && xrBand_1.BandViewModel.isReorderingBand(currentModel))
            return utils_1._isReorderBand(this._draggableModel.surface, currentModel);
        return currentTarget.data.specifics === draggableData.specifics ||
            (this._draggableModel.getMetaData().canDrop(currentModel.surface, this._draggableModel) &&
                !currentModel.getMetaData().isContainer && !(currentModel instanceof xrReport_1.ReportViewModel));
    };
    ReportControlsDragDropHelper.prototype._canInsertToTarget = function (targetModel) {
        var targetIsContainer = targetModel.getMetaData().isContainer || targetModel instanceof xrReport_1.ReportViewModel;
        return targetIsContainer && targetModel.surface && targetModel.surface.canDrop()
            && this._draggableModel.getMetaData().canDrop(targetModel.surface, this._draggableModel);
    };
    ReportControlsDragDropHelper.prototype._targetIsClosestOfDraggable = function (target, draggable) {
        return target === draggable || (target.parent && this._targetIsClosestOfDraggable(target.parent, draggable));
    };
    ReportControlsDragDropHelper.prototype._canDrop = function (target, targetModel) {
        var isReportExplorerTreeListItem = target instanceof analytics_widgets_internal_1.TreeListItemViewModel && target.data && target.data['data'] instanceof analytics_elements_1.ElementViewModel;
        if (!isReportExplorerTreeListItem) {
            return false;
        }
        if (this._tableControlTypes.indexOf(this._draggableModel.controlType) === -1 && (targetModel.controlType === 'XRTable' || targetModel.controlType === 'XRTableRow'))
            return false;
        return (this._draggableParent !== this._targetModel && !this._targetIsClosestOfDraggable(this._target, this._draggable) &&
            (this._canReorder(target, this._draggable.data) || this._canInsertToTarget(targetModel)));
    };
    ReportControlsDragDropHelper.prototype._insertTableChildren = function (parent, selectedEl, position, weightsCells) {
        if (weightsCells === void 0) { weightsCells = null; }
        var newChild, selectedRowHeight = 0;
        if (selectedEl['@ControlType'] === 'XRTableRow') {
            newChild = new xrTableRow_1.XRTableRowViewModel(selectedEl, parent);
            selectedRowHeight = newChild.height.peek();
        }
        else if (selectedEl['@ControlType'] === 'XRTableCell') {
            newChild = new xrTableCell_1.XRTableCellViewModel(selectedEl, parent);
        }
        parent.addChild(newChild, position);
        if (weightsCells) {
            weightsCells.splice(position, 0, parseFloat(selectedEl['@Weight']));
            weightsCells.forEach(function (weight, index) {
                parent.cells()[index].weight(weight);
            });
        }
        if (selectedRowHeight) {
            parent.size.height(parent.size.height() + selectedRowHeight);
        }
        return newChild.surface;
    };
    ReportControlsDragDropHelper.prototype._getDroppableClassName = function (isInTopOrderArea, isInBottomOrderArea) {
        var className = this.droppableClassName;
        var targetModel = this._getElementViewModel(this._target);
        if (this._canDrop(this._target, targetModel) && (!this._dragHelperContent || !this._dragHelperContent.isLocked())) {
            var canOrder = this._canReorder(this._target, this._draggable.data);
            var isDragToBottom = canOrder && this.isDragToBottom();
            className = className + ' ' + this.approveClassName;
            if (canOrder && this._draggableModel.controlType !== 'DetailReportBand') {
                className = className + ' ' + this.getDroppablePosition();
                this._isTargetContainer = false;
            }
            else if (canOrder && isDragToBottom && isInBottomOrderArea) {
                className = [className, this.classDropAfter].join(' ');
                this._isTargetContainer = false;
            }
            else if (canOrder && !isDragToBottom && isInTopOrderArea) {
                className = className + ' ' + this.classDropBefore;
                this._isTargetContainer = false;
            }
        }
        return className;
    };
    ReportControlsDragDropHelper.prototype._reorderBands = function (targetModel) {
        if (this._isTargetContainer) {
            targetModel.addChild(this._draggableModel);
        }
        else {
            this._undoEngine && this._undoEngine.start();
            this._draggableModel['level'](targetModel['level']());
            this._undoEngine && this._undoEngine.end();
        }
    };
    ReportControlsDragDropHelper.prototype._reorderTableControls = function (targetModel, siblings, isDragToBottom) {
        var _this = this;
        var clonedSiblings = siblings && siblings().slice(0);
        var draggableInfoClone = this._serializer.serialize(this._draggableModel);
        var weightsCells;
        if (this._draggableModel.controlType === 'XRTableCell') {
            weightsCells = clonedSiblings.filter(function (cell) {
                return cell.name.peek() !== _this._draggableModel.name.peek();
            }).map(function (cell) { return cell.weight.peek(); });
        }
        return this._insertTableChildren(targetModel.parentModel(), draggableInfoClone, siblings.indexOf(targetModel) + isDragToBottom, weightsCells);
    };
    ReportControlsDragDropHelper.prototype._changeControlParent = function (targetModel) {
        var targetRect = targetModel.surface.rect();
        var draggableRect = this._draggableModel.surface.rect();
        var rect = {};
        if (targetRect.width < draggableRect.left + draggableRect.width) {
            rect['left'] = targetRect.width - draggableRect.width;
            rect['left'] = rect['left'] > 0 ? rect['left'] : 0;
        }
        if (targetRect.height < draggableRect.top + draggableRect.height) {
            rect['top'] = targetRect.height - draggableRect.height;
            rect['top'] = rect['top'] > 0 ? rect['top'] : 0;
        }
        this._draggableModel.surface.rect(rect);
        targetModel.addChild(this._draggableModel);
    };
    ReportControlsDragDropHelper.prototype.start = function (draggable) {
        _super.prototype.start.call(this, draggable);
        this._serializer = new analytics_utils_1.ModelSerializer();
        this._draggableParent = this._draggableModel.parentModel();
    };
    ReportControlsDragDropHelper.prototype.setNewDropTarget = function (elementModel, element, mouseLocationY) {
        this.drag(elementModel, element);
        var isInBottomOrderArea;
        var isInTopOrderArea;
        var $targetElement = $(this._targetElement);
        if ($targetElement && $targetElement.length) {
            if (mouseLocationY && this._draggableModel.controlType === 'DetailReportBand') {
                var targetTop = $targetElement.offset().top;
                isInTopOrderArea = mouseLocationY < (targetTop + this._orderingAreaHeight);
                isInBottomOrderArea = mouseLocationY > (targetTop + $targetElement.height() - this._orderingAreaHeight);
                this._isTargetContainer = true;
            }
            $targetElement.addClass(this._getDroppableClassName(isInTopOrderArea, isInBottomOrderArea));
        }
    };
    ReportControlsDragDropHelper.prototype.getSiblings = function () {
        var draggablePathName = this._draggable.data.name.split('.')[0];
        return (this._targetModel.parentModel() || this._targetModel)[draggablePathName];
    };
    ReportControlsDragDropHelper.prototype.stop = function () {
        _super.prototype.stop.call(this);
        if (!this._target || !this._targetModel || !this._canDrop(this._target, this._targetModel)) {
            return this._draggableModel.surface;
        }
        var canReorder = this._canReorder(this._target, this._draggable.data), isReorderingBand = xrBand_1.BandViewModel.isReorderingBand(this._draggableModel), isDragToBottom = this.isDragToBottom(), isBandReordering = isReorderingBand && !this._isTargetContainer;
        if (!isBandReordering) {
            this._draggableParent.removeChild(this._draggableModel);
        }
        if (canReorder) {
            if (isReorderingBand) {
                this._reorderBands(this._targetModel);
            }
            else if (this._tableControlTypes.indexOf(this._draggableModel.controlType) !== -1) {
                this._reorderTableControls(this._targetModel, this.getSiblings(), isDragToBottom);
            }
            else {
                this.reorderSiblings(isDragToBottom);
            }
        }
        else if (this._targetModel instanceof xrTable_1.XRTableControlViewModel || this._targetModel instanceof xrTableRow_1.XRTableRowViewModel) {
            var draggableInfoClone = this._serializer.serialize(this._draggableModel);
            return this._insertTableChildren(this._targetModel, draggableInfoClone, 0);
        }
        else {
            this._changeControlParent(this._targetModel);
        }
        return this._draggableModel.surface;
    };
    return ReportControlsDragDropHelper;
}(analytics_widgets_internal_1.ReorderTreeListDragDropHelper));
exports.ReportControlsDragDropHelper = ReportControlsDragDropHelper;
