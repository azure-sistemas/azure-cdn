﻿/**
* DevExpress HTML/JS Reporting (designer\actions\reportActions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xrReport_1 = require("../controls/xrReport");
var metadata_1 = require("../../common/metadata");
var xrBand_1 = require("../bands/xrBand");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var ReportActions = (function () {
    function ReportActions(onComponentAdded) {
        var _this = this;
        this._contextModel = ko.observable();
        this._targetModel = ko.computed(function () {
            var model = _this._contextModel();
            if (model) {
                if (model.parentModel() && model.parentModel().parentModel() && model.controlType === 'SubBand') {
                    model = model.parentModel().parentModel();
                }
                else if (model.parentModel() && model.controlType !== 'DevExpress.XtraReports.UI.XtraReport' && model.controlType !== 'DetailReportBand') {
                    model = model.parentModel();
                }
            }
            return model;
        });
        this.actions = [
            {
                group: function () { return analytics_utils_1.getLocalization('Bands', 'ReportStringId.RibbonXRDesign_PageGroup_Bands'); },
                text: 'Insert Top Margin Band',
                displayText: function () { return analytics_utils_1.getLocalization('Insert Top Margin Band', 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertTopMarginBand'); },
                imageClassName: 'dxrd-image-actions-top_margin',
                imageTemplateName: 'dxrd-svg-actions-top_margin',
                disabled: ko.pureComputed(function () {
                    return !_this._canAddBand('TopMarginBand');
                }),
                visible: true,
                clickAction: function () { _this._addBand('TopMarginBand'); },
            }, {
                text: 'Insert Report Header Band',
                group: function () { return analytics_utils_1.getLocalization('Bands', 'ReportStringId.RibbonXRDesign_PageGroup_Bands'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Report Header Band', 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertReportHeaderBand'); },
                imageClassName: 'dxrd-image-actions-report_header',
                imageTemplateName: 'dxrd-svg-actions-report_header',
                disabled: ko.pureComputed(function () {
                    return !_this._canAddBand('ReportHeaderBand');
                }),
                visible: true,
                clickAction: function () { _this._addBand('ReportHeaderBand'); },
            }, {
                text: 'Insert Page Header Band',
                group: function () { return analytics_utils_1.getLocalization('Bands', 'ReportStringId.RibbonXRDesign_PageGroup_Bands'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Page Header Band', 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertPageHeaderBand'); },
                imageClassName: 'dxrd-image-actions-page_header',
                imageTemplateName: 'dxrd-svg-actions-page_header',
                disabled: ko.pureComputed(function () {
                    return !_this._canAddBand('PageHeaderBand');
                }),
                visible: true,
                clickAction: function () { _this._addBand('PageHeaderBand'); },
            }, {
                text: 'Insert Group Header Band',
                group: function () { return analytics_utils_1.getLocalization('Bands', 'ReportStringId.RibbonXRDesign_PageGroup_Bands'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Group Header Band', 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertGroupHeaderBand'); },
                imageClassName: 'dxrd-image-actions-group_header',
                imageTemplateName: 'dxrd-svg-actions-group_header',
                disabled: ko.pureComputed(function () {
                    return !_this._canAddBand('GroupHeaderBand');
                }),
                visible: true,
                clickAction: function () { _this._addBand('GroupHeaderBand'); },
            }, {
                text: 'Insert Detail Band',
                group: function () { return analytics_utils_1.getLocalization('Bands', 'ReportStringId.RibbonXRDesign_PageGroup_Bands'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Detail Band', 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertDetailBand'); },
                imageClassName: 'dxrd-image-actions-detail',
                imageTemplateName: 'dxrd-svg-actions-detail',
                disabled: ko.pureComputed(function () {
                    return !_this._canAddBand('DetailBand');
                }),
                visible: true,
                clickAction: function () { _this._addBand('DetailBand'); },
            }, {
                text: 'Insert Vertical Header Band',
                group: function () { return analytics_utils_1.getLocalization('Bands', 'ReportStringId.RibbonXRDesign_PageGroup_Bands'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Vertical Header Band', 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertVerticalHeaderBand'); },
                imageClassName: 'dxrd-image-actions-vertical_header',
                imageTemplateName: 'dxrd-svg-actions-vertical_header',
                disabled: ko.pureComputed(function () {
                    return !_this._canAddBand('VerticalHeaderBand');
                }),
                visible: true,
                clickAction: function () { _this._addBand('VerticalHeaderBand'); },
            }, {
                text: 'Insert Vertical Detail Band',
                group: function () { return analytics_utils_1.getLocalization('Bands', 'ReportStringId.RibbonXRDesign_PageGroup_Bands'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Vertical Detail Band', 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertVerticalDetailBand'); },
                imageClassName: 'dxrd-image-actions-vertical_detail',
                imageTemplateName: 'dxrd-svg-actions-vertical_detail',
                disabled: ko.pureComputed(function () {
                    return !_this._canAddBand('VerticalDetailBand');
                }),
                visible: true,
                clickAction: function () { _this._addBand('VerticalDetailBand'); },
            }, {
                text: 'Insert Vertical Total Band',
                group: function () { return analytics_utils_1.getLocalization('Bands', 'ReportStringId.RibbonXRDesign_PageGroup_Bands'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Vertical Total Band', 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertVerticalTotalBand'); },
                imageClassName: 'dxrd-image-actions-vertical_total',
                imageTemplateName: 'dxrd-svg-actions-vertical_total',
                disabled: ko.pureComputed(function () {
                    return !_this._canAddBand('VerticalTotalBand');
                }),
                visible: true,
                clickAction: function () { _this._addBand('VerticalTotalBand'); },
            }, {
                text: 'Insert Detail Report Band',
                group: function () { return analytics_utils_1.getLocalization('Bands', 'ReportStringId.RibbonXRDesign_PageGroup_Bands'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Detail Report Band', 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertDetailReportBand'); },
                imageClassName: 'dxrd-image-actions-detail_report',
                imageTemplateName: 'dxrd-svg-actions-detail_report',
                disabled: ko.pureComputed(function () {
                    return !_this._canAddBand('DetailReportBand');
                }),
                visible: true,
                clickAction: function () { _this._addBand('DetailReportBand'); },
            }, {
                text: 'Insert Group Footer Band',
                group: function () { return analytics_utils_1.getLocalization('Bands', 'ReportStringId.RibbonXRDesign_PageGroup_Bands'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Group Footer Band', 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertGroupFooterBand'); },
                imageClassName: 'dxrd-image-actions-group_footer',
                imageTemplateName: 'dxrd-svg-actions-group_footer',
                disabled: ko.pureComputed(function () {
                    return !_this._canAddBand('GroupFooterBand');
                }),
                visible: true,
                clickAction: function () { _this._addBand('GroupFooterBand'); },
            }, {
                text: 'Insert Report Footer Band',
                group: function () { return analytics_utils_1.getLocalization('Bands', 'ReportStringId.RibbonXRDesign_PageGroup_Bands'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Report Footer Band', 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertReportFooterBand'); },
                imageClassName: 'dxrd-image-actions-report_footer',
                imageTemplateName: 'dxrd-svg-actions-report_footer',
                disabled: ko.pureComputed(function () {
                    return !_this._canAddBand('ReportFooterBand');
                }),
                visible: true,
                clickAction: function () { _this._addBand('ReportFooterBand'); },
            }, {
                text: 'Insert Page Footer Band',
                group: function () { return analytics_utils_1.getLocalization('Bands', 'ReportStringId.RibbonXRDesign_PageGroup_Bands'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Page Footer Band', 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertPageFooterBand'); },
                imageClassName: 'dxrd-image-actions-page_footer',
                imageTemplateName: 'dxrd-svg-actions-page_footer',
                disabled: ko.pureComputed(function () {
                    return !_this._canAddBand('PageFooterBand');
                }),
                visible: true,
                clickAction: function () { _this._addBand('PageFooterBand'); },
            }, {
                text: 'Insert Bottom Margin Band',
                group: function () { return analytics_utils_1.getLocalization('Bands', 'ReportStringId.RibbonXRDesign_PageGroup_Bands'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Bottom Margin Band', 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertBottomMarginBand'); },
                imageClassName: 'dxrd-image-actions-bottom_margin',
                imageTemplateName: 'dxrd-svg-actions-bottom_margin',
                disabled: ko.pureComputed(function () {
                    return !_this._canAddBand('BottomMarginBand');
                }),
                visible: true,
                clickAction: function () { _this._addBand('BottomMarginBand'); },
            }, {
                text: 'Insert Sub-Band',
                group: function () { return analytics_utils_1.getLocalization('Bands', 'ReportStringId.RibbonXRDesign_PageGroup_Bands'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Sub-Band', 'ASPxReportsStringId.ReportDesigner_ReportActions_InsertSubBand'); },
                imageClassName: 'dxrd-image-actions-subband',
                imageTemplateName: 'dxrd-svg-actions-subband',
                disabled: ko.pureComputed(function () {
                    return !_this._canAddBand('SubBand');
                }),
                visible: true,
                clickAction: function () { _this._addBand('SubBand'); },
            }
        ];
        this.onComponentAdded = function (e) { onComponentAdded && onComponentAdded(e); };
    }
    ReportActions.prototype._canAddBand = function (bandType) {
        if (!this._targetModel()) {
            return false;
        }
        var report = this._targetModel().root;
        if (report && report.language && report.language() !== metadata_1.defaultCulture)
            return false;
        if (bandType === 'GroupHeaderBand' || bandType === 'GroupFooterBand' || bandType === 'DetailReportBand') {
            return true;
        }
        if (bandType === 'SubBand') {
            var model = (this._contextModel());
            return model !== null && !model.lockedInUserDesigner() && (model.controlType.indexOf('XtraReport') === -1 && ['DetailReportBand', 'TopMarginBand', 'BottomMarginBand', 'SubBand'].indexOf(model.controlType) === -1);
        }
        if (this._targetModel().controlType === 'DetailReportBand' && (bandType === 'TopMarginBand' || bandType === 'BottomMarginBand' || bandType === 'PageHeaderBand' || bandType === 'PageFooterBand')) {
            return false;
        }
        return this._targetModel()['bands']().filter(function (band) { return band.controlType === bandType; }).length === 0;
    };
    ReportActions.prototype._addBand = function (bandType) {
        if (this._canAddBand(bandType)) {
            var model = this._targetModel();
            if (bandType === 'SubBand') {
                model = this._contextModel();
            }
            var height = model.root['dpi']();
            var control = model.createChild({ '@ControlType': bandType, '@HeightF': height });
            this.onComponentAdded({ parent: model, model: control });
        }
    };
    ReportActions.prototype.getActions = function (context) {
        if (context instanceof xrReport_1.ReportViewModel || context instanceof xrBand_1.BandViewModel) {
            this._contextModel(context);
            return this.actions;
        }
        else {
            this._contextModel(null);
        }
        return [];
    };
    return ReportActions;
}());
exports.ReportActions = ReportActions;
