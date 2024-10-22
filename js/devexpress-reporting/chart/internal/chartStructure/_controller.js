﻿/**
* DevExpress HTML/JS Reporting (chart\internal\chartStructure\_controller.js)
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
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var $ = require("jquery");
var _chartTreeListDragDropHelper_1 = require("./_chartTreeListDragDropHelper");
var ChartStructureTreeListController = (function (_super) {
    __extends(ChartStructureTreeListController, _super);
    function ChartStructureTreeListController(propertyNames, listPropertyNames, selectCallback, surface, undoEngine, dragdrophandler) {
        var _this = _super.call(this, propertyNames, listPropertyNames) || this;
        _this.surface = surface;
        _this.undoEngine = undoEngine;
        _this.dragdrophandler = dragdrophandler;
        var filter = _this.itemsFilter;
        _this.itemsFilter = function (item, path) {
            if (path === 'Chart.seriesTemplate.label')
                return false;
            return filter(item, path);
        };
        _this.hasItems = function (item) {
            return !!listPropertyNames && listPropertyNames.indexOf(item.specifics) !== -1;
        };
        _this.select = function (value) {
            _this.selectedItem && _this.selectedItem.isSelected(false);
            _this.selectedItem = value;
            value.isSelected(true);
            selectCallback && selectCallback(value);
        };
        _this.showIconsForChildItems = function (parent) {
            if (parent === void 0) { parent = null; }
            return parent === null || parent.level < 1;
        };
        _this.dragDropHandler = new ChartDragDropHandler(_this.selectedItem, surface, undoEngine, dragdrophandler);
        return _this;
    }
    return ChartStructureTreeListController;
}(analytics_internal_1.ObjectStructureTreeListController));
exports.ChartStructureTreeListController = ChartStructureTreeListController;
var ChartDragDropHandler = (function (_super) {
    __extends(ChartDragDropHandler, _super);
    function ChartDragDropHandler(surface, selection, undoEngine, dragHelperContent) {
        var _this = _super.call(this, surface, selection, undoEngine, null, dragHelperContent) || this;
        _this.undoEngine = undoEngine;
        _this.cursor = 'arrow';
        _this.alwaysAlt = true;
        _this.containment = '.dx-chart-left-panel';
        _this.parent = function () { return $('.dxcd-designer'); };
        _this['cursorAt'] = {
            top: 0,
            left: 0
        };
        _this.dragDropHelper = new _chartTreeListDragDropHelper_1.ChartTreeListDragDropHelper(dragHelperContent);
        _this.helper = _this.dragDropHelper.helper;
        return _this;
    }
    ChartDragDropHandler.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.dragDropHelper.dispose();
    };
    ChartDragDropHandler.prototype.startDrag = function (draggable) {
        this.dragDropHelper.start(draggable);
        _super.prototype.startDrag.call(this, draggable);
    };
    ChartDragDropHandler.prototype.drag = function (event, ui) {
        if (this.dragDropHelper) {
            var target = this.getTarget(event);
            if (target) {
                this.dragDropHelper.drag(ko.dataFor(target), target);
                this.dragDropHelper.addDroppableClass();
            }
        }
    };
    ChartDragDropHandler.prototype.doStopDrag = function (ui, draggable, event) {
        this.dragDropHelper.stop();
    };
    return ChartDragDropHandler;
}(analytics_internal_1.DragDropHandler));
exports.ChartDragDropHandler = ChartDragDropHandler;
