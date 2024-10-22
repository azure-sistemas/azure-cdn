﻿/**
* DevExpress HTML/JS Reporting (chart\_control.js)
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
var _chart_1 = require("./components/models/_chart");
var _initializer_1 = require("./_initializer");
var _chart_2 = require("./internal/meta/_chart");
var _template_1 = require("./components/series/_template");
var _utils_1 = require("./internal/_utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var ChartControlViewModel = (function (_super) {
    __extends(ChartControlViewModel, _super);
    function ChartControlViewModel(options) {
        var _this = _super.call(this) || this;
        _this.fieldListProvider = ko.observable(null);
        _this.chart = options.chart ? options.chart : new _chart_1.ChartViewModel(options.chartSource, new analytics_utils_1.ModelSerializer());
        _this.dataSource = options.dataSource;
        _this.parameters = options.parameters;
        _this._initChartElementFunctions();
        ['seriesDataMember', 'dataMember'].forEach(function (val) {
            _this[val] = ko.computed({
                read: function () {
                    return _this.chart.dataContainer[val]();
                }, write: function (newVal) {
                    _this.chart.dataContainer[val](newVal);
                }
            });
        });
        return _this;
    }
    ChartControlViewModel.prototype.getInfo = function () {
        return _chart_2.chartControlSerializationsInfo;
    };
    ChartControlViewModel.prototype.getControlFactory = function () {
        return _initializer_1.controlsFactory;
    };
    ChartControlViewModel.prototype.isSeriesPropertyDisabled = function (name) {
        if (!this.dataSource()) {
            return name === 'argumentDataMember' || name === 'valueDataMembers' || name === 'colorDataMember' || name === 'filterString';
        }
    };
    ChartControlViewModel.prototype.isSeriesTemplatePropertyDisabled = function (name) {
        if (!this.dataSource()) {
            return name === 'argumentDataMember' || name === 'valueDataMembers' || name === 'valueScaleType' || name === 'filterString';
        }
    };
    ChartControlViewModel.prototype._getSeriesActualArgumentScaleType = function (argumentDataMember) {
        var deffered = $.Deferred();
        if (this.fieldListProvider() && argumentDataMember) {
            var seriesDataMember = this.getPath('seriesDataMember');
            var argumentFieldName = argumentDataMember;
            var argumentDataMemberPathComponents = argumentDataMember.split('.');
            if (argumentDataMemberPathComponents.length > 1) {
                argumentFieldName = argumentDataMemberPathComponents.pop();
                argumentDataMemberPathComponents.splice(0, 0, seriesDataMember);
                seriesDataMember = argumentDataMemberPathComponents.join('.');
            }
            this.fieldListProvider().getItems(new analytics_utils_1.PathRequest(seriesDataMember))
                .done(function (items) {
                var result = items.filter(function (item) { return item.name === argumentFieldName; })[0];
                var _scaleType = _template_1.ScaleType.Numerical;
                if (result && result.specifics) {
                    if (_utils_1._isNumericTypeSpecific(result.specifics))
                        _scaleType = _template_1.ScaleType.Numerical;
                    else if (_utils_1._isDateTypeSpecific(result.specifics))
                        _scaleType = _template_1.ScaleType.DateTime;
                    else
                        _scaleType = _template_1.ScaleType.Qualitative;
                }
                deffered.resolve(_scaleType);
            })
                .fail(function () {
                deffered.resolve(_template_1.ScaleType.Numerical);
            });
        }
        else {
            deffered.resolve(_template_1.ScaleType.Numerical);
        }
        return deffered.promise();
    };
    ChartControlViewModel.prototype._initSeries = function (series) {
        var _this = this;
        series['getPath'] = function (propertyName) {
            if (propertyName === 'argumentDataMember' || propertyName === 'colorDataMember' || propertyName === 'summaryFunction') {
                return _this.getPath('seriesDataMember');
            }
        };
        series['isPropertyDisabled'] = function (name) {
            return series._isPropertyDisabled(name) || _this.isSeriesPropertyDisabled(name);
        };
        series._disposables.push(series.filterString.helper.parameters = ko.computed(function () {
            return _this.parameters && _this.parameters();
        }));
        series.valueDataMembers()['getPath'] = function (propertyName) {
            return _this.getPath('seriesDataMember');
        };
        series._disposables.push(series.valueDataMembers.subscribe(function (newVal) {
            newVal['getPath'] = function (propertyName) {
                return _this.getPath('seriesDataMember');
            };
        }));
        series._disposables.push(series.argumentDataMember.subscribe(function (newValue) {
            if (_this.chart.dataContainer.seriesTemplate.argumentScaleType() !== 'Auto')
                return;
            _this._getSeriesActualArgumentScaleType(newValue).done(function (scaleType) {
                series._actualArgumentScaleType(scaleType);
            });
        }));
        series._disposables.push(series.argumentScaleType.subscribe(function (newVal) {
            if (newVal !== 'Auto' && newVal !== 'Qualitative')
                _this._getSeriesActualArgumentScaleType(series.argumentDataMember()).done(function (scaleType) {
                    if (scaleType !== _template_1.ScaleTypeMap[newVal])
                        series.argumentDataMember('');
                });
            series._actualArgumentScaleType(newVal == 'Auto' ? _template_1.ScaleType.Numerical : _template_1.ScaleTypeMap[newVal]);
        }));
    };
    ChartControlViewModel.prototype._initChartElementFunctions = function () {
        var _this = this;
        this._initSeries(this.chart.dataContainer.seriesTemplate);
        this.chart.dataContainer.series().forEach(function (series) { return _this._initSeries(series); });
        this._disposables.push(this.chart.dataContainer.series.subscribe(function (args) {
            if (args[0].status === 'added') {
                _this._initSeries(args[0].value);
            }
        }, null, 'arrayChange'));
        this.chart.dataContainer.seriesTemplate['getPath'] = function (propertyName) {
            return _this.getPath('seriesDataMember');
        };
        this.chart.dataContainer.seriesTemplate['isPropertyDisabled'] = function (name) {
            return _this.chart.dataContainer.seriesTemplate._isPropertyDisabled(name) || _this.isSeriesTemplatePropertyDisabled(name);
        };
        this._disposables.push(this.chart.dataContainer.seriesTemplate.filterString.helper.parameters = ko.computed(function () {
            return _this.parameters && _this.parameters();
        }));
        this.chart.dataContainer.seriesTemplate.valueDataMembers()['getPath'] = function (propertyName) {
            return _this.getPath('seriesDataMember');
        };
        this._disposables.push(this.chart.dataContainer.seriesTemplate.valueDataMembers.subscribe(function (newValue) {
            newValue['getPath'] = function (propertyName) {
                return _this.getPath('seriesDataMember');
            };
        }));
        this._disposables.push(this.chart.dataContainer.seriesTemplate.argumentDataMember.subscribe(function (newValue) {
            if (_this.chart.dataContainer.seriesTemplate.argumentScaleType() !== 'Auto')
                return;
            _this._getSeriesActualArgumentScaleType(newValue).done(function (scaleType) {
                _this.chart.dataContainer.seriesTemplate._actualArgumentScaleType(scaleType);
            });
        }));
    };
    ChartControlViewModel.prototype.getPath = function (propertyName) {
        var dataSourceInfo = this.dataSource();
        var dataSourceName = (dataSourceInfo && dataSourceInfo.data && (dataSourceInfo.id || dataSourceInfo.ref)) || '';
        if (propertyName === 'seriesDataMember' || propertyName === 'valueDataMembers' || propertyName === 'colorDataMember') {
            return analytics_internal_1.getFullPath(dataSourceName, this.chart.dataContainer.dataMember());
        }
        else if (propertyName === 'dataMember') {
            return dataSourceName;
        }
    };
    ChartControlViewModel.prototype.serialize = function () {
        return (new analytics_utils_1.ModelSerializer()).serialize(this);
    };
    ChartControlViewModel.prototype.save = function () {
        var data = this.serialize();
        if (this.onSave) {
            this.onSave(data);
        }
        return data;
    };
    ChartControlViewModel.prototype.isPropertyDisabled = function (name) {
        return !this.dataSource() && (name === 'seriesDataMember' || name === 'dataMember');
    };
    return ChartControlViewModel;
}(analytics_utils_1.Disposable));
exports.ChartControlViewModel = ChartControlViewModel;
