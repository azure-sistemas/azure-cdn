﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_jsonDataSourceEditor.js)
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
var _sqlDataSourceEditor_1 = require("./_sqlDataSourceEditor");
var _dataUtils_1 = require("../internal/_dataUtils");
var _reportDataSourceService_1 = require("../services/_reportDataSourceService");
var _qBRequestWrapper_1 = require("../tools/generator/_qBRequestWrapper");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var analytics_data_1 = require("@devexpress/analytics-core/analytics-data");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var $ = require("jquery");
var JsonEditSchemaIterator = (function (_super) {
    __extends(JsonEditSchemaIterator, _super);
    function JsonEditSchemaIterator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JsonEditSchemaIterator.prototype.getNextPageId = function (pageId) {
        if (!pageId)
            return analytics_wizard_1.JsonDataSourceWizardPageId.ChooseJsonSchemaPage;
        return _super.prototype.getNextPageId.call(this, pageId);
    };
    return JsonEditSchemaIterator;
}(analytics_wizard_1.DataSourceWizardPageIterator));
exports.JsonEditSchemaIterator = JsonEditSchemaIterator;
var JsonDataSourceEditor = (function (_super) {
    __extends(JsonDataSourceEditor, _super);
    function JsonDataSourceEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editSchemaAction = {
            clickAction: function (item) {
                _this.editSchema(new analytics_utils_1.PathRequest(item.path).id);
            },
            position: 0,
            imageClassName: 'dx-image-edit',
            imageTemplateName: 'dxrd-svg-operations-edit',
            text: analytics_utils_1.getLocalization('Edit Schema...', 'DataAccessUIStringId.JsonDataSourceDesignerVerbEditSchema')
        };
        return _this;
    }
    JsonDataSourceEditor.prototype._applyDataSourceChange = function (source, dest) {
        var _this = this;
        return JsonDataSourceEditor.createJsonDataSourceInfo(source)
            .done(function (result) {
            if (dest) {
                dest.data['base64'](result.base64());
            }
            else {
                _dataUtils_1.addDataSourceToReport(_this._dsHelper(), _this._reportViewModel(), _this._undoEngine(), _this._itemsProvider(), result);
            }
        });
    };
    JsonDataSourceEditor.prototype.editSchema = function (dataSourceID) {
        var _this = this;
        var dataSourceInfo = this._findDataSource(dataSourceID);
        _reportDataSourceService_1.ReportDataSourceService.jsonDataSourceFromBase64(dataSourceInfo.data['base64']())
            .done(function (result) {
            var jsonDataSource = new analytics_data_1.JsonDataSource(JSON.parse(result.jsonDataSourceJSON), undefined, _qBRequestWrapper_1.QBRequestWrapper());
            jsonDataSource.name(dataSourceInfo.name);
            var jsonSerialized = new analytics_utils_1.ModelSerializer().serialize(jsonDataSource);
            var beforeInitEvent = function (e) {
                e.state.dataSourceType = analytics_wizard_1.DataSourceType.Json;
            };
            _this._wizard.events.addHandler('beforeInitialize', beforeInitEvent);
            _this._wizard.initialize(analytics_wizard_1._createDefaultDataSourceWizardState(undefined, {
                connectionName: jsonDataSource.connectionName(),
                dataSourceName: jsonSerialized['@Name'],
                jsonScheme: JSON.stringify(jsonSerialized['Schema']),
                jsonSource: JSON.stringify(jsonSerialized['Source']),
                rootElement: jsonSerialized['@RootElement']
            }), function (factory, stateManager) { return new JsonEditSchemaIterator(factory, stateManager, _this._wizard['_wizardOptions']); });
            _this._wizard.events.removeHandler('beforeInitialize', beforeInitEvent);
            _this._wizard.start();
            _this._wizard.isVisible(true);
        });
    };
    JsonDataSourceEditor.prototype.applyDataSourceWizardChanges = function (dataSourceWizardModel) {
        var jsonDataSource = analytics_wizard_1._restoreJsonDataSourceFromState(dataSourceWizardModel.jsonDataSourceWizard, undefined, dataSourceWizardModel.dataSourceId);
        var dataSource = jsonDataSource && this._dsHelper().findDataSourceInfoByName(jsonDataSource.name());
        return this._applyDataSourceChange(jsonDataSource, dataSource);
    };
    JsonDataSourceEditor.prototype.saveJsonSource = function (state, connections) {
        var _this = this;
        var jsonDataSourceState = state.jsonDataSourceWizard;
        var jsonDataSource = analytics_wizard_1._restoreJsonDataSourceFromState(jsonDataSourceState);
        var deferred = $.Deferred();
        _qBRequestWrapper_1.QBRequestWrapper().saveJsonSource(state.jsonDataSourceWizard.newConnectionName, jsonDataSource)
            .done(function (connectionName) {
            if (connections.json().every(function (x) { return x.name !== jsonDataSourceState.newConnectionName; })) {
                connections.json.push({
                    name: jsonDataSourceState.newConnectionName,
                    description: jsonDataSourceState.newConnectionName
                });
            }
            jsonDataSourceState.connectionName = connectionName;
            jsonDataSourceState.jsonSource = null;
            _this.applyDataSourceWizardChanges(state)
                .done(function (result) { deferred.resolve(result); })
                .fail(function () { return deferred.reject(); });
        })
            .fail(function (result) { JsonDataSourceEditor._onFail(result, deferred); });
        return deferred.promise();
    };
    JsonDataSourceEditor.createJsonDataSourceInfo = function (source) {
        var deferred = $.Deferred();
        _reportDataSourceService_1.ReportDataSourceService.getJsonDataSourceBase64(source)
            .done(function (result) {
            deferred.resolve({
                name: 'jsonDataSource',
                id: source.id,
                data: {
                    '@ObjectType': 'DevExpress.DataAccess.Json.JsonDataSource',
                    '@Base64': result.base64
                },
                isJsonDataSource: true,
                base64: function () { return result.base64; }
            });
        })
            .fail(function (result) { JsonDataSourceEditor._onFail(result, deferred); });
        return deferred.promise();
    };
    JsonDataSourceEditor.prototype.getActions = function (context) {
        var result = [];
        if (!context.data)
            return result;
        if (context.data['isJsonDataSource'] === true) {
            result.push(this.editSchemaAction);
        }
        return result;
    };
    return JsonDataSourceEditor;
}(_sqlDataSourceEditor_1.DataSourceEditorBase));
exports.JsonDataSourceEditor = JsonDataSourceEditor;
