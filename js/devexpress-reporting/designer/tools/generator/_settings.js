﻿/**
* DevExpress HTML/JS Reporting (designer\tools\generator\_settings.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _sqlDataSourceEditor_1 = require("../../actions/_sqlDataSourceEditor");
var _jsonDataSourceEditor_1 = require("../../actions/_jsonDataSourceEditor");
var _objectDataSourceEditor_1 = require("../../actions/_objectDataSourceEditor");
var _dataSourceActions_1 = require("../../actions/_dataSourceActions");
var reportWizard_1 = require("../../wizard/reportWizard");
var _reportDataSourceService_1 = require("../../services/_reportDataSourceService");
var objectStorageItem_1 = require("../../dataObjects/objectStorageItem");
var _fieldListDataSourcesHelper_1 = require("../../internal/fieldlist/_fieldListDataSourcesHelper");
var _reportWizardService_1 = require("../../services/_reportWizardService");
var _masterDetailRequestModel_1 = require("../../wizard/internal/_masterDetailRequestModel");
var _utils_1 = require("../../internal/_utils");
var _reportWizardCreating_1 = require("../../wizard/_reportWizardCreating");
var utils_1 = require("../../wizard/internal/utils");
var saveAsReportDialog_1 = require("../dialogs/saveAsReportDialog");
var saveReportDialog_1 = require("../dialogs/saveReportDialog");
var openReportDialog_1 = require("../dialogs/openReportDialog");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var ko = require("knockout");
var $ = require("jquery");
var _qBRequestWrapper_1 = require("./_qBRequestWrapper");
var _parameterUtils_1 = require("../../dataObjects/metadata/_parameterUtils");
var dataFederation_1 = require("../../dataObjects/dataFederation");
var WizardsInitializerSettings = (function () {
    function WizardsInitializerSettings(connectionStrings, wizardSettings, callbacks, rtl) {
        this.callbacks = callbacks;
        this.reportWizardOptions = new utils_1._ReportWizardOptions();
        this.multiQueryWizardOptions = new analytics_wizard_1._MultiQueryDataSourceWizardOptions();
        this.dataSourceWizardOptions = new analytics_wizard_1._DataSourceWizardOptions();
        [this.reportWizardOptions, this.multiQueryWizardOptions, this.dataSourceWizardOptions].forEach(function (wizardOptions) {
            wizardOptions.connectionStrings = connectionStrings;
            wizardOptions.wizardSettings = wizardSettings;
            wizardOptions.requestWrapper = _qBRequestWrapper_1.QBRequestWrapper();
            wizardOptions.rtl = rtl;
        });
    }
    WizardsInitializerSettings.prototype._doFinishCallback = function (data, connections) {
        if (data.dataSourceType === analytics_wizard_1.DataSourceType.Sql) {
            return this.sqlDataSourceEditor.applySqlDataSourceWizardChanges(data);
        }
        else if (data.dataSourceType === analytics_wizard_1.DataSourceType.Json) {
            var deferred = $.Deferred();
            if (data.jsonDataSourceWizard.jsonSource && data.jsonDataSourceWizard.newConnectionName) {
                this.jsonDataSourceEditor.saveJsonSource(data, connections).
                    done(function (result) { deferred.resolve(result); })
                    .fail(function () { return deferred.reject(); });
            }
            else {
                this.jsonDataSourceEditor.applyDataSourceWizardChanges(data)
                    .done(function (result) { deferred.resolve(result); })
                    .fail(function () { return deferred.reject(); });
            }
            return deferred.promise();
        }
        else if (data.dataSourceType === analytics_wizard_1.DataSourceType.Object) {
            var deferred = $.Deferred();
            this.objectDataSourceEditor.applyDataSourceWizardChanges(data)
                .done(function (result) { deferred.resolve(result); })
                .fail(function () { return deferred.reject(); });
        }
        return $.Deferred().resolve(null).promise();
    };
    WizardsInitializerSettings.prototype._getParameters = function (model) {
        if (model && model()) {
            return _parameterUtils_1.collectAvailableParameters(model().parameters()).map(function (x) {
                var obj = new analytics_utils_1.ModelSerializer().serialize(x);
                return { name: obj['@Name'], value: obj['@ValueInfo'] };
            });
        }
        return [];
    };
    WizardsInitializerSettings.prototype._getItemsProviderCallBack = function (itemsProvider) {
        if (itemsProvider)
            return itemsProvider;
        return null;
    };
    WizardsInitializerSettings.prototype.createSqlDataSourceWizard = function (disableCustomSql, itemsProvider, model) {
        var _this = this;
        this.dataSourceWizardOptions.callbacks = {
            selectStatement: function (connection, queryJSON) { return _qBRequestWrapper_1.QBRequestWrapper().getSelectStatement(connection, queryJSON); },
            finishCallback: function (data) { return _this._doFinishCallback(data, _this.dataSourceWizardOptions.connectionStrings); },
            customizeQBInitData: function (data) {
                data.parametersItemsProvider = itemsProvider;
                data.requestWrapper = _qBRequestWrapper_1.QBRequestWrapper();
                return data;
            },
            getParameters: function () { return _this._getParameters(model); },
            getItemsProviderCallback: function () { return _this._getItemsProviderCallBack(itemsProvider()); }
        };
        this.dataSourceWizardOptions.disableCustomSql = disableCustomSql;
        this.dataSourceWizard = analytics_wizard_1._createDataSourceWizard(undefined, this.dataSourceWizardOptions);
        return this.dataSourceWizard;
    };
    WizardsInitializerSettings.prototype.createSqlDataSourceEditor = function (settings) {
        this.sqlDataSourceEditor = new _sqlDataSourceEditor_1.SqlDataSourceEditor(settings.dataSourceHelper, settings.dataSourceWizard, settings.model, settings.undoEngine, settings.fieldListProvider);
        this.jsonDataSourceEditor = new _jsonDataSourceEditor_1.JsonDataSourceEditor(settings.dataSourceHelper, settings.dataSourceWizard, settings.model, settings.undoEngine, settings.fieldListProvider);
        this.objectDataSourceEditor = new _objectDataSourceEditor_1.ObjectDataSourceEditor(settings.dataSourceHelper, settings.dataSourceWizard, settings.model, settings.undoEngine, settings.fieldListProvider);
        this.dataSourceActionProvider = new _dataSourceActions_1.DataSourceActions(settings.dataSourceHelper, settings.model, settings.undoEngine);
    };
    WizardsInitializerSettings.prototype.createMultipleQueriesWizardCallbacks = function (itemsProvider, model) {
        var _this = this;
        this.multipleQueriesWizardCallbacks = {
            selectStatement: function (connection, queryJSON) { return _qBRequestWrapper_1.QBRequestWrapper().getSelectStatement(connection, queryJSON); },
            sqlDataSourceResultSchema: function (dataSource) { return _qBRequestWrapper_1.QBRequestWrapper().rebuildResultSchema(dataSource); },
            finishCallback: function (data) { return _this._doFinishCallback(data, _this.multiQueryWizardOptions.connectionStrings); },
            customQueriesPreset: _reportDataSourceService_1.ReportDataSourceService.getCustomQueriesPreset,
            customizeQBInitData: function (data) {
                data.parametersItemsProvider = itemsProvider;
                data.requestWrapper = _qBRequestWrapper_1.QBRequestWrapper();
                return data;
            },
            getParameters: function () { return _this._getParameters(model); },
            getItemsProviderCallback: function () { return _this._getItemsProviderCallBack(itemsProvider()); }
        };
    };
    WizardsInitializerSettings.prototype.createMultiQueryDataSourceWizard = function (disableCustomSql, multipleQueriesWizardCallbacks, allowCreateNewJsonConnection) {
        var _this = this;
        if (multipleQueriesWizardCallbacks === void 0) { multipleQueriesWizardCallbacks = this.multipleQueriesWizardCallbacks; }
        if (allowCreateNewJsonConnection === void 0) { allowCreateNewJsonConnection = false; }
        this.multiQueryWizardOptions.callbacks = multipleQueriesWizardCallbacks;
        this.multiQueryWizardOptions.allowCreateNewJsonConnection = allowCreateNewJsonConnection;
        this.multiQueryWizardOptions.disableCustomSql = disableCustomSql;
        this.registerMultiQueryDataSourceWizardPages = function (factory) {
            analytics_wizard_1._registerMultiQueryDataSourcePages(factory, _this.multiQueryWizardOptions);
        };
        if (this.reportWizardOptions.wizardSettings.useFullscreenWizard) {
            this.multiQueryDataSourceWizard = analytics_wizard_1._createDataSourceFullscreenWizard(this.multiQueryWizardOptions);
        }
        else
            this.multiQueryDataSourceWizard = analytics_wizard_1._createMultiQueryDataSourceWizard(undefined, this.multiQueryWizardOptions);
    };
    WizardsInitializerSettings.prototype.createReportWizard = function (settings) {
        var _this = this;
        this.reportWizardOptions.allowCreateNewJsonConnection = settings.data.allowCreateNewJsonConnection;
        this.reportWizardOptions.hideDataMemberSubItems = settings.data.isReportServer;
        this.reportWizardOptions.disableCustomSql = settings.data.disableCustomSql;
        this.reportWizardOptions.dataSources = ko.pureComputed(function () {
            var result;
            if (!settings.dataSourceHelper()) {
                result = (settings.data.availableDataSources || []).map(function (object) {
                    return $.extend({}, object, { data: new objectStorageItem_1.ObjectStorageItem(object.data) });
                });
            }
            if (!result) {
                result = settings.data.isReportServer ? settings.dataSourceHelper().availableDataSources : settings.dataSourceHelper().mergedDataSources();
            }
            return result.filter(function (object) { return !(object.data instanceof dataFederation_1.DataFederationDataSource) && !object.hasErrors; });
        });
        var fieldsCallback = function (request, dataSource) {
            _fieldListDataSourcesHelper_1.patchRequest(request, [dataSource], settings.state());
            return _this.callbacks.fieldLists(request);
        };
        this.reportWizardOptions.callbacks = $.extend({}, this.multipleQueriesWizardCallbacks, {
            fieldListsCallback: fieldsCallback,
            createSqlDataSourceInfo: _sqlDataSourceEditor_1.SqlDataSourceEditor.createSqlDataSourceInfo,
            createJsonDataSourceInfo: _jsonDataSourceEditor_1.JsonDataSourceEditor.createJsonDataSourceInfo,
            getItemsProviderCallback: function () { return _this._getItemsProviderCallBack(_this.reportWizard.itemsProvider()); },
            finishCallback: function (reportWizardModel) {
                settings.isLoading(true);
                var deferred = $.Deferred();
                _reportWizardService_1.ReportWizardService.generateReportFromWizardState(reportWizardModel, _masterDetailRequestModel_1.MasterDetailRequestModel, settings.state(), function (wizardModel) {
                    _this.reportWizard.events.call('beforeFinish', { state: settings.state(), wizardModel: wizardModel });
                })
                    .done(function (result) {
                    settings.navigation.currentTab().undoEngine.start();
                    settings.isDirty(true);
                    var newReport = _utils_1.createReportViewModel(result, settings.navigation.currentTab().context().report);
                    settings.navigation.currentTab().changeContext(newReport, '');
                    settings.navigation.currentTab.notifySubscribers();
                    settings.navigation.currentTab().undoEngine.end();
                    settings.isLoading(false);
                    deferred.resolve(newReport);
                })
                    .fail(function () { deferred.reject(); });
                return deferred.promise();
            }
        });
        this.registerReportWizardPages = function (factory) {
            reportWizard_1._registerReportWizardPages(factory, _this.reportWizardOptions);
        };
        this.reportWizard = _reportWizardCreating_1._createReportWizard(this.reportWizardOptions);
    };
    return WizardsInitializerSettings;
}());
exports.WizardsInitializerSettings = WizardsInitializerSettings;
var ReportDialogSettings = (function () {
    function ReportDialogSettings(_designerCallbacks) {
        this._designerCallbacks = _designerCallbacks;
    }
    ReportDialogSettings.prototype.createSaveReportDialog = function (reportUrls) {
        this.saveReportDialog = new saveAsReportDialog_1.SaveAsReportDialog(reportUrls, this._designerCallbacks);
        this._designerCallbacks.customizeSaveAsDialog && this._designerCallbacks.customizeSaveAsDialog(this.saveReportDialog);
    };
    ReportDialogSettings.prototype.createSaveReportDialogLight = function (saveReportDialog) {
        if (saveReportDialog === void 0) { saveReportDialog = this.saveReportDialog; }
        this.saveReportDialogLight = new saveReportDialog_1.SaveReportDialog(saveReportDialog, this._designerCallbacks);
        this._designerCallbacks.customizeSaveDialog && this._designerCallbacks.customizeSaveDialog(this.saveReportDialogLight);
    };
    ReportDialogSettings.prototype.createOpenReportDialog = function (reportUrls, navigation) {
        this.openReportDialog = new openReportDialog_1.OpenReportDialog(reportUrls, navigation, this._designerCallbacks);
        this._designerCallbacks.customizeOpenDialog && this._designerCallbacks.customizeOpenDialog(this.openReportDialog);
    };
    return ReportDialogSettings;
}());
exports.ReportDialogSettings = ReportDialogSettings;
