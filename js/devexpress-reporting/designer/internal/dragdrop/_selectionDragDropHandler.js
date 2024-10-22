﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_selectionDragDropHandler.js)
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
var xrSubreport_1 = require("../../controls/xrSubreport");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var SelectionDragDropHandler = (function (_super) {
    __extends(SelectionDragDropHandler, _super);
    function SelectionDragDropHandler(_canAddItems, surface, selection, undoEngine, snapHelper, dragHelperContent) {
        var _this = _super.call(this, surface, selection, undoEngine, snapHelper, dragHelperContent) || this;
        _this._canAddItems = _canAddItems;
        return _this;
    }
    SelectionDragDropHandler.prototype._localizationCanDrop = function (dropTarget, controlModel) {
        var locked = !this._canAddItems() && dropTarget.getControlModel() !== controlModel.parentModel();
        return !locked;
    };
    SelectionDragDropHandler.prototype.getLocation = function (adjustedTarget, item) {
        var location = _super.prototype.getLocation.call(this, adjustedTarget, item);
        if (item instanceof xrSubreport_1.XRSubreportSurface)
            return item.processLocation(location);
        return location;
    };
    SelectionDragDropHandler.prototype.canDrop = function (dropTarget, controlModel, metaData) {
        var canDrop = _super.prototype.canDrop.call(this, dropTarget, controlModel, metaData);
        return canDrop && this._localizationCanDrop(dropTarget, controlModel);
    };
    return SelectionDragDropHandler;
}(analytics_internal_1.SelectionDragDropHandler));
exports.SelectionDragDropHandler = SelectionDragDropHandler;
