﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_fieldListDragDropHandler.js)
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
require("jquery-ui/ui/widgets/draggable");
require("jquery-ui/ui/widgets/resizable");
require("jquery-ui/ui/widgets/selectable");
require("jquery-ui/ui/widgets/mouse");
var _utils_1 = require("./_utils");
var _getDataSourceDataMember_1 = require("../_getDataSourceDataMember");
var _dataBindingMode_1 = require("../_dataBindingMode");
var xrReport_1 = require("../../controls/xrReport");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var ko = require("knockout");
var $ = require("jquery");
var _fieldListDragDropHelper_1 = require("./_fieldListDragDropHelper");
var FieldListDragDropHandler = (function (_super) {
    __extends(FieldListDragDropHandler, _super);
    function FieldListDragDropHandler(_canAddItems, surface, selection, _undoEngine, snapHelper, dragHelperContent, _dataSources, onComponentAdded) {
        var _this = _super.call(this, surface, selection, _undoEngine, snapHelper, dragHelperContent) || this;
        _this._canAddItems = _canAddItems;
        _this._undoEngine = _undoEngine;
        _this._dataSources = _dataSources;
        _this._getKey = function (item) { return (item.data.isList || item.isMultiSelected()) ? 'List' : item.data.specifics; };
        _this._isIcon = false;
        _this._disposables.push(_this.dataBindingMode = ko.computed(function () { return surface() && surface()._control.dataBindingMode || _dataBindingMode_1.DataBindingMode.Expressions; }));
        _this.cursor = 'arrow';
        _this.onComponentAdded = function (e) { onComponentAdded && onComponentAdded(e); };
        _this.containment = '.dxrd-designer';
        _this['cursorAt'] = {
            top: 0,
            left: 0
        };
        _this['helper'] = function (draggable, event) {
            _super.prototype.helper.call(_this, draggable);
            var item = draggable;
            _utils_1.selectTreeListItem(item, event);
            _this._setDragHelperContent(_fieldListDragDropHelper_1.memberControlsMap, _this._getKey(item));
        };
        return _this;
    }
    FieldListDragDropHandler.prototype._setDragHelperContent = function (memberControlsMap, key) {
        var size = (memberControlsMap[key] || memberControlsMap['Default']).size(this.surface());
        this.recalculateSize(size);
        this.dragHelperContent.reset();
        this.dragHelperContent.setContent(new analytics_elements_1.Rectangle(0, 0, this._size.width(), this._size.height()));
    };
    FieldListDragDropHandler.prototype._getDropTarget = function (memberControlsMapElement) {
        return memberControlsMapElement && memberControlsMapElement.adjustDropTarget && memberControlsMapElement.adjustDropTarget(this.selection.dropTarget) || this.selection.dropTarget;
    };
    FieldListDragDropHandler.prototype._needToChangeHelperContent = function (dragHelperContent, className) {
        return dragHelperContent && dragHelperContent.className === className;
    };
    FieldListDragDropHandler.prototype._updateInnerControlSize = function (control) {
        if (!control.rows)
            return;
        var cells = control.rows()[0].cells();
        var innerControls = [];
        cells.forEach(function (cell) {
            innerControls = innerControls.concat(cell.controls());
        });
        if (innerControls.length === 0)
            return;
        var cellWidth = cells[0].width();
        var cellHeight = cells[0].height();
        innerControls.forEach(function (control) {
            control.size.width(cellWidth);
            control.size.height(cellHeight);
        });
    };
    FieldListDragDropHandler.prototype._addControl = function (control, dropTarget) {
        if (!control)
            return;
        this._undoEngine().start();
        this.addControl(control, dropTarget, this._size);
        this._updateInnerControlSize(control);
        this._undoEngine().end();
        var parent = dropTarget.getControlModel();
        _utils_1.dragDropComponentAdded(control, parent);
        this.onComponentAdded({ parent: parent, model: control });
    };
    FieldListDragDropHandler.prototype._isDefaultBindingAssigned = function (control, treeListItem) {
        if (control['hasDefaultBindingProperty'] && !_utils_1.isList(treeListItem.data)) {
            if (this.dataBindingMode() === _dataBindingMode_1.DataBindingMode.Bindings) {
                var dataBinding = control.getDefaultBinding();
                dataBinding.updateBinding(treeListItem.path, this._dataSources.peek());
            }
            else {
                var dataSourceInfo = _getDataSourceDataMember_1.getDataSourceDataMember(control);
                var expression = control.getDefaultBinding();
                expression.value(_utils_1.getExpressionPath(control, new analytics_utils_1.PathRequest(treeListItem.path)));
            }
            return true;
        }
        return false;
    };
    FieldListDragDropHandler.prototype.canDrop = function (dropTarget, controlModel, metaData) {
        var canDrop = _super.prototype.canDrop.call(this, dropTarget, controlModel, metaData);
        return canDrop && (this._canAddItems() || this._isIcon);
    };
    FieldListDragDropHandler.prototype.drag = function (event, ui) {
        this._isIcon = false;
        if (this.selection.dropTarget) {
            var element = event.target;
            var draggable = ko.dataFor(element);
            var key = this._getKey(draggable), dropTarget = this._getDropTarget(_fieldListDragDropHelper_1.memberControlsMap[key]);
            var dropTargetControl = dropTarget.getControlModel();
            var boundedClass = 'dxrd-image-ghost-bounded';
            var dragHelperContent = this.dragHelperContent.controls()[0];
            if (dropTargetControl['hasDefaultBindingProperty'] && !_utils_1.isList(draggable.data) || dropTarget.dragCallback) {
                if (!this._needToChangeHelperContent(dragHelperContent, boundedClass)) {
                    var rect = new analytics_elements_1.Rectangle(12, 12, 12, 12);
                    rect.className = boundedClass;
                    this._size.width(12);
                    this._size.height(12);
                    this.dragHelperContent.reset();
                    this.dragHelperContent.setContent(rect);
                }
                dropTarget.dragCallback && dropTarget.dragCallback(draggable);
                $(element).draggable && $(element).draggable('option', 'snap', false);
                this.snapHelper.deactivateSnapLines();
                event.altKey = true;
                this._isIcon = true;
            }
            else if (this._needToChangeHelperContent(dragHelperContent, boundedClass)) {
                this._setDragHelperContent(_fieldListDragDropHelper_1.memberControlsMap, key);
            }
        }
        _super.prototype.drag.call(this, event, ui);
    };
    FieldListDragDropHandler.prototype.doStopDrag = function (ui, draggable) {
        var _this = this;
        this.dragHelperContent.reset();
        if (this.dragHelperContent.isLocked())
            return;
        if (this.selection.dropTarget) {
            if (this.selection.dropTarget instanceof xrReport_1.ReportSurface)
                return;
            var position = this._getAbsoluteSurfacePosition(ui);
            this.selection.dropTarget.underCursor().x = position.left - this.selection.dropTarget['absolutePosition'].x();
            this.selection.dropTarget.underCursor().y = position.top - this.selection.dropTarget['absolutePosition'].y();
            var item = draggable;
            var key = item.data.isList ? 'List' : item.data.specifics;
            if (this.surface().isFit && this.surface().isFit(this.selection.dropTarget) || this.selection.dropTarget.underCursor().isOver) {
                var dropTarget = this._getDropTarget(_fieldListDragDropHelper_1.memberControlsMap[key]), dropTargetControl = dropTarget.getControlModel();
                var isMultiSelect = item.selectedItems().length > 1;
                if (!isMultiSelect && this._isDefaultBindingAssigned(dropTargetControl, item))
                    return;
                if (dropTarget.dropCallback) {
                    dropTarget.dropCallback(item);
                    return;
                }
                dropTarget = dropTargetControl.getMetaData().isContainer ? dropTarget : dropTarget.parent;
                if (!dropTarget.canDrop())
                    return;
                if (!isMultiSelect && !_utils_1.isList(item.data)) {
                    var control = (_fieldListDragDropHelper_1.memberControlsMap[key] || _fieldListDragDropHelper_1.memberControlsMap['Default']).drop(item, dropTarget.getControlModel(), this.dataBindingMode());
                    this._addControl(control, dropTarget);
                    return;
                }
                _fieldListDragDropHelper_1.memberControlsMap[isMultiSelect ? 'MultiList' : key]
                    .drop(item, dropTarget.getControlModel(), this.dataBindingMode(), _fieldListDragDropHelper_1.memberControlsMap[isMultiSelect ? 'MultiList' : key].size(this.surface()))
                    .done(function (control) {
                    _this._addControl(control, dropTarget);
                });
            }
        }
    };
    return FieldListDragDropHandler;
}(analytics_internal_1.DragDropHandler));
exports.FieldListDragDropHandler = FieldListDragDropHandler;
