﻿/**
* DevExpress HTML/JS Reporting (chart\_initializer.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ko = require("knockout");
var _controller_1 = require("./internal/chartStructure/_controller");
var _provider_1 = require("./internal/chartStructure/_provider");
var _axis_1 = require("./internal/meta/_axis");
var _chart_1 = require("./internal/meta/_chart");
var _requests_1 = require("./internal/_requests");
var _control_1 = require("./_control");
var _surface_1 = require("./_surface");
var $ = require("jquery");
exports.ActionId = {
    Save: 'dxxcd-save'
};
var ChartDesignerElements = {
    Main: 'dx-chart-middlePart',
    Toolbar: 'dxcd-toolbar',
    RightPanel: 'dx-right-panel-lightweight',
    LeftPanel: 'dx-chart-leftPanel'
};
exports.controlsFactory = new analytics_utils_1.ControlsFactory();
function registerControls() {
    exports.controlsFactory.registerControl('ChartControl', {
        info: _chart_1.chartControlSerializationsInfo,
        surfaceType: _surface_1.ChartControlSurface,
        type: _control_1.ChartControlViewModel,
        elementActionsTypes: [],
        isContainer: true,
        nonToolboxItem: true
    });
}
exports.registerControls = registerControls;
var _chartLimitation = false;
function _setChartLimitation(chartLimitation) {
    _chartLimitation = chartLimitation;
    _chart_1.viewBindableSerializationInfo.valuesArray = _chart_1.createViewsArray(chartLimitation);
}
exports._setChartLimitation = _setChartLimitation;
function customizeDesignerActions(designerModel, nextCustomizer) {
    var chart = designerModel.model;
    return (function (actions) {
        var save = {
            id: exports.ActionId.Save,
            text: 'Save',
            imageClassName: 'dxrd-image-save',
            imageTemplateName: 'dxrd-svg-menu-save',
            disabled: ko.observable(false),
            visible: true,
            hasSeparator: true,
            hotKey: { ctrlKey: true, keyCode: 'S'.charCodeAt(0) },
            clickAction: function () {
                chart().save();
            }
        };
        actions.splice(0, 0, save);
        nextCustomizer && nextCustomizer(actions);
    });
}
function updateChartSurfaceContentSize(element, surfaceSize, rtl) {
    if (rtl === void 0) { rtl = false; }
    var $element = $(element);
    return function () {
        var rightAreaWidth = $element.find('.dxrd-right-panel')[0]['offsetWidth'];
        var leftAreaWidth = $element.find('.dx-chart-left-panel')[0]['offsetWidth'];
        var otherWidth = rightAreaWidth + leftAreaWidth, surfaceWidth = $element.find('.dxcd-designer')[0]['offsetWidth'] - (otherWidth + 5);
        $element.find('.dxrd-surface-wrapper').eq(0).css({
            'right': !rtl ? rightAreaWidth : leftAreaWidth,
            'left': rtl ? rightAreaWidth : leftAreaWidth,
            'width': surfaceWidth
        });
        surfaceSize(surfaceWidth);
    };
}
exports.updateChartSurfaceContentSize = updateChartSurfaceContentSize;
function subscribeTreelistArray(chartStructureProvider, array, getPath, subscribeNewItem) {
    return array.subscribe(function (args) {
        args.forEach(function (changeSet) {
            if (changeSet.status) {
                var selectedPath = '';
                var path = getPath();
                if (changeSet.status === 'deleted') {
                    selectedPath = array().length === 0 ? path.join('.') : [].concat(path, '0').join('.');
                }
                else if (changeSet.status === 'added') {
                    selectedPath = [].concat(path, changeSet.index).join('.');
                    subscribeNewItem && subscribeNewItem(changeSet.value, array, path);
                }
                chartStructureProvider.selectedPath(selectedPath);
            }
        });
    }, null, 'arrayChange');
}
exports.subscribeTreelistArray = subscribeTreelistArray;
function getPropertyInfo(serializationsInfo, index, pathComponets) {
    var info = serializationsInfo.filter(function (info) { return info.propertyName === pathComponets[index]; })[0];
    if (info && info.info && index++ < pathComponets.length)
        info = getPropertyInfo(info.info, index, pathComponets);
    return info;
}
exports.getPropertyInfo = getPropertyInfo;
function wrapSelectedElement(selectedElement, selectedElementInfo, displayName, propertyName) {
    if (propertyName === void 0) { propertyName = 'element'; }
    var object = {};
    object[propertyName] = selectedElement;
    object['owner'] = ko.unwrap(selectedElement)['owner'];
    object['getInfo'] = function () {
        return [$.extend({}, selectedElementInfo, { displayName: displayName, propertyName: propertyName })];
    };
    return object;
}
function createChartStructure(chart, selectedItem, subscriptions, surface, undoEngine, dragdrophandler) {
    var fakeChart = {
        dataSource: chart.dataSource,
        dataMember: chart.chart.dataContainer.dataMember,
        seriesDataMember: chart.chart.dataContainer.seriesDataMember,
        seriesTemplate: chart.chart.dataContainer.seriesTemplate,
        series: chart.chart.dataContainer.series,
        diagram: ko.computed(function () {
            if (chart.chart.dataContainer.series().length > 0 || !!chart.chart.dataContainer.seriesDataMember()) {
                return chart.chart.diagram();
            }
            return null;
        }),
        titles: chart.chart.titles,
        backImage: chart.chart['backImage'],
        legend: chart.chart['legend'],
        legends: chart.chart.legends,
        emptyChartText: chart.chart['emptyChartText'],
        paletteName: chart.chart['paletteName'],
        getInfo: function () {
            return _chart_1.fakeChartSerializationInfo;
        },
        getPath: function (propertyName) { return chart.getPath(propertyName); },
        isPropertyDisabled: function (propertyName) { return chart.isPropertyDisabled(propertyName); },
        className: function () { return 'chart'; }
    };
    var chartStructureProvider = new _provider_1.ChartStructureObjectProvider(fakeChart, 'Chart', 'DevExpress.XtraReports.UI.XRChart');
    var chartStructureTreeListController = new _controller_1.ChartStructureTreeListController(['chart', 'Chart', 'titles', 'legend', 'legends', 'series', 'diagram', 'indicators',
        'defaultPane', 'panes', 'axisX', 'axisY', 'secondaryAxesX', 'secondaryAxesY', 'constantLines', 'scaleBreaks', 'strips', 'seriesTemplate', 'label', 'points'], ['chart', 'diagram', 'axisX', 'axisY', 'titles', 'indicators', 'legends', 'series', 'panes', 'secondaryAxesX', 'secondaryAxesY', 'seriesTemplate', 'constantLines', 'scaleBreaks', 'strips', 'SeriesViewModel', 'SecondaryAxisViewModel'], function (newItem) {
        var selectedElement = chartStructureProvider.selectedMember();
        if (newItem.data.specifics === 'points') {
            selectedElement = wrapSelectedElement(ko.observableArray(selectedElement), _chart_1.points, newItem.data.displayName, 'points');
        }
        else if (Array.isArray(selectedElement)) {
            selectedElement = wrapSelectedElement(selectedElement, { editor: _editorTemplates_1.editorTemplates.getEditor('collection') }, newItem.data.displayName);
        }
        selectedItem(selectedElement);
    }, surface, undoEngine, dragdrophandler);
    var chartStructure = {
        itemsProvider: chartStructureProvider,
        treeListController: chartStructureTreeListController,
        expandRootItems: true,
        selectedPath: chartStructureProvider.selectedPath
    };
    chartStructureProvider.selectedPath('Chart');
    selectedItem(null);
    subscriptions.push(fakeChart.diagram);
    subscriptions.push(subscribeTreelistArray(chartStructureProvider, chart.chart.dataContainer.series, function () { return ['Chart', 'series']; }));
    subscriptions.push(subscribeTreelistArray(chartStructureProvider, chart.chart.titles, function () { return ['Chart', 'titles']; }));
    subscriptions.push(subscribeTreelistArray(chartStructureProvider, chart.chart.legends, function () { return ['Chart', 'legends']; }));
    var diagramSubscriptions = [];
    var subscribeDiagram = function (diagram) {
        diagramSubscriptions.forEach(function (val) { return val.dispose(); });
        var axisCollectionNames = ['constantLines', 'scaleBreaks', 'strips'];
        var subscribeAxis = function (axis, array, path) {
            axisCollectionNames.forEach(function (propertyName) {
                diagramSubscriptions.push(subscribeTreelistArray(chartStructureProvider, axis[propertyName], function () { return [].concat(path, array.indexOf(axis), propertyName); }));
            });
        };
        ['axisX', 'axisY'].forEach(function (propertyName) {
            if (diagram[propertyName]) {
                axisCollectionNames.forEach(function (innerPropertyName) {
                    if (diagram[propertyName][innerPropertyName]) {
                        diagramSubscriptions.push(subscribeTreelistArray(chartStructureProvider, diagram[propertyName][innerPropertyName], function () { return ['Chart', 'diagram', propertyName, innerPropertyName]; }));
                    }
                });
            }
        });
        ['secondaryAxesX', 'secondaryAxesY'].forEach(function (propertyName) {
            if (diagram[propertyName]) {
                diagramSubscriptions.push(subscribeTreelistArray(chartStructureProvider, diagram[propertyName], function () { return ['Chart', 'diagram', propertyName]; }, subscribeAxis));
                var axis = ko.unwrap(diagram[propertyName]);
                for (var i = 0; i < axis.length; i++) {
                    subscribeAxis(axis[i], axis, ['Chart', 'diagram', propertyName]);
                }
            }
        });
        if (diagram.panes) {
            diagramSubscriptions.push(subscribeTreelistArray(chartStructureProvider, diagram.panes, function () { return ['Chart', 'diagram', 'panes']; }));
        }
        [].push.apply(subscriptions, diagramSubscriptions);
    };
    subscribeDiagram(chart.chart.diagram());
    chart.chart.diagram.subscribe(function (newVal) {
        subscribeDiagram(newVal);
    });
    return chartStructure;
}
exports.createChartStructure = createChartStructure;
function createArrayOfNames(collectionProperty, defaultVal) {
    return ko.computed(function () {
        return (defaultVal && [defaultVal] || []).concat(collectionProperty().map(function (x) { return x.name(); }));
    });
}
function createChartDesigner(element, options, applyBindings) {
    if (applyBindings === void 0) { applyBindings = true; }
    if (options.localization) {
        analytics_utils_1.addCultureInfo(options.localization);
    }
    options.callbacks.fieldLists = options.callbacks.fieldLists || _requests_1.ChartRequests.fieldListCallback;
    registerControls();
    var chartControlModel = ko.observable(), surface = ko.observable(), dataBindingsProvider = ko.observable(), size = new analytics_elements_1.Size(options.data.width, options.data.height);
    var chartStructure = ko.observable(null);
    var chartSelectedItem = ko.observable(null);
    var subscriptions = [];
    var groups = ko.observableArray();
    var chartSourceSubscription = null;
    var undoModel = ko.observable({});
    var initChartControlModel = function (newModel) {
        surface() && surface()._disposables.forEach(function (item) { item.dispose(); });
        subscriptions.forEach(function (item) { return item.dispose(); });
        subscriptions = [];
        if (newModel) {
            groups(newModel.chart.dataContainer.series().map(function (x) { return x.view()['group'] || x['stackedGroup']; }).filter(function (x) { return !!x; }).map(function (x) { return x(); }));
            chartControlModel(newModel);
            undoModel(newModel);
            surface() && surface()._disposables.forEach(function (item) { item.dispose(); });
            surface(new _surface_1.ChartControlSurface(newModel, ko.observable(1), size));
            var fieldListProvider = ko.unwrap(options.fieldListProvider);
            if (!!fieldListProvider) {
                dataBindingsProvider(fieldListProvider);
            }
            else {
                var _chartSources = options.data.dataSource && options.data.dataSource() ? [options.data.dataSource()] : [];
                if (options.data.availableChartDataSources) {
                    _chartSources = options.data.availableChartDataSources().map(function (x) {
                        return x.value;
                    });
                }
                var realChartSources = ko.observableArray(_chartSources);
                dataBindingsProvider(new analytics_internal_1.FieldListProvider(options.callbacks.fieldLists, realChartSources));
            }
            newModel.fieldListProvider(dataBindingsProvider());
            designerModel.dragHelperContent = new analytics_internal_1.DragHelperContent(null);
            chartStructure(createChartStructure(newModel, chartSelectedItem, subscriptions, surface, designerModel.undoEngine, designerModel.dragHelperContent));
        }
        designerModel.undoEngine().clearHistory();
    };
    var init = function (chartSourceValue) {
        var newModel = new _control_1.ChartControlViewModel({
            chartSource: chartSourceValue,
            dataSource: options.data.dataSource,
            callbacks: options.callbacks,
            size: {
                height: ko.observable(options.data.height),
                width: ko.observable(options.data.width),
                isPropertyDisabled: function (name) { return true; }
            }
        });
        initChartControlModel(newModel);
    };
    var undoEngine = new analytics_utils_1.UndoEngine(undoModel, ['viewType'], 'getInfo');
    undoEngine['_disposeUndoEngineSubscriptionsName'] += 'chartdesigner';
    var designerModel = {
        model: chartControlModel,
        chartStructure: chartStructure,
        rightPanelHeader: function () { return analytics_utils_1.getLocalization('Chart Structure', 'ChartDesignerStringIDs.ChartStructureDockPanelTitle'); },
        surface: surface,
        undoEngine: ko.observable(undoEngine),
        tabPanel: new analytics_utils_1.TabPanel({
            tabs: [
                new analytics_utils_1.TabInfo({
                    text: 'Properties',
                    template: 'dxrd-propertygridtab',
                    model: new analytics_widgets_1.ObjectProperties(chartSelectedItem),
                    localizationId: 'AnalyticsCoreStringId.Cmd_Properties'
                })
            ],
            rtl: options.rtl
        }),
        surfaceSize: ko.observable(0),
        isLoading: ko.observable(true),
        rtl: options.rtl,
        groups: groups,
        applyGroup: function (groupName) {
            if (groups().indexOf(groupName) === -1 && !!groupName) {
                groups.push(groupName);
            }
        }
    };
    analytics_internal_1.appendStaticContextToRootViewModel(designerModel, analytics_internal_1.staticContext);
    if (options.data.chartSource) {
        chartSourceSubscription = options.data.chartSource.subscribe(function (newValue) {
            init(newValue);
        });
        init(options.data.chartSource());
    }
    else {
        options.data.chart.subscribe(function (newVal) {
            initChartControlModel(newVal);
        });
        initChartControlModel(options.data.chart());
    }
    designerModel.panes = createArrayOfNames(function () {
        var panes = chartControlModel().chart.diagram().panes;
        return panes && panes() || [];
    }, _view_1.paneName.defaultVal);
    designerModel.legends = createArrayOfNames(function () {
        var legends = chartControlModel().chart.legends;
        return legends && legends() || [];
    }, _axis_1.legendName.defaultVal);
    designerModel.axisX = createArrayOfNames(function () {
        var axisX = chartControlModel().chart.diagram().secondaryAxesX;
        return axisX && axisX() || [];
    }, _view_1.axisXName.defaultVal);
    designerModel.axisY = createArrayOfNames(function () {
        var axisY = chartControlModel().chart.diagram().secondaryAxesY;
        return axisY && axisY() || [];
    }, _view_1.axisYName.defaultVal);
    if (options.data.availableChartDataSources) {
        designerModel.chartDataSources = options.data.availableChartDataSources;
    }
    else {
        var displayedChartSources = options.data.dataSource && options.data.dataSource() ? [{ displayName: options.data.dataSource().name, value: options.data.dataSource() }] : [];
        designerModel.chartDataSources = ko.observableArray(displayedChartSources);
    }
    designerModel.rootStyle = 'dxcd-designer dxd-back-primary';
    designerModel.parts = [
        { id: ChartDesignerElements.Main, templateName: ChartDesignerElements.Main, model: designerModel },
        { id: ChartDesignerElements.Toolbar, templateName: ChartDesignerElements.Toolbar, model: designerModel },
        { id: ChartDesignerElements.RightPanel, templateName: ChartDesignerElements.RightPanel, model: designerModel },
        { id: ChartDesignerElements.LeftPanel, templateName: ChartDesignerElements.LeftPanel, model: designerModel }
    ];
    designerModel.dataBindingsProvider = dataBindingsProvider;
    designerModel.actionLists = new analytics_internal_1.ActionLists(surface, null, designerModel.undoEngine, customizeDesignerActions(designerModel, options.callbacks.customizeActions));
    designerModel.isLoading(false);
    if (applyBindings) {
        $(element).children().remove();
        ko.applyBindings(designerModel, element);
    }
    var updateSurfaceContentSize_ = updateChartSurfaceContentSize(element, designerModel.surfaceSize, designerModel.rtl);
    designerModel.tabPanel.width.subscribe(function () {
        updateSurfaceContentSize_();
    });
    designerModel.subscriptions = subscriptions;
    designerModel.chartSourceSubscription = chartSourceSubscription;
    designerModel.updateSurfaceSize = function () {
        updateSurfaceContentSize_();
    };
    if (applyBindings) {
        designerModel.updateSurfaceSize();
    }
    options.callbacks && options.callbacks.init && options.callbacks.init(designerModel);
    return designerModel;
}
exports.createChartDesigner = createChartDesigner;
ko.bindingHandlers['dxChartDesigner'] = {
    init: function (element, valueAccessor) {
        var options = ko.unwrap(valueAccessor()) || {};
        $(element).children().remove();
        var templateHtml = analytics_widgets_1.getTemplate('dxrd-designer'), $element = $(element).append(templateHtml);
        var designerModel = createChartDesigner($element[0], options, false);
        ko.applyBindings(designerModel, $element.children()[0]);
        var visibleSubscription = options.visible.subscribe(function (val) {
            if (val)
                designerModel.updateSurfaceSize();
        });
        designerModel.updateSurfaceSize();
        analytics_internal_1.addDisposeCallback(element, function () {
            designerModel.model() && designerModel.model()._disposables.forEach(function (item) { return item.dispose(); });
            designerModel.subscriptions.forEach(function (item) { return item.dispose(); });
            designerModel.chartSourceSubscription && designerModel.chartSourceSubscription.dispose();
            designerModel.subscriptions = [];
            visibleSubscription.dispose();
            designerModel = null;
        });
        return { controlsDescendantBindings: true };
    }
};
var _editorTemplates_1 = require("./internal/_editorTemplates");
var _view_1 = require("./internal/meta/_view");
