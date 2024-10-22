﻿/**
* DevExpress HTML/JS Reporting (viewer\accessibility\_dateRangeKeyboardHelper.js)
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
var DateRangeDialogElementsKeyboardHelper = (function (_super) {
    __extends(DateRangeDialogElementsKeyboardHelper, _super);
    function DateRangeDialogElementsKeyboardHelper(_hide, _visible) {
        var _this = _super.call(this) || this;
        _this._hide = _hide;
        _this._visible = _visible;
        _this.controlElementClassName = 'dx-accessibility-daterange-item';
        _this.predefinedDateRangesKeyboardHelper = new PredefinedDateRangesKeyboardHelper(_this);
        _this._disposables.push(_this.predefinedDateRangesKeyboardHelper, _this._visible.subscribe(function (newVal) {
            var timeout = setTimeout(function () { newVal && _this.predefinedDateRangesKeyboardHelper.focus(); }, 300);
            _this._disposables.push({ dispose: function () { return clearTimeout(timeout); } });
        }));
        return _this;
    }
    DateRangeDialogElementsKeyboardHelper.prototype.createControlElement = function (element, index) {
        return new analytics_internal_1.ControlElementWithParentHighlight(element, this.getContainer().getElementsByClassName('dxrv-daterange-editor-item')[index]);
    };
    DateRangeDialogElementsKeyboardHelper.prototype.itemHandleEscKey = function (e, index) {
        this._hide();
        return true;
    };
    DateRangeDialogElementsKeyboardHelper.prototype.itemHandleUpArrowKey = function (e, index) {
        if (!!(e && e.altKey)) {
            this._hide();
            return true;
        }
        return _super.prototype.itemHandleUpArrowKey.call(this, e, index);
    };
    DateRangeDialogElementsKeyboardHelper.prototype.itemHandleTabKey = function (e, index) {
        var nextIndex = this.setFocusToNext(index);
        if (nextIndex == 0) {
            this.predefinedDateRangesKeyboardHelper.focus();
        }
        return true;
    };
    DateRangeDialogElementsKeyboardHelper.prototype.itemHandleShiftTabKey = function (e, index) {
        var nextIndex = this.setFocusToPrevious(index);
        if (nextIndex == 0) {
            this.predefinedDateRangesKeyboardHelper.focus();
        }
        return true;
    };
    return DateRangeDialogElementsKeyboardHelper;
}(analytics_internal_1.AccessibilityKeyboardHelperBase));
exports.DateRangeDialogElementsKeyboardHelper = DateRangeDialogElementsKeyboardHelper;
var PredefinedDateRangesKeyboardHelper = (function (_super) {
    __extends(PredefinedDateRangesKeyboardHelper, _super);
    function PredefinedDateRangesKeyboardHelper(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        return _this;
    }
    PredefinedDateRangesKeyboardHelper.prototype.itemHandleEscKey = function (e, index) {
        this.owner.itemHandleEscKey.call(this.owner, e, 0);
        return true;
    };
    PredefinedDateRangesKeyboardHelper.prototype.itemHandleTabKey = function (e, index) {
        this.owner.setFocusToNext(0);
        return true;
    };
    PredefinedDateRangesKeyboardHelper.prototype.itemHandleShiftTabKey = function (e, index) {
        this.owner.setFocusToPrevious(0);
        return true;
    };
    PredefinedDateRangesKeyboardHelper.prototype.itemHandleUpArrowKey = function (e, index) {
        if (!!(e && e.altKey)) {
            return this.owner.itemHandleUpArrowKey.call(this.owner, e);
        }
        return _super.prototype.itemHandleUpArrowKey.call(this, e, index);
    };
    return PredefinedDateRangesKeyboardHelper;
}(analytics_internal_1.ListKeyboardHelper));
exports.PredefinedDateRangesKeyboardHelper = PredefinedDateRangesKeyboardHelper;
