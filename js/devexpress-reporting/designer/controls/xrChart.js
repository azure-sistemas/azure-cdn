﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrChart.js)
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
var xrControl_1 = require("./xrControl");
var _commonValue_1 = require("../../chart/internal/data/_commonValue");
var _valueWeight_1 = require("../../chart/internal/data/_valueWeight");
var _value1Value2_1 = require("../../chart/internal/data/_value1Value2");
var _stockValue_1 = require("../../chart/internal/data/_stockValue");
var _control_1 = require("../../chart/_control");
var xrPivotgrid_1 = require("./xrPivotgrid");
var _localizationUtils_1 = require("./utils/_localizationUtils");
var controlParameter_1 = require("./properties/controlParameter");
var settings_1 = require("../utils/settings");
var _reportRenderingService_1 = require("../services/_reportRenderingService");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var XRChartViewModel = (function (_super) {
    __extends(XRChartViewModel, _super);
    function XRChartViewModel(model, parent, serializer) {
        var _this = _super.call(this, model, parent, serializer) || this;
        ['seriesDataMember', 'dataMember'].forEach(function (val) {
            _this[val] = ko.computed({
                read: function () {
                    return _this.chart.dataContainer[val]();
                }, write: function (newVal) {
                    _this.chart.dataContainer[val](newVal);
                }
            });
        });
        ['appearanceName', 'paletteName'].forEach(function (val) {
            _this[val] = ko.computed({
                read: function () {
                    return _this.chart[val]();
                }, write: function (newVal) {
                    _this.chart[val](newVal);
                }
            });
        });
        _this.controlParameters = analytics_utils_1.deserializeArray(model.Parameters, function (item) { return new controlParameter_1.ControlParameter(item, serializer); });
        _this._disposables.push(_this.controlParameters.subscribe(function (args) {
            args.forEach(function (change) {
                if (!change.value.parameterName()) {
                    change.value.parameterName(analytics_internal_1.getUniqueNameForNamedObjectsArray(_this.controlParameters(), 'controlParameter'));
                }
            });
        }, null, 'arrayChange'));
        _this.pivotGridDataSourceOptions = ko.computed(function () {
            return _this.chart.dataContainer.pivotGridDataSourceOptions;
        });
        _this.isPivotGridDataSource = ko.observable(_this.dataSource() instanceof xrPivotgrid_1.XRPivotGridViewModel);
        _this.isPivotGridDataSource.subscribe(function (newVal) {
            XRChartViewModel.setDataMembers(_this.chart, newVal);
        });
        _this.realDataSource = ko.computed(function () {
            _this.isPivotGridDataSource(_this.dataSource() instanceof xrPivotgrid_1.XRPivotGridViewModel);
            var rootSource = _this.root && _this.root['dataSource'] && _this.root['dataSource']();
            return _this.dataSource() || rootSource;
        });
        _this._disposables.push(ko.computed(function () {
            var dataSources = _this.root && _this.root.dsHelperProvider && _this.root.dsHelperProvider() && _this.root.dsHelperProvider().usedDataSources().map(function (ds) { return ds.data; });
            if (dataSources && !_this.isPivotGridDataSource() && dataSources.indexOf(_this.dataSource()) === -1)
                _this.dataSource(null);
        }));
        _this.chartModel = _this._createChartModel();
        _this.isPivotGridDataSource.subscribe(function (newVal) {
            XRChartViewModel.setDataMembers(_this.chart, newVal);
        });
        return _this;
    }
    XRChartViewModel.assignValueDataMembers = function (chart, str) {
        var valueDataMembers = chart.dataContainer.seriesTemplate.valueDataMembers();
        var assign = function (array) {
            array.forEach(function (property) { valueDataMembers[property](str); });
        };
        if (valueDataMembers instanceof _commonValue_1.CommonValueDataMembers) {
            assign(['value']);
        }
        else if (valueDataMembers instanceof _valueWeight_1.ValueWeightDataMembers) {
            assign(['value', 'weight']);
        }
        else if (valueDataMembers instanceof _value1Value2_1.Value1Value2DataMembers) {
            assign(['value1', 'value2']);
        }
        else if (valueDataMembers instanceof _stockValue_1.StockValueDataMembers) {
            assign(['open', 'close', 'hight', 'low']);
        }
    };
    XRChartViewModel.setDataMembers = function (chart, isPivotGrid) {
        if (isPivotGrid) {
            XRChartViewModel.assignValueDataMembers(chart, 'Values');
            chart.dataContainer.seriesTemplate.argumentDataMember('Arguments');
            chart.dataContainer.seriesDataMember('Series');
        }
        else {
            XRChartViewModel.assignValueDataMembers(chart, null);
            chart.dataContainer.seriesTemplate.argumentDataMember(null);
            chart.dataContainer.seriesDataMember(null);
        }
    };
    XRChartViewModel.prototype._createChartModel = function () {
        var _this = this;
        var model = new _control_1.ChartControlViewModel({
            chart: this.chart,
            dataSource: this.dataSource,
            parameters: this.controlParameters
        });
        model.isSeriesPropertyDisabled = function (propertyName) {
            if (!_this.realDataSource() || (_this.realDataSource() instanceof xrPivotgrid_1.XRPivotGridViewModel)) {
                return propertyName === 'argumentDataMember' || propertyName === 'valueDataMembers' || propertyName === 'colorDataMember';
            }
        };
        model.isSeriesTemplatePropertyDisabled = function (propertyName) {
            if (!_this.realDataSource() || (_this.realDataSource() instanceof xrPivotgrid_1.XRPivotGridViewModel && model.chart.dataContainer.pivotGridDataSourceOptions.autoBindingSettingsEnabled())) {
                return propertyName === 'argumentDataMember' || propertyName === 'valueDataMembers' || propertyName === 'valueScaleType' || propertyName === 'argumentScaleType';
            }
        };
        model.getPath = function (propertyName) {
            if (_this.realDataSource() instanceof xrPivotgrid_1.XRPivotGridViewModel || propertyName === 'dataMember')
                return _this.getPath(propertyName);
            if (propertyName === 'seriesDataMember') {
                return analytics_internal_1.getFullPath(_this.getPath('dataMember'), model.dataMember());
            }
        };
        model.isPropertyDisabled = function (propertyName) {
            return _this.isPropertyDisabled(propertyName);
        };
        return model;
    };
    XRChartViewModel.prototype.createLocalizationProvider = function () {
        return new _localizationUtils_1.ChartLocalizationProvider(this);
    };
    XRChartViewModel.prototype.isPropertyDisabled = function (name) {
        if (!this.realDataSource() || (this.realDataSource() instanceof xrPivotgrid_1.XRPivotGridViewModel && this.pivotGridDataSourceOptions()['autoBindingSettingsEnabled']())) {
            return name === 'seriesDataMember' || name === 'dataMember';
        }
        else if (!this.realDataSource() || this.realDataSource() instanceof xrPivotgrid_1.XRPivotGridViewModel) {
            return name === 'dataMember';
        }
        return _super.prototype.isPropertyDisabled.call(this, name);
    };
    XRChartViewModel.prototype.getPath = function (propertyName) {
        if (this.dataSource() instanceof xrPivotgrid_1.XRPivotGridViewModel) {
            return ['PivotGrid', propertyName].join('.');
        }
        var dsHelperProvider = this.dsHelperProvider();
        var dataSourceName = dsHelperProvider && dsHelperProvider.getDataSourcePath(this.realDataSource());
        if (propertyName === 'seriesDataMember') {
            return analytics_internal_1.getFullPath(dataSourceName, this.dataMember());
        }
        else if (propertyName === 'dataMember') {
            return dataSourceName;
        }
    };
    return XRChartViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRChartViewModel = XRChartViewModel;
var XRChartSurface = (function (_super) {
    __extends(XRChartSurface, _super);
    function XRChartSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this.designTime = ko.observable(false);
        _this.isLoading = ko.observable(false);
        _this.imageSrc = ko.observable('');
        _this.template = 'dxrd-shape';
        _this.contenttemplate = 'dxrd-shape-content';
        _this.selectiontemplate = 'dxrd-chart-selection';
        _this._disposables.push(ko.computed(function () {
            if (!_this.designTime()) {
                var _self = _this;
                if (settings_1.HandlerUri()) {
                    _self.isLoading(true);
                    _reportRenderingService_1.ReportRenderingService.getChartImage(_this).done(function (result) {
                        _self.isLoading(false);
                        _self.imageSrc('data:image/svg+xml;base64,' + result.Image);
                    }).fail(function (jqXHR) {
                        _self.isLoading(false);
                        analytics_internal_1.NotifyAboutWarning('Impossible to get chart image.');
                    });
                }
            }
        }).extend({ deferred: true }));
        return _this;
    }
    XRChartSurface.prototype.runDesignerButtonText = function () {
        return analytics_utils_1.getLocalization('Run Designer', 'ReportStringId.Verb_RunDesigner');
    };
    return XRChartSurface;
}(xrControl_1.XRControlSurface));
exports.XRChartSurface = XRChartSurface;
