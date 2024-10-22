﻿/**
* DevExpress HTML/JS Reporting (designer\actions\pdfContentActions.js)
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
var xrPdfContent_1 = require("../controls/xrPdfContent");
var PdfContentActions = (function (_super) {
    __extends(PdfContentActions, _super);
    function PdfContentActions(_selection, isDisabled) {
        if (isDisabled === void 0) { isDisabled = function () { return false; }; }
        var _this = _super.call(this) || this;
        _this._selection = _selection;
        _super.prototype.initActions.call(_this, [
            {
                text: 'Fit Size to Content',
                group: function () { return analytics_utils_1.getLocalization('Pdf Content', 'ReportStringId.RibbonXRDesign_PageGroup_PdfContent'); },
                displayText: function () { return analytics_utils_1.getLocalization('Fit Size to Content', 'ReportStringId.Verb_FitControlSize'); },
                imageClassName: 'dxrd-image-actions-fit_to_container',
                imageTemplateName: 'dxrd-svg-actions-fit_to_container',
                disabled: ko.pureComputed(function () { return isDisabled() || _this._focusedPdfContent && (_this._focusedPdfContent.generateOwnPages() || !_this._focusedPdfContent.canFit() || !_this._focusedPdfContent.imageSource()); }),
                clickAction: function (model) {
                    model.fitToContent();
                }
            }
        ]);
        return _this;
    }
    Object.defineProperty(PdfContentActions.prototype, "_focusedPdfContent", {
        get: function () {
            var focusedModel = this._selection.focused().getControlModel();
            if (focusedModel instanceof xrPdfContent_1.XRPdfContentViewModel)
                return focusedModel;
            return null;
        },
        enumerable: true,
        configurable: true
    });
    PdfContentActions.prototype.condition = function (context) {
        return context instanceof xrPdfContent_1.XRPdfContentViewModel;
    };
    return PdfContentActions;
}(analytics_internal_1.BaseActionsProvider));
exports.PdfContentActions = PdfContentActions;
