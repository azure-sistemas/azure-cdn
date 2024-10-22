﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_objectDataSourceEditor.js)
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
var _reportDataSourceService_1 = require("../services/_reportDataSourceService");
var _dataUtils_1 = require("../internal/_dataUtils");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ObjectDataSourceEditParametersIterator = (function (_super) {
    __extends(ObjectDataSourceEditParametersIterator, _super);
    function ObjectDataSourceEditParametersIterator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjectDataSourceEditParametersIterator.prototype.getNextPageId = function (pageId) {
        if (!pageId)
            return analytics_wizard_1.ObjectDataSourceWizardPageId.ConfigureParametersPage;
        return _super.prototype.getNextPageId.call(this, pageId);
    };
    return ObjectDataSourceEditParametersIterator;
}(analytics_wizard_1.DataSourceWizardPageIterator));
exports.ObjectDataSourceEditParametersIterator = ObjectDataSourceEditParametersIterator;
var ObjectDataSourceEditor = (function (_super) {
    __extends(ObjectDataSourceEditor, _super);
    function ObjectDataSourceEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editParametersAction = {
            clickAction: function (item) {
                _this.editSchema(new analytics_utils_1.PathRequest(item.path).id);
            },
            position: 0,
            imageClassName: 'dx-image-edit',
            imageTemplateName: 'dxrd-svg-operations-edit',
            text: analytics_utils_1.getLocalization('Edit Parameters...', 'AnalyticsCoreStringId.ObjectDSWizard_EditParameters')
        };
        return _this;
    }
    ObjectDataSourceEditor.createObjectDataSourceInfo = function (objectDataSourceWizard, objectDataSource, base64) {
        var deferred = $.Deferred();
        (base64 ?
            _reportDataSourceService_1.ReportDataSourceService.editObjectDataSourceParameters(objectDataSourceWizard, base64) :
            _reportDataSourceService_1.ReportDataSourceService.getObjectDataSourceBase64(objectDataSourceWizard))
            .done(function (base64) {
            var ctors = objectDataSourceWizard.ctor;
            var name = objectDataSourceWizard.dataSourceName || 'objectDataSource';
            var dataMembers = objectDataSourceWizard.dataMember;
            var info = {
                base64: base64,
                data: {
                    '@ObjectType': 'DevExpress.DataAccess.ObjectBinding.ObjectDataSource',
                    '@Base64': base64
                },
                name: name,
                id: objectDataSource.id,
                isObjectDataSource: true
            };
            info['hasParams'] = ((ctors && ctors.parameters.length > 0) || (dataMembers && dataMembers.parameters.length > 0));
            deferred.resolve(info);
        }).fail(function (error) {
            deferred.reject();
        });
        return deferred.promise();
    };
    ObjectDataSourceEditor.prototype.applyDataSourceWizardChanges = function (dataSourceWizardModel) {
        var _this = this;
        var objectDataSource = analytics_wizard_1._restoreObjectDataSourceFromState(dataSourceWizardModel.objectDataSourceWizard);
        var dataSourceInfo = objectDataSource && this._dsHelper().findDataSourceInfoByName(objectDataSource.name());
        var deferred = $.Deferred();
        ObjectDataSourceEditor.createObjectDataSourceInfo(dataSourceWizardModel.objectDataSourceWizard, objectDataSource, dataSourceInfo && dataSourceInfo.data.base64())
            .done(function (info) {
            if (dataSourceInfo) {
                dataSourceInfo.base64 = info.base64;
                dataSourceInfo.data.base64(info.base64);
                deferred.resolve(dataSourceInfo);
            }
            else {
                _dataUtils_1.addDataSourceToReport(_this._dsHelper(), _this._reportViewModel(), _this._undoEngine(), _this._itemsProvider(), info);
                deferred.resolve(info);
            }
        })
            .fail(function (error) {
            deferred.reject();
        });
        return deferred.promise();
    };
    ObjectDataSourceEditor.prototype.getActions = function (context) {
        var result = [];
        if (context.data && context.data['isObjectDataSource'] === true && context.data['hasParams']) {
            result.push(this.editParametersAction);
        }
        return result;
    };
    ObjectDataSourceEditor.prototype.editSchema = function (dataSourceID) {
        var _this = this;
        var dataSourceInfo = this._findDataSource(dataSourceID);
        _reportDataSourceService_1.ReportDataSourceService.objectDataSourceFromBase64(dataSourceInfo.data['base64']()).done(function (result) {
            var beforeInitEvent = function (e) {
                e.state.dataSourceType = analytics_wizard_1.DataSourceType.Object;
            };
            _this._wizard.events.addHandler('beforeInitialize', beforeInitEvent);
            _this._wizard.initialize(analytics_wizard_1._createDefaultDataSourceWizardState(undefined, undefined, {
                ctor: result.ctor,
                dataMember: result.dataMember,
                selectedType: result.selectedType,
                dataSourceName: dataSourceInfo.name
            }), function (factory, stateManager) { return new ObjectDataSourceEditParametersIterator(factory, stateManager, _this._wizard['_wizardOptions']); });
            _this._wizard.events.removeHandler('beforeInitialize', beforeInitEvent);
            _this._wizard.start();
            _this._wizard.isVisible(true);
        }).fail(function (result) {
            if (analytics_internal_1.getErrorMessage(result))
                analytics_internal_1.ShowMessage(analytics_internal_1.getErrorMessage(result));
        });
    };
    return ObjectDataSourceEditor;
}(_sqlDataSourceEditor_1.DataSourceEditorBase));
exports.ObjectDataSourceEditor = ObjectDataSourceEditor;
