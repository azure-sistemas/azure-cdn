﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportWizardService.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = require("../utils/settings");
var _qBRequestWrapper_1 = require("../tools/generator/_qBRequestWrapper");
var chooseAvailableDataSourcePage_1 = require("../wizard/pages/chooseAvailableDataSourcePage");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var $ = require("jquery");
var objectItemCreation_1 = require("../dataObjects/objectItemCreation");
var ReportWizardService = (function () {
    function ReportWizardService() {
    }
    ReportWizardService.createNewWizardRequest = function (reportWizardState, requestType, state, customizeWizardModelAction, oldReportJSON) {
        var dataSourceJSON = null;
        reportWizardState.dataSource = reportWizardState.dataSource || reportWizardState.newDataSource;
        if (reportWizardState.dataSource) {
            dataSourceJSON = JSON.parse(reportWizardState.dataSource).data;
        }
        var wizardModel = new requestType(reportWizardState);
        customizeWizardModelAction && customizeWizardModelAction(wizardModel);
        var requestJson = JSON.stringify({
            reportModel: wizardModel,
            dataSource: dataSourceJSON,
            oldReport: oldReportJSON,
            state: state,
            colorScheme: reportWizardState.colorScheme && (reportWizardState.colorScheme.name === 'Custom' ? reportWizardState.colorScheme.baseColor : reportWizardState.colorScheme.name)
        });
        return encodeURIComponent(requestJson);
    };
    ReportWizardService.generateReportFromWizardState = function (reportWizardState, requestType, state, customizeWizardModelAction, oldReportJSON) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'generateReportFromWizardModel', this.createNewWizardRequest(reportWizardState, requestType, state, customizeWizardModelAction, oldReportJSON));
    };
    ReportWizardService.getLabelReportWizardData = function () {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'labelReportWizardData', '');
    };
    ReportWizardService.createNewJsonDataSource = function (state, createJsonCallback) {
        var jsonDataSource = analytics_wizard_1._restoreJsonDataSourceFromState(state);
        var deferred = $.Deferred();
        _qBRequestWrapper_1.QBRequestWrapper().saveJsonSource(state.newConnectionName, jsonDataSource).done(function (connectionName) {
            state.jsonSource = null;
            state.connectionName = connectionName;
            createJsonCallback(analytics_wizard_1._restoreJsonDataSourceFromState(state))
                .done(function (result) {
                result.data = objectItemCreation_1.createNewObjectItem(result.data);
                deferred.resolve(chooseAvailableDataSourcePage_1._convertToStateDataSource(result));
            })
                .fail(function () { return deferred.reject(); });
        }).fail(function () { return deferred.reject(); });
        return deferred.promise();
    };
    return ReportWizardService;
}());
exports.ReportWizardService = ReportWizardService;
