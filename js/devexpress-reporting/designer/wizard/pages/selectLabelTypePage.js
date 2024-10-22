﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\selectLabelTypePage.js)
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
var reportWizardState_1 = require("../reportWizardState");
var _selectLabelTypePage_1 = require("./_selectLabelTypePage");
var _utils_1 = require("../_utils");
var pageId_1 = require("../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var SelectLabelTypePage = (function (_super) {
    __extends(SelectLabelTypePage, _super);
    function SelectLabelTypePage() {
        var _this = _super.call(this) || this;
        _this._selectedPaperSize = ko.computed({
            read: function () {
                return analytics_internal_1.findFirstItemMatchesCondition(_this._labelData.paperKinds, function (item) { return item.id === _this._selectedLabelDetails().paperKindId; });
            },
            deferEvaluation: true
        });
        _this._selectedLabelProduct = ko.observable();
        _this._selectedLabelDetails = ko.observable();
        _this._labelDetails = ko.observable();
        _this._width = ko.pureComputed(function () { return _utils_1.getFormattedValueInUnits(_this._selectedLabelDetails().width, _this._selectedPaperSize().unit) + (_this._selectedPaperSize().unit === reportWizardState_1.GraphicsUnit.Inch ? ' in' : ' mm'); });
        _this._height = ko.pureComputed(function () { return _utils_1.getFormattedValueInUnits(_this._selectedLabelDetails().height, _this._selectedPaperSize().unit) + (_this._selectedPaperSize().unit === reportWizardState_1.GraphicsUnit.Inch ? ' in' : ' mm'); });
        _this._paperType = ko.pureComputed(function () { return _this._selectedPaperSize().name; });
        _this._pageSizeText = ko.pureComputed(function () { return _utils_1.getFormattedValueInUnits(_this._selectedPaperSize().width, _this._selectedPaperSize().unit) + ' x ' + _utils_1.getFormattedValueInUnits(_this._selectedPaperSize().height, _this._selectedPaperSize().unit) + (_this._selectedPaperSize().unit === reportWizardState_1.GraphicsUnit.Inch ? ' in' : ' mm'); });
        _this._disposables.push(_this._selectedLabelProduct.subscribe(function (newProductsType) {
            var labelDetails = _this._labelData.labelDetails.filter(function (item) { return item.productId === newProductsType.id; });
            _this._selectedLabelDetails(labelDetails[0]);
            _this._labelDetails({
                store: labelDetails,
                paginate: labelDetails.length > 200,
                pageSize: 100
            });
        }));
        _this._disposables.push(_this._selectedLabelDetails.subscribe(function () { return _this._onChange(); }));
        _this._disposables.push(_this._selectedPaperSize, _this._width, _this._height, _this._paperType, _this._pageSizeText);
        return _this;
    }
    SelectLabelTypePage.prototype.initialize = function (state) {
        var _this = this;
        _selectLabelTypePage_1.initializeLabelReportWizardPromise();
        return _selectLabelTypePage_1.labelReportWizardPromise.done(function (labelData) {
            _this._labelData = labelData;
            if (state.labelDetails) {
                if (!_this._selectedLabelProduct() || _this._selectedLabelProduct().id !== state.labelDetails.productId) {
                    _this._selectedLabelProduct(analytics_internal_1.findFirstItemMatchesCondition(_this._labelData.labelProducts, function (item) { return item.id === state.labelDetails.productId; }));
                }
                _this._selectedLabelDetails(analytics_internal_1.findFirstItemMatchesCondition(_this._labelData.labelDetails, function (item) { return item.id === state.labelDetails.id; }));
            }
            else {
                _this._selectedLabelProduct(_this._labelData.labelProducts[0]);
            }
        });
    };
    SelectLabelTypePage.prototype.canNext = function () {
        return !!this._selectedLabelDetails();
    };
    SelectLabelTypePage.prototype.canFinish = function () {
        return !!this._selectedLabelDetails();
    };
    SelectLabelTypePage.prototype.commit = function () {
        var labelDetails = this._selectedLabelDetails() ? $.extend({}, this._selectedLabelDetails()) : null;
        return $.Deferred().resolve({ labelDetails: labelDetails }).promise();
    };
    return SelectLabelTypePage;
}(analytics_wizard_1.WizardPageBase));
exports.SelectLabelTypePage = SelectLabelTypePage;
function _registerSelectLabelTypePage(factory) {
    factory.registerMetadata(pageId_1.ReportWizardPageId.SelectLabelTypePage, {
        setState: function (data, state) {
            if (data && (!state.labelDetails || data.labelDetails.id !== state.labelDetails.id))
                state.labelDetails = data.labelDetails;
        },
        getState: function (state) {
            return state;
        },
        resetState: function (state, defaultState) {
            state.labelDetails = defaultState.labelDetails;
        },
        create: function () {
            return new SelectLabelTypePage();
        },
        template: 'dxrd-page-selectPredefinedLabels',
        description: analytics_utils_1.getLocalization('Select the label type.', 'ASPxReportsStringId.ReportDesigner_Wizard_SelectLabelType')
    });
}
exports._registerSelectLabelTypePage = _registerSelectLabelTypePage;
