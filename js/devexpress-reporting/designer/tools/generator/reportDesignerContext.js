﻿/**
* DevExpress HTML/JS Reporting (designer\tools\generator\reportDesignerContext.js)
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
var xrReport_1 = require("../../controls/xrReport");
var _calculatedFieldsSource_1 = require("../../internal/fieldlist/_calculatedFieldsSource");
var _parametersViewModel_1 = require("../../internal/fieldlist/_parametersViewModel");
var _displayNameProvider_1 = require("../../internal/_displayNameProvider");
var _reportItemsProvider_1 = require("../../internal/reportExplorer/_reportItemsProvider");
var _dataSourceHelper_1 = require("../../helpers/_dataSourceHelper");
var _fieldListDataSourcesHelper_1 = require("../../internal/fieldlist/_fieldListDataSourcesHelper");
var _designControlsHelper_1 = require("../../helpers/_designControlsHelper");
var _dataSourceItemsExtender_1 = require("../../internal/fieldlist/_dataSourceItemsExtender");
var _chartFieldListExtender_1 = require("../../controls/utils/_chartFieldListExtender");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var _styleHelper_1 = require("../../helpers/_styleHelper");
var _designerErrorProvider_1 = require("../../internal/errorPanel/_designerErrorProvider");
var _runtimeErrorProvider_1 = require("../../internal/errorPanel/_runtimeErrorProvider");
var ReportDesignerContext = (function (_super) {
    __extends(ReportDesignerContext, _super);
    function ReportDesignerContext(options) {
        var _this = _super.call(this) || this;
        _this.report = options.report || new xrReport_1.ReportViewModel(options.data);
        _this.url = ko.isObservable(options.url) ? options.url : ko.observable(options.url);
        if (options.dataSourceRefs)
            _this.report.dataSourceRefs = options.dataSourceRefs;
        _this.report.parameterHelper.initialize(options.knownEnums, options.designerCallbacks);
        var selection = options.selection;
        var data = options.initializeOptions;
        var designerCallbacks = options.designerCallbacks;
        _this.surface = new xrReport_1.ReportSurface(_this.report);
        _this.parameters = new _parametersViewModel_1.ParametersViewModel(_this.report);
        _this.dataSourceHelper = new _dataSourceHelper_1.DataSourceHelper(_this.report.objectStorage, _this.report.dataSourceRefs, data.availableDataSources);
        _this.report.dataSourceHelper(_this.dataSourceHelper);
        _this.fieldListDataSourceHelper = new _fieldListDataSourcesHelper_1.FieldListDataSourcesHelper();
        _this.fieldListDataSourceHelper.updateDataSources(_this.dataSourceHelper, _this.report, _this.parameters.parameters);
        _this.calcFieldsSource = new _calculatedFieldsSource_1.CalculatedFieldsSource(_this.report.calculatedFields, _this.report.dataSource, _this.dataSourceHelper);
        var chartValueBindingAvailableSources = ko.observableArray(_this._getChartAvailableSources(_this.dataSourceHelper, _this.report.dataSource(), _this.parameters));
        var subscription = _this.report.dataSource.subscribe(function (newVal) {
            chartValueBindingAvailableSources(_this._getChartAvailableSources(_this.dataSourceHelper, newVal, _this.parameters));
        });
        _this._disposables.push({
            dispose: function () {
                chartValueBindingAvailableSources([]);
                subscription.dispose();
            }
        });
        var dataSourceItemsExtender = new _dataSourceItemsExtender_1.DataSourceItemsExtender(_this.dataSourceHelper.usedDataSources);
        var chartFieldListExtender = new _chartFieldListExtender_1.ChartFieldListExtender();
        _this.state = function () {
            var extensions = _this.report && _this.report.extensions.peek() || [];
            if (extensions.length > 0) {
                return {
                    reportExtensions: _this.report.extensions().map(function (item) {
                        return {
                            'Key': item.key(),
                            'Value': item.value()
                        };
                    })
                };
            }
            return data.state;
        };
        _this.fieldListItemsExtenders = [
            _this.parameters,
            dataSourceItemsExtender,
            _this.calcFieldsSource,
            chartFieldListExtender
        ];
        _this.controlsHelper = new _designControlsHelper_1.DesignControlsHelper(_this.report, selection);
        _this.stylesHelper = new _styleHelper_1.StylesHelper(_this.report, _this.controlsHelper);
        _this.report.stylesHelper(_this.stylesHelper);
        var wrappedCallback = _this.fieldListDataSourceHelper.wrapFieldsCallback(designerCallbacks.fieldLists, _this.state);
        _this.fieldListProvider = new analytics_internal_1.FieldListProvider(wrappedCallback, _this.fieldListDataSourceHelper.fieldListDataSources, _this.fieldListItemsExtenders);
        _this.reportItemsProvider = new _reportItemsProvider_1.ReportItemsProvider(_this.controlsHelper, _this.fieldListProvider);
        _this.dataBindingsProvider = new analytics_internal_1.FieldListProvider(wrappedCallback, _this.fieldListDataSourceHelper.fieldListDataSources, [_this.parameters, _this.calcFieldsSource, chartFieldListExtender]);
        _this.report.dataBindingsProvider(_this.dataBindingsProvider);
        _this.chartValueBindingProvider = new analytics_internal_1.FieldListProvider(wrappedCallback, chartValueBindingAvailableSources, [_this.parameters, _this.calcFieldsSource]);
        _this.displayNameProvider = new _displayNameProvider_1.DisplayNameProvider(_this.fieldListProvider, _this.fieldListDataSourceHelper.dataSourceHelper(), _this.report.dataSource);
        _this.expressionDisplayNameProvider = new _displayNameProvider_1.DisplayNameProvider(_this.reportItemsProvider, _this.fieldListDataSourceHelper.dataSourceHelper(), _this.report.dataSource);
        _this.reportErrorProvider = new _designerErrorProvider_1.DesignerErrorProvider(_this.report);
        _this.runtimeErrorProvider = new _runtimeErrorProvider_1.RuntimeErrorProvider();
        _this._disposables.push(_this.report);
        _this._disposables.push(_this.surface);
        _this._disposables.push(_this.displayNameProvider);
        _this._disposables.push(_this.expressionDisplayNameProvider);
        _this._disposables.push(_this.dataSourceHelper);
        _this._disposables.push(_this.fieldListDataSourceHelper);
        _this._disposables.push(_this.calcFieldsSource);
        _this._disposables.push(_this.parameters);
        _this._disposables.push(_this.controlsHelper);
        _this._disposables.push(_this.reportItemsProvider);
        _this._disposables.push(_this.stylesHelper);
        _this._disposables.push(_this.reportErrorProvider);
        return _this;
    }
    ReportDesignerContext.prototype._getChartAvailableSources = function (dsHelper, dataSource, parameters) {
        return [
            dataSource && dsHelper.findDataSourceInfo(dataSource),
            { ref: 'Parameters', name: 'Parameters', specifics: 'parameters', data: parameters },
            { ref: 'none', name: 'none', specifics: 'none', data: null }
        ].filter(function (x) { return x; });
    };
    ReportDesignerContext.prototype.getInfo = function () {
        return [{ propertyName: 'report', modelName: '@Report' }];
    };
    ReportDesignerContext.prototype.isModelReady = function () {
        return this.report && this.report.isModelReady();
    };
    ReportDesignerContext.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.report = null;
        this.url = null;
        this.surface = null;
        this.parameters = null;
        this.dataSourceHelper = null;
        this.fieldListDataSourceHelper = null;
        this.calcFieldsSource = null;
        this.fieldListItemsExtenders = [];
        this.controlsHelper = null;
        this.fieldListProvider = null;
        this.reportItemsProvider = null;
        this.dataBindingsProvider = null;
        this.chartValueBindingProvider = null;
        this.displayNameProvider = null;
        this.expressionDisplayNameProvider = null;
        this.stylesHelper = null;
        this.dataBindingsProvider = null;
    };
    return ReportDesignerContext;
}(analytics_utils_1.Disposable));
exports.ReportDesignerContext = ReportDesignerContext;
