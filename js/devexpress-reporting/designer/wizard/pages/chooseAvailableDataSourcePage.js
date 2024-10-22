﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\chooseAvailableDataSourcePage.js)
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
var pageId_1 = require("../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var $ = require("jquery");
var objectItemCreation_1 = require("../../dataObjects/objectItemCreation");
var dataFederation_1 = require("../../dataObjects/dataFederation");
function _convertToStateDataSource(dataSource) {
    if (dataSource.data instanceof dataFederation_1.DataFederationDataSource) {
        var objStorageItem = dataSource.data.getSerializableModel().serialize();
    }
    else {
        var objStorageItem = new analytics_utils_1.ModelSerializer().serialize(dataSource.data);
    }
    return JSON.stringify($.extend(true, {}, dataSource, { data: JSON.stringify(objStorageItem) }));
}
exports._convertToStateDataSource = _convertToStateDataSource;
function _restoreDataSourceFromState(dataSource) {
    var dataSource = JSON.parse(dataSource);
    if (dataSource) {
        var parsedData = JSON.parse(dataSource.data);
        if (parsedData.dataSources) {
            var serializableModel = new dataFederation_1.SerializableDataFederationDataSource(null, parsedData);
            dataSource.data = serializableModel.dataSource;
        }
        else {
            dataSource.data = objectItemCreation_1.createNewObjectItem(JSON.parse(dataSource.data));
        }
    }
    return dataSource;
}
exports._restoreDataSourceFromState = _restoreDataSourceFromState;
var ChooseAvailableDataSourcePage = (function (_super) {
    __extends(ChooseAvailableDataSourcePage, _super);
    function ChooseAvailableDataSourcePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChooseAvailableDataSourcePage.prototype.commit = function () {
        return $.Deferred().resolve({
            sqlDataSourceWizard: {},
            jsonDataSourceWizard: {},
            dataSource: this.selectedOperation().createNew ? null : _convertToStateDataSource(this.selectedItems()[0])
        }).promise();
    };
    ChooseAvailableDataSourcePage.prototype._getSelectedItem = function (state) {
        var availableDataSources = this.items() || [];
        if (state.dataSource) {
            var dataSource = _restoreDataSourceFromState(state.dataSource);
            return availableDataSources.filter(function (x) { return x.id === dataSource.id || x.ref === dataSource.ref; })[0];
        }
        else if (availableDataSources.length === 0) {
            return null;
        }
        else {
            return availableDataSources[0];
        }
    };
    Object.defineProperty(ChooseAvailableDataSourcePage.prototype, "createNewOperationText", {
        get: function () {
            return analytics_utils_1.getLocalization("No, I'd like to create a new data source", 'AnalyticsCoreStringId.Wizard_CreateNewDataSource');
        },
        enumerable: true,
        configurable: true
    });
    return ChooseAvailableDataSourcePage;
}(analytics_wizard_1.ChooseAvailableItemPage));
exports.ChooseAvailableDataSourcePage = ChooseAvailableDataSourcePage;
function _registerChooseAvailableDataSourcePage(factory, reportWizardOptions) {
    factory.registerMetadata(pageId_1.ReportWizardPageId.ChooseAvailableDataSourcePage, {
        setState: function (data, state) {
            state.dataSource = data.dataSource;
            state.sqlDataSourceWizard = data.sqlDataSourceWizard;
            state.jsonDataSourceWizard = data.jsonDataSourceWizard;
        },
        getState: function (state) {
            return state;
        },
        resetState: function (state, defaultState) {
            state.sqlDataSourceWizard = defaultState.sqlDataSourceWizard;
            state.jsonDataSourceWizard = defaultState.jsonDataSourceWizard;
            state.dataSource = defaultState.dataSource;
        },
        create: function () {
            return new ChooseAvailableDataSourcePage(reportWizardOptions.dataSources, reportWizardOptions.canCreateDataSource);
        },
        template: 'dxrd-page-selectitems',
        description: analytics_utils_1.getLocalization('Do you want to use an existing data source?', 'AnalyticsCoreStringId.Wizard_UseExisting_DataSource')
    });
}
exports._registerChooseAvailableDataSourcePage = _registerChooseAvailableDataSourcePage;
