﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_sqlDataSourceEditor.js)
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
var settings_1 = require("../utils/settings");
var _dataUtils_1 = require("../internal/_dataUtils");
var _reportDataSourceService_1 = require("../services/_reportDataSourceService");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_data_1 = require("@devexpress/analytics-core/analytics-data");
var ko = require("knockout");
var $ = require("jquery");
var queryBuilder_widgets_internal_1 = require("@devexpress/analytics-core/queryBuilder-widgets-internal");
var _qBRequestWrapper_1 = require("../tools/generator/_qBRequestWrapper");
var DataSourceEditorBase = (function () {
    function DataSourceEditorBase(_dsHelper, _wizard, _reportViewModel, _undoEngine, _itemsProvider) {
        this._dsHelper = _dsHelper;
        this._wizard = _wizard;
        this._reportViewModel = _reportViewModel;
        this._undoEngine = _undoEngine;
        this._itemsProvider = _itemsProvider;
    }
    DataSourceEditorBase.prototype._findDataSource = function (dataSourceID) {
        return this._dsHelper().usedDataSources().filter(function (item) {
            return item.id === dataSourceID || item.ref === dataSourceID;
        })[0];
    };
    DataSourceEditorBase._onFail = function (result, deferred) {
        if (analytics_internal_1.getErrorMessage(result))
            analytics_internal_1.ShowMessage(analytics_internal_1.getErrorMessage(result));
        deferred.reject(result);
    };
    return DataSourceEditorBase;
}());
exports.DataSourceEditorBase = DataSourceEditorBase;
var CreateQueryIterator = (function (_super) {
    __extends(CreateQueryIterator, _super);
    function CreateQueryIterator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateQueryIterator.prototype.getNextPageId = function (pageId) {
        if (!pageId) {
            return analytics_wizard_1.SqlDataSourceWizardPageId.ConfigureQueryPage;
        }
        return _super.prototype.getNextPageId.call(this, pageId);
    };
    return CreateQueryIterator;
}(analytics_wizard_1.DataSourceWizardPageIterator));
exports.CreateQueryIterator = CreateQueryIterator;
var SqlDataSourceEditor = (function (_super) {
    __extends(SqlDataSourceEditor, _super);
    function SqlDataSourceEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.relationsEditor = ko.observable();
        _this.addAction = {
            clickAction: function (item) {
                _this.addSqlQuery(item.data.name);
            },
            imageClassName: 'dxrd-image-add-query',
            imageTemplateName: 'dxrd-svg-operations-add_query',
            text: analytics_utils_1.getLocalization('Add query', 'AnalyticsCoreStringId.SqlDSWizard_AddQuery')
        };
        _this.editAction = {
            clickAction: function (item) {
                _this.editSqlQuery(new analytics_utils_1.PathRequest(item.path).id, item.name);
            },
            position: 0,
            imageClassName: 'dx-image-edit',
            imageTemplateName: 'dxrd-svg-operations-edit',
            text: analytics_utils_1.getLocalization('Edit query', 'AnalyticsCoreStringId.SqlDSWizard_EditQuery')
        };
        _this.removeAction = {
            clickAction: function (item) {
                _this.removeSqlQuery(new analytics_utils_1.PathRequest(item.path).id, item.name);
            },
            position: 50,
            imageClassName: 'dxrd-image-recycle-bin',
            imageTemplateName: 'dxrd-svg-operations-recycle_bin',
            text: analytics_utils_1.getLocalization('Remove query', 'AnalyticsCoreStringId.SqlDSWizard_RemoveQuery')
        };
        _this.editRelationsAction = {
            clickAction: function (item) {
                _this.editMasterDetailRelations(item.data.name);
            },
            position: 0,
            imageClassName: 'dx-image-edit',
            imageTemplateName: 'dxrd-svg-operations-edit',
            text: analytics_utils_1.getLocalization('Edit Master-Detail Relations', 'ASPxReportsStringId.ReportDesigner_FieldListActions_EditMasterDetailRelations')
        };
        return _this;
    }
    SqlDataSourceEditor.prototype._applyWizardChanges = function (dataSource, sqlDataSource, queryName, relationsEditing) {
        return this._applyDataSourceChange(sqlDataSource, dataSource, queryName, relationsEditing);
    };
    SqlDataSourceEditor.prototype._createOrEditSqlDataSource = function (requestJson, dataSource, requestName) {
        var _this = this;
        return analytics_internal_1.ajax(settings_1.HandlerUri(), requestName, encodeURIComponent(requestJson))
            .done(function (result) {
            result.dataSource.data = JSON.parse(result.dataSource.data);
            result.dataSource.isSqlDataSource = true;
            if (dataSource) {
                dataSource.data['base64'](result.dataSource.data['@Base64']);
            }
            else {
                _dataUtils_1.addDataSourceToReport(_this._dsHelper(), _this._reportViewModel(), _this._undoEngine(), _this._itemsProvider(), result.dataSource);
            }
        })
            .fail(function (result) {
            if (analytics_internal_1.getErrorMessage(result))
                analytics_internal_1.ShowMessage(analytics_internal_1.getErrorMessage(result));
        });
    };
    SqlDataSourceEditor.prototype._applyDataSourceChange = function (source, dest, queryName, relationsEditing) {
        var _this = this;
        return SqlDataSourceEditor.createSqlDataSourceInfo(source, queryName, relationsEditing)
            .done(function (result) {
            if (dest) {
                dest.data['base64'](result.base64());
            }
            else {
                _dataUtils_1.addDataSourceToReport(_this._dsHelper(), _this._reportViewModel(), _this._undoEngine(), _this._itemsProvider(), result);
            }
        });
    };
    SqlDataSourceEditor.prototype.editSqlQuery = function (dataSourceID, queryName) {
        var _this = this;
        var dataSourceInfo = this._findDataSource(dataSourceID);
        _reportDataSourceService_1.ReportDataSourceService.sqlDataSourceFromBase64(dataSourceInfo.data['base64']()).done(function (result) {
            var sqlDataSource = new analytics_data_1.SqlDataSource(JSON.parse(result.sqlDataSourceJSON), undefined, _qBRequestWrapper_1.QBRequestWrapper());
            sqlDataSource.name(dataSourceInfo.name);
            _this._wizard.initialize({
                dataSourceType: analytics_wizard_1.DataSourceType.Sql,
                sqlDataSourceWizard: {
                    name: sqlDataSource.connection.name(),
                    queryName: queryName,
                    sqlDataSourceJSON: JSON.stringify(new analytics_utils_1.ModelSerializer().serialize(sqlDataSource))
                }
            }, function (factory, stateManager) { return new CreateQueryIterator(factory, stateManager, _this._wizard['_wizardOptions']); });
            _this._wizard.start();
            _this._wizard.isVisible(true);
        });
    };
    SqlDataSourceEditor.prototype.addSqlQuery = function (dataSourceID) {
        this.editSqlQuery(dataSourceID, null);
    };
    SqlDataSourceEditor.prototype.removeSqlQuery = function (dataSourceID, queryName) {
        var _this = this;
        var dataSourceInfo = this._findDataSource(dataSourceID);
        _reportDataSourceService_1.ReportDataSourceService.sqlDataSourceFromBase64(dataSourceInfo.data['base64']()).done(function (result) {
            var sqlDataSource = new analytics_data_1.SqlDataSource(JSON.parse(result.sqlDataSourceJSON));
            sqlDataSource.queries.remove(function (x) { return x.name() === queryName; });
            _this._applyWizardChanges(dataSourceInfo, sqlDataSource, queryName);
        });
    };
    SqlDataSourceEditor.prototype.editMasterDetailRelations = function (dataSourceID) {
        var _this = this;
        var dataSourceInfo = this._findDataSource(dataSourceID);
        _reportDataSourceService_1.ReportDataSourceService.sqlDataSourceFromBase64(dataSourceInfo.data['base64']()).done(function (result) {
            var sqlDataSource = new analytics_data_1.SqlDataSource(JSON.parse(result.sqlDataSourceJSON));
            if (sqlDataSource.queries().length < 2) {
                analytics_internal_1.ShowMessage(analytics_utils_1.getLocalization('At least two queries are required to create a master-detail relation.', 'DataAccessUIStringId.MessageLessThanTwoQueries'), 'warning', 10000);
                return;
            }
            _this.relationsEditor(new queryBuilder_widgets_internal_1.MasterDetailEditor(sqlDataSource.relations, sqlDataSource.resultSet, function () {
                return _this._applyWizardChanges(dataSourceInfo, sqlDataSource, '', true);
            }));
            _this.relationsEditor().popupVisible(true);
        });
    };
    SqlDataSourceEditor.prototype.applySqlDataSourceWizardChanges = function (dataSourceWizardModel) {
        var dataSourceWrapped = analytics_wizard_1._restoreSqlDataSourceFromState(dataSourceWizardModel.sqlDataSourceWizard, _qBRequestWrapper_1.QBRequestWrapper(), dataSourceWizardModel.dataSourceId);
        var dataSource = this._dsHelper().findDataSourceInfoByName(dataSourceWrapped.sqlDataSource.name());
        return this._applyDataSourceChange(dataSourceWrapped.sqlDataSource, dataSource, dataSourceWrapped.sqlQuery && dataSourceWrapped.sqlQuery.name());
    };
    SqlDataSourceEditor.createSqlDataSourceInfo = function (source, queryName, relationsEditing) {
        var deferred = $.Deferred();
        _qBRequestWrapper_1.QBRequestWrapper().rebuildResultSchema(source, queryName, relationsEditing)
            .done(function (result) {
            var model = JSON.parse(result.resultSchemaJSON);
            source.resultSet = !!model ? new analytics_data_1.ResultSet(model) : null;
            if (!!result.connectionParameters) {
                source.connection.parameteres((function (x) { try {
                    return JSON.parse(x)['Parameters'] || x;
                }
                catch (_) {
                    return x;
                } })(result.connectionParameters));
                source.connection.fromAppConfig(false);
            }
            _reportDataSourceService_1.ReportDataSourceService.getSqlDataSourceBase64(source)
                .done(function (result) {
                deferred.resolve({
                    name: 'sqlDataSource',
                    id: source.id,
                    data: {
                        '@ObjectType': 'DevExpress.DataAccess.Sql.SqlDataSource',
                        '@Base64': result
                    },
                    isSqlDataSource: true,
                    base64: function () { return result; }
                });
            })
                .fail(function (result) { SqlDataSourceEditor._onFail(result, deferred); });
        })
            .fail(function (result) { SqlDataSourceEditor._onFail(result, deferred); });
        return deferred.promise();
    };
    SqlDataSourceEditor.prototype.getActions = function (context) {
        var result = [];
        if (!context.data)
            return result;
        if (context.data['canAddSqlQuery'] === true) {
            result.push(this.addAction);
            result.push(this.editRelationsAction);
        }
        if (context.data['canEditQuery'] === true) {
            result.push(this.editAction);
            result.push(this.removeAction);
        }
        return result;
    };
    return SqlDataSourceEditor;
}(DataSourceEditorBase));
exports.SqlDataSourceEditor = SqlDataSourceEditor;
