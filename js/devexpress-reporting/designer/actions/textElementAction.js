﻿/**
* DevExpress HTML/JS Reporting (designer\actions\textElementAction.js)
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
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var TextElementAction = (function (_super) {
    __extends(TextElementAction, _super);
    function TextElementAction(_selectionProvider) {
        var _this = _super.call(this) || this;
        _this._selectionProvider = _selectionProvider;
        _super.prototype.initActions.call(_this, [
            {
                text: 'Fit Bounds To Text',
                displayText: function () { return analytics_utils_1.getLocalization('Fit Bounds To Text', 'ReportStringId.Cmd_FitBoundsToText'); },
                imageClassName: 'dxrd-image-actions-fit_bounds_to_text',
                imageTemplateName: 'dxrd-svg-actions-fit_bounds_to_text',
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                disabled: ko.computed(function () { return _this._inaccessibleAction(); }),
                visible: ko.pureComputed(function () {
                    return _this._selectionProvider.selectedItems.every(function (item) { return item.getControlModel().controlType === 'XRLabel' || item.getControlModel().controlType === 'XRCharacterComb'; });
                }),
                clickAction: function () { _this._textControls.forEach(function (item) { return item.fitBoundsToText(); }); }
            }, {
                text: 'Fit Text To Bounds',
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                displayText: function () { return analytics_utils_1.getLocalization('Fit Text To Bounds', 'ReportStringId.Cmd_FitTextToBounds'); },
                imageClassName: 'dxrd-image-actions-fit_text_to_bounds',
                imageTemplateName: 'dxrd-svg-actions-fit_text_to_bounds',
                disabled: ko.computed(function () { return _this._inaccessibleAction(); }),
                visible: ko.pureComputed(function () {
                    return _this._selectionProvider.selectedItems.every(function (item) { return item.getControlModel().controlType === 'XRLabel' || item.getControlModel().controlType === 'XRTableCell'; });
                }),
                clickAction: function () { _this._textControls.forEach(function (item) { return item.fitTextToBounds(); }); }
            },
        ]);
        return _this;
    }
    Object.defineProperty(TextElementAction.prototype, "_textControls", {
        get: function () {
            return this._selectionProvider.selectedItems;
        },
        enumerable: true,
        configurable: true
    });
    TextElementAction.prototype._inaccessibleAction = function () {
        if (this._textControls && this._textControls.some(function (item) { return item.getText && item.getText() === ''; }))
            return true;
        return !!(this._textControls && this._textControls.every(function (item) { return item.hasDataBindingByName && item.hasDataBindingByName('Text'); }));
    };
    TextElementAction.prototype.condition = function (context) {
        return context && (context.controlType === 'XRLabel' || context.controlType === 'XRTableCell' || context.controlType === 'XRCharacterComb' || context.controlType === 'multiselect');
    };
    return TextElementAction;
}(analytics_internal_1.BaseActionsProvider));
exports.TextElementAction = TextElementAction;
