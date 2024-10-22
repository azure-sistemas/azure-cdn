﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\controlsFactory.js)
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
var _expressionWrapper_1 = require("../../dataObjects/expressions/_expressionWrapper");
var settings_1 = require("../../utils/settings");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var _metaUtils_1 = require("./_metaUtils");
var ControlsFactory = (function (_super) {
    __extends(ControlsFactory, _super);
    function ControlsFactory(fieldListProvider) {
        if (fieldListProvider === void 0) { fieldListProvider = ko.observable(null); }
        var _this = _super.call(this) || this;
        _this.fieldListProvider = fieldListProvider;
        _this._beforePrintPrintOnPage = ['BeforePrint', 'PrintOnPage'];
        _this._beforePrint = ['BeforePrint'];
        _this._expressionWrapper = new _expressionWrapper_1.ExpressionWrapper(settings_1.DataBindingMode(), _this.fieldListProvider);
        return _this;
    }
    ControlsFactory.prototype.dispose = function () {
        var _this = this;
        this._expressionWrapper.dispose();
        this._expressionWrapper = null;
        Object.keys(this.controlsMap).forEach(function (x) {
            delete _this.controlsMap[x];
        });
        this.fieldListProvider = null;
    };
    ControlsFactory.prototype._registerCommonExpressions = function (controlType) {
        this.setExpressionBinding(controlType, 'Text', this._beforePrintPrintOnPage);
        this.setExpressionBinding(controlType, 'AccessibleDescription', this._beforePrintPrintOnPage);
        this.setExpressionBinding(controlType, 'Visible', this._beforePrintPrintOnPage);
        this.setExpressionBinding(controlType, 'NavigateUrl', this._beforePrint);
        this.setExpressionBinding(controlType, 'Bookmark', this._beforePrint);
        this.setExpressionBinding(controlType, 'Tag', this._beforePrint);
        this.setExpressionBinding(controlType, 'LeftF', this._beforePrint, 'Layout');
        this.setExpressionBinding(controlType, 'TopF', this._beforePrint, 'Layout');
        this.setExpressionBinding(controlType, 'WidthF', this._beforePrint, 'Layout');
        this.setExpressionBinding(controlType, 'HeightF', this._beforePrint, 'Layout');
        this.setExpressionBinding(controlType, 'StyleName', this._beforePrint);
        this.setExpressionBinding(controlType, 'ForeColor', this._beforePrintPrintOnPage, 'Appearance');
        this.setExpressionBinding(controlType, 'BackColor', this._beforePrintPrintOnPage, 'Appearance');
        this.setExpressionBinding(controlType, 'BorderColor', this._beforePrintPrintOnPage, 'Appearance');
        this.setExpressionBinding(controlType, 'Borders', this._beforePrintPrintOnPage, 'Appearance');
        this.setExpressionBinding(controlType, 'BorderWidth', this._beforePrintPrintOnPage, 'Appearance');
        this.setExpressionBinding(controlType, 'BorderDashStyle', this._beforePrintPrintOnPage, 'Appearance');
        this.setExpressionBinding(controlType, 'TextAlignment', this._beforePrintPrintOnPage, 'Appearance');
        this.setExpressionBinding(controlType, 'Font', this._beforePrintPrintOnPage, 'Appearance', ['Name', 'Size', 'Italic', 'Strikeout', 'Bold', 'Underline']);
        this.setExpressionBinding(controlType, 'Padding', this._beforePrintPrintOnPage, 'Appearance', ['All', 'Left', 'Right', 'Top', 'Bottom']);
    };
    ControlsFactory.prototype._registerExtensions = function (controlType, metadata) {
        var parentType = metadata && metadata.parentType || controlType;
        this._registerCommonExpressions(controlType);
        switch (parentType) {
            case 'XRCheckBox':
                this.setExpressionBinding(controlType, 'CheckBoxState', this._beforePrintPrintOnPage);
                break;
            case 'XRPictureBox':
                this.setExpressionBinding(controlType, 'ImageSource', this._beforePrintPrintOnPage);
                this.setExpressionBinding(controlType, 'ImageUrl', this._beforePrintPrintOnPage);
                this.hideExpressionBindings(controlType, 'Font', 'ForeColor', 'Text', 'TextAlignment');
                break;
            case 'XRBarCode':
                this.setExpressionBinding(controlType, 'BinaryData', this._beforePrint);
                break;
            case 'XRGauge':
                this.hideExpressionBindings(controlType, 'Text', 'TextAlignment', 'Font', 'ForeColor');
                this.setExpressionBinding(controlType, 'TargetValue', this._beforePrint);
                this.setExpressionBinding(controlType, 'ActualValue', this._beforePrint);
                this.setExpressionBinding(controlType, 'Minimum', this._beforePrint);
                this.setExpressionBinding(controlType, 'Maximum', this._beforePrint);
                break;
            case 'XRCharacterComb':
                this.hideExpressionBindings(controlType, 'Padding');
                break;
            case 'TopMarginBand':
            case 'BottomMarginBand':
            case 'DetailReportBand':
            case 'DetailBand':
            case 'SubBand':
            case 'GroupHeaderBand':
            case 'GroupFooterBand':
            case 'PageHeaderBand':
            case 'ReportHeaderBand':
            case 'ReportFooterBand':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Bookmark', 'NavigateUrl', 'Text', 'WidthF', 'LeftF', 'TopF');
                this.setExpressionBinding(controlType, 'Visible', this._beforePrint);
                break;
            case 'XRSubreport':
                this.setExpressionBinding(controlType, 'Visible', this._beforePrint);
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Bookmark', 'NavigateUrl', 'Padding', 'StyleName');
                this.hideExpressionBindings(controlType, 'BackColor', 'BorderColor', 'BorderWidth', 'BorderDashStyle', 'Borders', 'Font', 'ForeColor', 'TextAlignment', 'Tag', 'Text', 'NavigateUrl');
                break;
            case 'XRCrossBandBox':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Bookmark', 'NavigateUrl', 'Text', 'BackColor', 'Font', 'Padding', 'TextAlignment');
                this.hideExpressionBindings(controlType, 'ForeColor', 'Visible');
                break;
            case 'XRCrossBandLine':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Bookmark', 'NavigateUrl', 'Text', 'BackColor', 'Font', 'Padding', 'TextAlignment');
                this.hideExpressionBindings(controlType, 'BorderColor', 'BorderDashStyle', 'Borders', 'BorderWidth', 'Visible');
                break;
            case 'XRCrossTab':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Bookmark', 'BackColor', 'BorderColor', 'Borders', 'BorderDashStyle', 'BorderWidth', 'Font', 'ForeColor', 'Padding', 'TextAlignment', 'Text', 'NavigateUrl', 'Visible', 'StyleName');
                this.setExpressionBinding(controlType, 'Visible', this._beforePrint);
                break;
            case 'XRCrossTabCell':
                this.hideExpressionBindings(controlType, 'Visible', 'HeightF', 'WidthF', 'LeftF', 'TopF', 'StyleName');
                break;
            case 'XRChart':
                this.hideExpressionBindings(controlType, 'Text', 'Font', 'ForeColor', 'TextAlignment');
                break;
            case 'XRLine':
                this.hideExpressionBindings(controlType, 'Font', 'Text', 'TextAlignment', 'NavigateUrl', 'Bookmark');
                break;
            case 'XRPivotGrid':
                this.setExpressionBinding(controlType, 'Visible', this._beforePrint);
                this.hideExpressionBindings(controlType, 'BackColor', 'BorderColor', 'Borders', 'BorderDashStyle', 'BorderWidth', 'Font', 'ForeColor', 'Padding', 'TextAlignment', 'Text', 'NavigateUrl', 'StyleName');
                break;
            case 'XRPageBreak':
                this.setExpressionBinding(controlType, 'Visible', this._beforePrint);
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'BackColor', 'BorderColor', 'Borders', 'BorderDashStyle', 'BorderWidth', 'Font', 'ForeColor', 'Padding', 'TextAlignment', 'Tag', 'Text', 'NavigateUrl', 'LeftF', 'WidthF', 'HeightF', 'Bookmark', 'StyleName');
                break;
            case 'XRPageInfo':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Text');
                break;
            case 'XRPanel':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Font', 'ForeColor', 'Text', 'TextAlignment');
                break;
            case 'XRRichText':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Text');
                this.setExpressionBinding(controlType, 'Rtf', this._beforePrint);
                this.setExpressionBinding(controlType, 'Html', this._beforePrint);
                break;
            case 'XRShape':
                this.hideExpressionBindings(controlType, 'Font', 'TextAlignment', 'Text');
                this.setExpressionBinding(controlType, 'FillColor', this._beforePrint, 'Appearance');
                break;
            case 'XRSparkline':
                this.hideExpressionBindings(controlType, 'Text', 'Font', 'TextAlignment', 'ForeColor');
                break;
            case 'XRTableOfContents':
                this.hideExpressionBindings(controlType, 'NavigateUrl', 'Text', 'TextAlignment', 'Bookmark', 'Font', 'LeftF', 'WidthF');
                break;
            case 'XRTableRow':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'LeftF', 'TopF', 'WidthF', 'Text', 'NavigateUrl', 'Bookmark');
                break;
            case 'XRTableCell':
                this.hideExpressionBindings(controlType, 'LeftF', 'TopF', 'HeightF');
                break;
            case 'XRTable':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'Text', 'NavigateUrl');
                break;
            case 'XRZipCode':
                this.hideExpressionBindings(controlType, 'Font', 'TextAlignment');
                break;
            case 'XRPdfContent':
                this.setExpressionBinding(controlType, 'Visible', this._beforePrint);
                this.setExpressionBinding(controlType, 'Source', this._beforePrint, 'Data');
                this.setExpressionBinding(controlType, 'SourceUrl', this._beforePrint, 'Data');
                this.setExpressionBinding(controlType, 'PageRange', this._beforePrint, 'Data');
                this.hideExpressionBindings(controlType, 'BackColor', 'BorderColor', 'Borders', 'BorderDashStyle', 'BorderWidth', 'Font', 'ForeColor', 'Padding', 'TextAlignment', 'Tag', 'Text', 'NavigateUrl', 'LeftF', 'WidthF', 'HeightF');
                break;
            case 'DevExpress.XtraReports.UI.XtraReport':
                this.hideExpressionBindings(controlType, 'AccessibleDescription', 'StyleName', 'Text', 'NavigateUrl');
                this.setExpressionBinding(controlType, 'Bookmark', this._beforePrint);
                this.hideExpressionBindings(controlType, 'LeftF', 'TopF', 'WidthF', 'HeightF');
                break;
            case 'XRPdfSignature':
                this.hideExpressionBindings(controlType, 'AccessibleDescription');
                break;
        }
    };
    ControlsFactory.prototype.registerControl = function (typeName, metadata) {
        _super.prototype.registerControl.call(this, typeName, metadata);
        this._registerExtensions(typeName, metadata);
    };
    ControlsFactory.prototype._createExpressionObject = function (typeName, expressions, path, summaryRunning) {
        return this._expressionWrapper.createExpressionsObject(typeName, expressions, path, summaryRunning);
    };
    ControlsFactory.prototype.setExpressionBinding = function (controlType, propertyName, events, group, objectProperties) {
        this._expressionWrapper.setPropertyDescription(controlType, propertyName, events, objectProperties, group);
    };
    ControlsFactory.prototype.setPropertyDescription = function (controlType, propertyName, events, group, objectProperties) {
        return this.setExpressionBinding(controlType, propertyName, events, group, objectProperties);
    };
    ControlsFactory.prototype.setDisplayNameForExpression = function (propertyName, localizationId, displayName) {
        this._expressionWrapper.setLocalizationId(propertyName, localizationId, displayName);
    };
    ControlsFactory.prototype.hideExpressionBindings = function (type) {
        var propertyNames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            propertyNames[_i - 1] = arguments[_i];
        }
        var _a;
        (_a = this._expressionWrapper).hidePropertyDescriptions.apply(_a, [type].concat(propertyNames));
    };
    ControlsFactory.prototype.hidePropertyDescriptions = function (type) {
        var propertyNames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            propertyNames[_i - 1] = arguments[_i];
        }
        return this.hideExpressionBindings.apply(this, [type].concat(propertyNames));
    };
    ControlsFactory.prototype.inheritControl = function (parentType, extendedOptions) {
        var parentInfo = this.getControlInfo(parentType);
        var copyParentSerializationsInfo = $.extend(true, [], parentInfo.info);
        var newInfo = [].concat(copyParentSerializationsInfo, extendedOptions.info || []);
        var newPopularProperties = [].concat(parentInfo.popularProperties, extendedOptions.popularProperties || []);
        return $.extend({}, parentInfo, extendedOptions, {
            parentType: parentType,
            info: newInfo,
            popularProperties: newPopularProperties
        });
    };
    ControlsFactory.prototype.createPopularBindingInfo = function (options, isExpression) {
        if (isExpression === void 0) { isExpression = true; }
        return _metaUtils_1.createPopularBindingInfo(options, isExpression);
    };
    return ControlsFactory;
}(analytics_utils_1.ControlsFactory));
exports.ControlsFactory = ControlsFactory;
