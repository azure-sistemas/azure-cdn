﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_chartUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_tools_1 = require("@devexpress/analytics-core/analytics-tools");
exports.createChartDesignerOptions = function (designerModel, dataSourceHelper, model, parameters, chartValueBindingProvider) {
    var chartDesignerOptionsVisible = ko.observable(false);
    var chartIsDirty;
    var currentChart = ko.observable(null);
    var disposables = [];
    var chartDisposables = [];
    disposables.push(chartDesignerOptionsVisible.subscribe(function (newVal) {
        if (newVal) {
            currentChart().designTime(true);
            designerModel.undoEngine().start();
        }
        else {
            chartDisposables.forEach(function (x) { return x.dispose(); });
            chartDisposables = [];
            designerModel.undoEngine().end();
            var isDirty = chartIsDirty();
            chartDesignerOptions.options.data.chart(null);
            if (isDirty) {
                var undoEngine = designerModel.undoEngine();
                undoEngine.undo();
                undoEngine.redoEnabled(false);
                undoEngine._observers.pop();
            }
            currentChart().designTime(false);
            currentChart(null);
        }
    }));
    var chartDesignerOptions = {
        dispose: function () {
            chartDisposables.forEach(function (x) { return x.dispose(); });
            disposables.forEach(function (x) { return x.dispose(); });
            chartDisposables = [];
            disposables = [];
        },
        options: null,
        visible: chartDesignerOptionsVisible,
        buttons: [{
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: analytics_utils_1.getLocalization('OK', 'PivotGridStringId.FilterOk'), onClick: function () {
                        chartIsDirty(false);
                        chartDesignerOptionsVisible(false);
                    }
                }
            },
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: analytics_utils_1.getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel'), onClick: function () {
                        chartDesignerOptionsVisible(false);
                    }
                }
            }],
        run: function (chartSurface) {
            var xrChart = chartSurface._control;
            currentChart(chartSurface);
            if (!chartDesignerOptions.options) {
                chartDesignerOptions.options = {
                    callbacks: {
                        customizeActions: function (actions) {
                            for (var i = 0; i < actions.length; i++) {
                                if (actions[i].id === analytics_tools_1.ActionId.Undo || actions[i].id === analytics_tools_1.ActionId.Redo) {
                                    actions[i].hasSeparator = false;
                                }
                                else {
                                    actions[i].visible = false;
                                    actions[i].hasSeparator = false;
                                }
                            }
                        },
                        init: function (chartModel) {
                            chartDisposables.push(chartIsDirty = ko.computed({
                                read: function () {
                                    return chartModel.undoEngine().isDirty();
                                },
                                write: function (newVal) {
                                    chartModel.undoEngine().isDirty(newVal);
                                }
                            }));
                            chartModel.displayNameProvider = designerModel.displayNameProvider;
                            chartModel.dataSourceHelper = dataSourceHelper;
                            chartDisposables.push(chartModel.reportParameters = ko.computed(function () { return parameters().parameters(); }));
                            chartDisposables.push(chartModel.reportDataSource = ko.computed(function () { return dataSourceHelper().findDataSourceInfo(model() && model().dataSource()); }));
                            chartModel.reportDataBindingsProvider = chartValueBindingProvider;
                            chartDisposables.push(chartDesignerOptionsVisible.subscribe(function (newVal) {
                                if (newVal) {
                                    chartModel.updateSurfaceSize();
                                }
                            }));
                        }
                    },
                    data: {
                        chart: ko.observable(xrChart.chartModel),
                        availableChartDataSources: designerModel.chartDataSources,
                        width: 500,
                        height: 500
                    },
                    visible: chartDesignerOptionsVisible,
                    rtl: designerModel.rtl,
                    fieldListProvider: designerModel.dataBindingsProvider
                };
            }
            else {
                chartDesignerOptions.options.data.chart(xrChart.chartModel);
            }
            chartDesignerOptions.visible(true);
        },
        container: function (element) { return analytics_internal_1.getParentContainer(element, '.dx-designer'); }
    };
    return chartDesignerOptions;
};
