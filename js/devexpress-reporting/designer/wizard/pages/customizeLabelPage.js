﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\customizeLabelPage.js)
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
var _labelWizardUtils_1 = require("../internal/_labelWizardUtils");
var _utils_1 = require("../_utils");
var reportWizardState_1 = require("../reportWizardState");
var _selectLabelTypePage_1 = require("./_selectLabelTypePage");
var pageId_1 = require("../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_wizard_internal_1 = require("@devexpress/analytics-core/analytics-wizard-internal");
var CustomizeLabelPage = (function (_super) {
    __extends(CustomizeLabelPage, _super);
    function CustomizeLabelPage() {
        var _a;
        var _this = _super.call(this) || this;
        _this._id = ko.observable(0);
        _this._labelWidth = ko.observable(0);
        _this._labelHeight = ko.observable(0);
        _this._horizontalPitch = ko.observable(0);
        _this._verticalPitch = ko.observable(0);
        _this._topMargin = ko.observable(0);
        _this._leftMargin = ko.observable(0);
        _this._rightMargin = ko.observable(0);
        _this._bottomMargin = ko.observable(0);
        _this._rowsCount = ko.pureComputed(function () {
            return _this._getLabelsCount(_this._pageHeight(), _this._verticalPitch(), _this._labelHeight(), _this._topMargin() + _this._bottomMargin());
        });
        _this._columnsCount = ko.pureComputed(function () {
            return _this._getLabelsCount(_this._pageWidth(), _this._horizontalPitch(), _this._labelWidth(), _this._leftMargin() + _this._rightMargin());
        });
        _this._pageHeight = ko.pureComputed(function () {
            if (_this._selectedPaperSize().unit === _this.unit())
                return _this._selectedPaperSize().height;
            if (_this._selectedPaperSize().unit === reportWizardState_1.GraphicsUnit.Millimeter)
                return _this._selectedPaperSize().height * CustomizeLabelPage._CONVERSION_COEEFICIENT;
            return _this._selectedPaperSize().height / CustomizeLabelPage._CONVERSION_COEEFICIENT;
        });
        _this._pageWidth = ko.pureComputed(function () {
            if (_this._selectedPaperSize().unit === _this.unit())
                return _this._selectedPaperSize().width;
            if (_this._selectedPaperSize().unit === reportWizardState_1.GraphicsUnit.Millimeter)
                return _this._selectedPaperSize().width * CustomizeLabelPage._CONVERSION_COEEFICIENT;
            return _this._selectedPaperSize().width / CustomizeLabelPage._CONVERSION_COEEFICIENT;
        });
        _this.paperKinds = function () { return (_this._labelData.paperKinds); };
        _this._selectedPaperSize = ko.observable({ 'id': 1, 'enumId': 9, 'name': 'A4', 'width': 210.0, 'height': 297.0, 'unit': 6, 'isRollPaper': false });
        _this.unit = ko.observable();
        _this._stepUnit = ko.pureComputed(function () { return _this.unit() === reportWizardState_1.GraphicsUnit.Inch ? 0.01 : 0.1; });
        _this.labelWidth = ko.computed({
            read: function () { return parseFloat(_this._getFormattedValueInUnits(_this._labelWidth())); },
            write: function (value) { return _this._labelWidth(value); }
        });
        _this.labelHeight = ko.computed({
            read: function () { return parseFloat(_this._getFormattedValueInUnits(_this._labelHeight())); },
            write: function (value) { return _this._labelHeight(value); }
        });
        _this.horizontalPitch = ko.computed({
            read: function () { return parseFloat(_this._getFormattedValueInUnits(_this._horizontalPitch())); },
            write: function (value) { return _this._horizontalPitch(value); }
        });
        _this.verticalPitch = ko.computed({
            read: function () { return parseFloat(_this._getFormattedValueInUnits(_this._verticalPitch())); },
            write: function (value) { return _this._verticalPitch(value); }
        });
        _this.topMargin = ko.computed({
            read: function () { return parseFloat(_this._getFormattedValueInUnits(_this._topMargin())); },
            write: function (value) { return _this._topMargin(value); }
        });
        _this.leftMargin = ko.computed({
            read: function () { return parseFloat(_this._getFormattedValueInUnits(_this._leftMargin())); },
            write: function (value) { return _this._leftMargin(value); }
        });
        _this.rightMargin = ko.computed({
            read: function () { return parseFloat(_this._getFormattedValueInUnits(_this._rightMargin())); },
            write: function (value) { return _this._rightMargin(value); }
        });
        _this.bottomMargin = ko.computed({
            read: function () { return parseFloat(_this._getFormattedValueInUnits(_this._bottomMargin())); },
            write: function (value) { return _this._bottomMargin(value); }
        });
        _this._labelsCountText = ko.pureComputed(function () {
            return _this._rowsCount() * _this._columnsCount() + ' ' + analytics_utils_1.getLocalization('labels on the page', 'ASPxReportsStringId.ReportDesigner_Wizard_CustomizeLabelPage_LabelCountText') + ', ' + _this._columnsCount() + ' x ' + _this._rowsCount();
        });
        _this._pageSizeText = ko.pureComputed(function () {
            return CustomizeLabelPage._getPageSizeText(_this._pageWidth(), _this._pageHeight(), _this.unit());
        });
        _this._units = [
            { text: analytics_utils_1.getLocalization('Inch', 'AnalyticsCoreStringId.Wizard_Inch'), value: reportWizardState_1.GraphicsUnit.Inch },
            { text: analytics_utils_1.getLocalization('Millimeter', 'AnalyticsCoreStringId.Wizard_Millimeter'), value: reportWizardState_1.GraphicsUnit.Millimeter }
        ];
        _this._disposables.push(_this._rowsCount, _this._columnsCount, _this._pageHeight, _this._pageWidth);
        _this._disposables.push(_this.unit.subscribe(function (newUnit) {
            if (newUnit === reportWizardState_1.GraphicsUnit.Inch) {
                _this._labelWidth(_this._labelWidth() * CustomizeLabelPage._CONVERSION_COEEFICIENT);
                _this._labelHeight(_this._labelHeight() * CustomizeLabelPage._CONVERSION_COEEFICIENT);
                _this._horizontalPitch(_this._horizontalPitch() * CustomizeLabelPage._CONVERSION_COEEFICIENT);
                _this._verticalPitch(_this._verticalPitch() * CustomizeLabelPage._CONVERSION_COEEFICIENT);
                _this._topMargin(_this._topMargin() * CustomizeLabelPage._CONVERSION_COEEFICIENT);
                _this._leftMargin(_this._leftMargin() * CustomizeLabelPage._CONVERSION_COEEFICIENT);
                _this._rightMargin(_this._rightMargin() * CustomizeLabelPage._CONVERSION_COEEFICIENT);
                _this._bottomMargin(_this._bottomMargin() * CustomizeLabelPage._CONVERSION_COEEFICIENT);
            }
            else if (newUnit === reportWizardState_1.GraphicsUnit.Millimeter) {
                _this._labelWidth(_this._labelWidth() / CustomizeLabelPage._CONVERSION_COEEFICIENT);
                _this._labelHeight(_this._labelHeight() / CustomizeLabelPage._CONVERSION_COEEFICIENT);
                _this._horizontalPitch(_this._horizontalPitch() / CustomizeLabelPage._CONVERSION_COEEFICIENT);
                _this._verticalPitch(_this._verticalPitch() / CustomizeLabelPage._CONVERSION_COEEFICIENT);
                _this._topMargin(_this._topMargin() / CustomizeLabelPage._CONVERSION_COEEFICIENT);
                _this._leftMargin(_this._leftMargin() / CustomizeLabelPage._CONVERSION_COEEFICIENT);
                _this._rightMargin(_this._rightMargin() / CustomizeLabelPage._CONVERSION_COEEFICIENT);
                _this._bottomMargin(_this._bottomMargin() / CustomizeLabelPage._CONVERSION_COEEFICIENT);
            }
        }));
        (_a = _this._disposables).push.apply(_a, analytics_wizard_internal_1.subscribeProperties([
            _this._labelWidth,
            _this._labelHeight,
            _this._horizontalPitch,
            _this._verticalPitch,
            _this._topMargin,
            _this._leftMargin,
            _this._rightMargin,
            _this._bottomMargin,
            _this.unit,
            _this._selectedPaperSize
        ], function () { return _this._onChange(); }));
        _this._disposables.push(_this._stepUnit, _this.labelWidth, _this.labelHeight, _this.horizontalPitch, _this.verticalPitch, _this.topMargin, _this.leftMargin, _this.rightMargin, _this.bottomMargin, _this._labelsCountText, _this._pageSizeText);
        return _this;
    }
    CustomizeLabelPage.prototype._getFormattedValueInUnits = function (value) {
        return _utils_1.getFormattedValueInUnits(value, this.unit());
    };
    CustomizeLabelPage.prototype._getLabelsCount = function (paperDimentionInLabelUnit, labelPitch, labelWidth, margin) {
        return Math.floor((paperDimentionInLabelUnit - margin + (labelPitch - labelWidth)) / labelPitch);
    };
    CustomizeLabelPage.prototype.canNext = function () {
        return false;
    };
    CustomizeLabelPage.prototype.canFinish = function () {
        return true;
    };
    CustomizeLabelPage.prototype.initialize = function (labelDetails) {
        var _this = this;
        _selectLabelTypePage_1.initializeLabelReportWizardPromise();
        return _selectLabelTypePage_1.labelReportWizardPromise.done(function (labelData) {
            _this._labelData = labelData;
            _this._id(labelDetails.id);
            _this.unit(labelDetails.unit);
            _this._selectedPaperSize(analytics_internal_1.findFirstItemMatchesCondition(_this.paperKinds(), function (item) { return item.id === labelDetails.paperKindId; }));
            _this._labelWidth(labelDetails.width);
            _this._labelHeight(labelDetails.height);
            _this._horizontalPitch(labelDetails.hPitch);
            _this._verticalPitch(labelDetails.vPitch);
            _this._topMargin(labelDetails.topMargin);
            _this._leftMargin(labelDetails.leftMargin);
            _this._rightMargin(labelDetails.rightMargin);
            _this._bottomMargin(labelDetails.bottomMargin);
        });
    };
    CustomizeLabelPage.prototype.commit = function () {
        var labelDetails = {};
        labelDetails.width = this._labelWidth();
        labelDetails.height = this._labelHeight();
        labelDetails.hPitch = this._horizontalPitch();
        labelDetails.vPitch = this._verticalPitch();
        labelDetails.topMargin = this._topMargin();
        labelDetails.leftMargin = this._leftMargin();
        labelDetails.rightMargin = this._rightMargin();
        labelDetails.bottomMargin = this._bottomMargin();
        labelDetails.unit = this.unit();
        labelDetails.paperKindId = this._selectedPaperSize().id;
        return $.Deferred().resolve(labelDetails).promise();
    };
    CustomizeLabelPage._getPageSizeText = function (width, height, unit) {
        return _utils_1.getFormattedValueInUnits(width, unit) + ' x ' + _utils_1.getFormattedValueInUnits(height, unit) + (unit === reportWizardState_1.GraphicsUnit.Inch ? ' in' : ' mm');
    };
    CustomizeLabelPage._CONVERSION_COEEFICIENT = _labelWizardUtils_1.CONVERSION_COEEFICIENT;
    return CustomizeLabelPage;
}(analytics_wizard_1.WizardPageBase));
exports.CustomizeLabelPage = CustomizeLabelPage;
function _registerCustomizeLabelPage(factory) {
    factory.registerMetadata(pageId_1.ReportWizardPageId.CustomizeLabelPage, {
        setState: function (labelDetails, state) {
            state.width = labelDetails.width;
            state.height = labelDetails.height;
            state.hPitch = labelDetails.hPitch;
            state.vPitch = labelDetails.vPitch;
            state.topMargin = labelDetails.topMargin;
            state.leftMargin = labelDetails.leftMargin;
            state.rightMargin = labelDetails.rightMargin;
            state.bottomMargin = labelDetails.bottomMargin;
            state.unit = labelDetails.unit;
            state.paperKindId = labelDetails.paperKindId;
        },
        getState: function (state) {
            return state.labelDetails;
        },
        resetState: function (state, defaultState) {
            state.width = defaultState.width;
            state.height = defaultState.height;
            state.hPitch = defaultState.hPitch;
            state.vPitch = defaultState.vPitch;
            state.topMargin = defaultState.topMargin;
            state.leftMargin = defaultState.leftMargin;
            state.rightMargin = defaultState.rightMargin;
            state.bottomMargin = defaultState.bottomMargin;
            state.unit = defaultState.unit;
            state.paperKindId = defaultState.paperKindId;
        },
        create: function () {
            return new CustomizeLabelPage();
        },
        template: 'dxrd-page-customizeLabel',
        description: analytics_utils_1.getLocalization("Choose the page size and customize the label's parameters.", 'ASPxReportsStringId.ReportDesigner_Wizard_LabelPageSize')
    });
}
exports._registerCustomizeLabelPage = _registerCustomizeLabelPage;
