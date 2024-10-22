﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_dataContainer.js)
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
var _chart_1 = require("../../internal/meta/_chart");
var _series_1 = require("../series/_series");
var _utils_1 = require("../../internal/_utils");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var ko = require("knockout");
var _utils_2 = require("../../_utils");
var DataContainerViewModel = (function (_super) {
    __extends(DataContainerViewModel, _super);
    function DataContainerViewModel(model, serializer) {
        var _this = _super.call(this, model, serializer, _chart_1.dataContainerSerializationsInfo) || this;
        _this.series = _utils_2.deserializeModelArray(model && model.SeriesSerializable, function (item, parent) { return new _series_1.SeriesViewModel(item, parent, serializer); }, _series_1.SeriesViewModel.prefix);
        var array = _chart_1.viewBindableSerializationInfo.valuesArray;
        var actions = [];
        for (var i = 0; i < array.length; i++) {
            var value = array[i];
            var getImageClassName = function (isTemplate) {
                if (isTemplate === void 0) { isTemplate = false; }
                return (isTemplate ? 'dxrd-svg-fieldlist-' : 'dx-image-fieldlist-') + _utils_2.getSeriesClassName(value.value);
            };
            actions.push({
                text: analytics_internal_1.getLocalization(value.displayValue, value.localizationId),
                imageClassName: getImageClassName(),
                imageTemplateName: analytics_widgets_internal_1.SvgTemplatesEngine.getExistingTemplate(getImageClassName(true)),
                disabled: ko.observable(false),
                visible: true,
                clickAction: (function (typeName) { return function (item) {
                    _this.series()['innerActions'][0].closePopover();
                    _this.series.push(new _series_1.SeriesViewModel({
                        '@Name': analytics_internal_1.getUniqueName(_this.series().map(function (x) { return x['name'](); }), _series_1.SeriesViewModel.prefix),
                        'View': {
                            '@TypeNameSerializable': typeName,
                        }
                    }, _this.series));
                }; })(value.value)
            });
        }
        _this.series()['innerActions'] = _utils_1.createInnerActionsWithPopover(analytics_internal_1.getLocalization('Add', 'ChartStringId.MenuItemAdd'), 'addseries-action', actions);
        return _this;
    }
    DataContainerViewModel.from = function (model, serializer) {
        return new DataContainerViewModel(model || {}, serializer);
    };
    DataContainerViewModel.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, _chart_1.dataContainerSerializationsInfo, refs);
    };
    return DataContainerViewModel;
}(analytics_elements_1.SerializableModel));
exports.DataContainerViewModel = DataContainerViewModel;
