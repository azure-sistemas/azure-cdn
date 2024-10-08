﻿/**
* DevExpress HTML/JS Reporting (designer\actions\pivotGridActions.js)
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
var xrPivotgrid_1 = require("../controls/xrPivotgrid");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var settings_1 = require("../utils/settings");
var _defaultCrossTabControl_1 = require("../internal/_defaultCrossTabControl");
var _crossTabConverter_1 = require("../internal/_crossTabConverter");
var PivotGridActions = (function (_super) {
    __extends(PivotGridActions, _super);
    function PivotGridActions(_converters, isDisabled) {
        if (isDisabled === void 0) { isDisabled = function () { return false; }; }
        var _this = _super.call(this) || this;
        _this._converters = _converters;
        _super.prototype.initActions.call(_this, [
            {
                text: 'Insert Field in Filter Area',
                group: function () { return analytics_utils_1.getLocalization('Pivot Grid', 'ReportStringId.RibbonXRDesign_PageGroup_PivotGrid'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Field in Filter Area', 'ASPxReportsStringId.ReportDesigner_PivotActions_InsertFieldInTheFilterArea'); },
                imageClassName: 'dxrd-image-actions-add_field_to_filter_area',
                imageTemplateName: 'dxrd-svg-actions-add_field_to_filter_area',
                disabled: ko.pureComputed(function () { return isDisabled(); }),
                clickAction: function (model) { model['addFieldToArea']('FilterArea'); }
            },
            {
                text: 'Insert Field in Data Area',
                group: function () { return analytics_utils_1.getLocalization('Pivot Grid', 'ReportStringId.RibbonXRDesign_PageGroup_PivotGrid'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Field in Data Area', 'ASPxReportsStringId.ReportDesigner_PivotActions_InsertFieldInTheDataArea'); },
                imageClassName: 'dxrd-image-actions-add_field_to_data_area',
                imageTemplateName: 'dxrd-svg-actions-add_field_to_data_area',
                disabled: ko.pureComputed(function () { return isDisabled(); }),
                clickAction: function (model) { model['addFieldToArea']('DataArea'); }
            },
            {
                text: 'Insert Field in Column Area',
                group: function () { return analytics_utils_1.getLocalization('Pivot Grid', 'ReportStringId.RibbonXRDesign_PageGroup_PivotGrid'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Field in Column Area', 'ASPxReportsStringId.ReportDesigner_PivotActions_InsertFieldInTheColumnArea'); },
                imageClassName: 'dxrd-image-actions-add_field_to_column_area',
                imageTemplateName: 'dxrd-svg-actions-add_field_to_column_area',
                disabled: ko.pureComputed(function () { return isDisabled(); }),
                clickAction: function (model) { model['addFieldToArea']('ColumnArea'); }
            },
            {
                text: 'Insert Field in Row Area',
                group: function () { return analytics_utils_1.getLocalization('Pivot Grid', 'ReportStringId.RibbonXRDesign_PageGroup_PivotGrid'); },
                displayText: function () { return analytics_utils_1.getLocalization('Insert Field in Row Area', 'ASPxReportsStringId.ReportDesigner_PivotActions_InsertFieldInTheRowArea'); },
                imageClassName: 'dxrd-image-actions-add_field_to_row_area',
                imageTemplateName: 'dxrd-svg-actions-add_field_to_row_area',
                disabled: ko.pureComputed(function () { return isDisabled(); }),
                clickAction: function (model) { model['addFieldToArea']('RowArea'); }
            },
            {
                text: 'Convert to Cross Tab',
                group: function () { return analytics_utils_1.getLocalization('Pivot Grid', 'ReportStringId.RibbonXRDesign_PageGroup_PivotGrid'); },
                displayText: function () { return analytics_utils_1.getLocalization('Convert to Cross Tab', 'ReportStringId.Verb_ConvertPivotGridToCrossTab'); },
                imageClassName: 'dxrd-image-actions-convertation',
                imageTemplateName: 'dxrd-svg-actions-convertation',
                disabled: ko.pureComputed(function () { return isDisabled(); }),
                visible: settings_1.DefaultCrossTabControl() == _defaultCrossTabControl_1.DefaultCrossTabControlEnum.XRCrossTab,
                clickAction: function (model) {
                    var converter = _this._converter;
                    converter && converter.convert(model);
                }
            }
        ]);
        return _this;
    }
    Object.defineProperty(PivotGridActions.prototype, "_converter", {
        get: function () {
            return this._converters.filter(function (x) { return x instanceof _crossTabConverter_1.CrossTabConverter; })[0];
        },
        enumerable: true,
        configurable: true
    });
    PivotGridActions.prototype.condition = function (context) {
        return context instanceof xrPivotgrid_1.XRPivotGridViewModel;
    };
    return PivotGridActions;
}(analytics_internal_1.BaseActionsProvider));
exports.PivotGridActions = PivotGridActions;
