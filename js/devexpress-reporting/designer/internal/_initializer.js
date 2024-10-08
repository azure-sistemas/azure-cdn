﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_initializer.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var inititalizer_1 = require("../utils/inititalizer");
var _inititalizer_1 = require("../tools/generator/_inititalizer");
var settings_1 = require("../utils/settings");
var groups_1 = require("../widgets/groups");
var style_1 = require("../controls/metadata/properties/style");
var _utils_1 = require("./_utils");
var _settings_1 = require("./_settings");
var metadata_1 = require("../../common/metadata");
var xrSubreport_1 = require("../controls/xrSubreport");
var _fieldListDataSourcesHelper_1 = require("./fieldlist/_fieldListDataSourcesHelper");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var ko = require("knockout");
var _initializer_1 = require("../../chart/_initializer");
var queryBuilder_utils_1 = require("@devexpress/analytics-core/queryBuilder-utils");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
function _createReportDesigner(element, data, callbacks, knownEnums, designerHandlerUri, previewHandlerUri, rtl, applyBindings) {
    if (applyBindings === void 0) { applyBindings = true; }
    var selection = new analytics_internal_1.SurfaceSelection();
    var initializer = new _inititalizer_1.ReportDesignerInitializer({
        allowMDI: data.allowMDI,
        reportStorageWebIsRegister: data.reportStorageWebIsRegister,
        callbacks: callbacks,
        rtl: rtl,
        selection: selection,
        availableDataSources: data.availableDataSources,
        knownEnums: knownEnums,
        reportUrl: data.reportUrl,
        state: data.state,
        reportPreviewSettings: data.reportPreviewSettings
    });
    data.wizardSettings = inititalizer_1.ReportWizardSettings.prototype.createDefault(data.wizardSettings);
    return initializer
        .applyUri({ reportDesignerUri: designerHandlerUri, previewUri: previewHandlerUri })
        .initBindingMode(data.dataBindingMode, data.convertBindingsToExpressions)
        .initDefaultCrossTabControl(data.defaultCrossTabControl)
        .subscribeIncomeReport(data.report, data.reportUrl, data.dataSourceRefs)
        .addFlagsAndInitProperties(element)
        .addReportUrls(data.subreports)
        .addPreview({
        callbacks: callbacks.preview,
        element: element,
        handlerUri: previewHandlerUri,
        parametersInfo: { knownEnums: knownEnums },
        rtl: rtl,
        exportSettings: data.reportPreviewSettings && data.reportPreviewSettings.exportSettings
    })
        .initializeCalculatedFieldsSource()
        .initializeFieldListItemsExtenders()
        .initializeParameters()
        .initializeFieldListProvider()
        .initializeReportItemsProvider()
        .initializeDataBindingsProvider()
        .initializeDisplayNameProvider()
        .initializeExpressionDisplayNameProvider()
        .initializeDataSourceHelper()
        .registerControls(data.dataBindingMode, initializer.buildingModel.reportItemsProvider)
        .runCustomizeToolboxEvent()
        .addSelection()
        .addToolboxItems(function () { return analytics_internal_1.getToolboxItems(settings_1.controlsFactory().controlsMap, 'misc'); })
        .addGroupedToolboxItems()
        .addControlProperties(Object.keys(groups_1.groups).reduce(function (editors, groupName) {
        if (groupName !== 'Styles')
            editors = editors.concat(groups_1.groups[groupName].info);
        else
            editors.push(style_1.stylesObj);
        return editors;
    }, []), groups_1.groups)
        .addContextActions()
        .addPopularProperties(settings_1.controlsFactory())
        .addControlsHelper()
        .setControlsHelperFilter(_utils_1.isNotParameter)
        .addProcessErrorCallback()
        .initCultureInfo(data.cultureInfoList)
        .updateFont(data.cultureInfoList && data.cultureInfoList.fontSet)
        .initFormatStringPatterns(data.formatStringData)
        .onContextChanged(data.subreports)
        .addMenu()
        .addInlineTextEdit()
        .addNavigateToControl(element)
        .addLocalizationEditor(element)
        .tryAddInlineRichTextEdit()
        .addReportDialogs(function (settings) {
        var reportUrls = initializer.buildingModel.reportUrls;
        settings.createOpenReportDialog(reportUrls, initializer.buildingModel.navigateByReports);
        settings.createSaveReportDialog(reportUrls);
        settings.createSaveReportDialogLight();
    })
        .addWizardRunner()
        .addWizards({
        sql: ko.observableArray(data.wizardConnections && data.wizardConnections.sql),
        json: ko.observableArray(data.wizardConnections && data.wizardConnections.json)
    }, data.wizardSettings, function (settings) {
        var model = initializer.buildingModel;
        settings.createMultipleQueriesWizardCallbacks(initializer.buildingModel.dataBindingsProvider, model.model);
        settings.createSqlDataSourceWizard(data.disableCustomSql, initializer.buildingModel.dataBindingsProvider, model.model);
        settings.createSqlDataSourceEditor({
            dataSourceHelper: model.dataSourceHelper,
            fieldListProvider: model.fieldListProvider,
            model: model.model,
            dataSourceWizard: settings.dataSourceWizard,
            undoEngine: model.undoEngine
        });
        settings.createMultiQueryDataSourceWizard(data.disableCustomSql, undefined, data.allowCreateNewJsonConnection);
        settings.createReportWizard({
            data: data,
            dataSourceHelper: model.dataSourceHelper,
            fieldListProvider: model.fieldListProvider,
            isDirty: model.isDirty,
            isLoading: model.isLoading,
            model: model.model,
            navigation: model.navigateByReports,
            state: function () { return initializer.reportContext() && initializer.reportContext().state() || initializer.buildingModel.state; },
            undoEngine: model.undoEngine
        });
    })
        .initializeFieldListActionProviders()
        .addTabPanel()
        .addErrorPanelViewModel(element)
        .addDefaultAddons()
        .tryAddSqlDataSourceEditorAddon()
        .tryAddScriptEditorAddon(data.isScriptsDisabled)
        .addActionList()
        .addStylesProjection()
        .addFormattingRulesProjection()
        .addReportExplorerProvider()
        .addControlsProjection()
        .addBandsProjection()
        .addParts()
        .addStaticContext()
        .tryApplyBindings(applyBindings, element)
        .initializeUIEffects(applyBindings, element)
        .addSmartTagModel()
        .addShowPreviewMethod()
        .addOpenReportMethod()
        .getModel();
}
function createReportDesigner(element, data, callbacks, localizationSettings, knownEnums, designerHandlerUri, previewHandlerUri, rtl, applyBindings) {
    if (applyBindings === void 0) { applyBindings = true; }
    var localizationPromises = [];
    if (localizationSettings && localizationSettings.localization) {
        analytics_utils_1.addCultureInfo({ messages: localizationSettings.localization });
    }
    callbacks && callbacks.designer && callbacks.designer.customizeLocalization && callbacks.designer.customizeLocalization(localizationPromises);
    return analytics_internal_1.resolveFromPromises(localizationPromises, function () {
        return _createReportDesigner(element, data, callbacks, knownEnums, designerHandlerUri, previewHandlerUri, rtl, applyBindings);
    }).done(function (designerModel) {
        if (callbacks && callbacks.designer && callbacks.designer.customizeWizard) {
            callbacks.designer.customizeWizard('ReportWizard', designerModel.wizard);
            callbacks.designer.customizeWizard('SingleQueryDataSourceWizard', designerModel.dataSourceWizard);
            if (designerModel.multiQueryDataSourceWizard) {
                callbacks.designer.customizeWizard('DataSourceWizard', designerModel.multiQueryDataSourceWizard);
            }
        }
    });
}
exports.createReportDesigner = createReportDesigner;
function createReportDesignerFromModel(model, element, callbacks, applyBindings) {
    if (!model)
        return;
    _settings_1.limitation(!!model.limitation);
    _initializer_1._setChartLimitation(_settings_1.limitation());
    if (model.availableCultures) {
        metadata_1.availableCultures(model.availableCultures.reduce(function (result, val) {
            var _a;
            return __assign({}, result, (_a = {}, _a[val.Name] = val.DisplayName, _a));
        }, {}));
    }
    if (model.dataSources && model.dataSourcesData) {
        for (var i = 0; i < model.dataSources.length; i++) {
            var dataSource = model.dataSources[i];
            dataSource.data = model.dataSourcesData[i];
        }
    }
    if (!model.reportModel) {
        model.reportModel = xrSubreport_1.SubreportViewModel.defaultReport;
    }
    else {
        model.reportModel = JSON.parse(model.reportModel);
    }
    var getRootKeyName = function (obj) {
        if (!obj['@ControlType']) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return prop;
                }
            }
        }
        return 'XtraReportsLayoutSerializer';
    };
    analytics_internal_1.initGlobalize(model);
    model.reportModelRootName = getRootKeyName(model.reportModel);
    var formatStringData = { customPatterns: {}, standardPatterns: {} };
    if (model.formatStringData) {
        model.formatStringData.customPatterns.forEach(function (item) {
            formatStringData.customPatterns[item.Key] = item.Value;
        });
        model.formatStringData.standardPatterns.forEach(function (item) {
            formatStringData.standardPatterns[item.Key] = item.Value;
        });
    }
    if (!!model.fieldListMaxNestingLevelUpdate) {
        _fieldListDataSourcesHelper_1.maxNestingLevelUpdate(model.fieldListMaxNestingLevelUpdate);
        analytics_widgets_internal_1.maxSearchLevel(model.fieldListMaxNestingLevelUpdate);
    }
    var data = {
        report: ko.observable({}),
        reportUrl: ko.observable(model.reportUrl),
        availableDataSources: model.dataSources,
        allowMDI: model.allowMDI,
        dataSourceRefs: model.dataSourceRefs,
        dataBindingMode: model.dataBindingMode || 'Expressions',
        defaultCrossTabControl: model.defaultCrossTabControl || 'XRCrossTab',
        convertBindingsToExpressions: model.convertBindingsToExpressions || _utils_1.PromptBoolean.Prompt,
        subreports: model.subreports,
        cultureInfoList: model.cultureInfoList,
        formatStringData: formatStringData,
        state: {
            reportExtensions: model.reportExtensions
        },
        isReportServer: model.internalSettings && model.internalSettings.isReportServer,
        wizardSettings: model.wizardSettings,
        wizardConnections: model.wizardConnections,
        disableCustomSql: model.disableCustomSql,
        isScriptsDisabled: !model.scriptsEnabled,
        allowCreateNewJsonConnection: model.allowCreateNewJsonConnection,
        reportStorageWebIsRegister: model.reportStorageWebIsRegister,
        reportPreviewSettings: model.reportPreviewSettings
    };
    if (model.queryBuilderHandlerUri)
        queryBuilder_utils_1.HandlerUri(model.queryBuilderHandlerUri);
    return createReportDesigner(element, data, callbacks || {}, model, model.knownEnums, model.handlerUri, model.viewerHandlerUri, model.rtl, applyBindings)
        .done(function (designerModel) {
        setTimeout(function () {
            data.report(model.reportModel);
            designerModel.isLoading && designerModel.isLoading(false);
        }, 1);
    });
}
exports.createReportDesignerFromModel = createReportDesignerFromModel;
