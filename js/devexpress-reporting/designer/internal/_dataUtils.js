﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_dataUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _dataSourceHelper_1 = require("../helpers/_dataSourceHelper");
var extension_1 = require("../controls/properties/extension");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_wizard_internal_1 = require("@devexpress/analytics-core/analytics-wizard-internal");
var ko = require("knockout");
var _utils_1 = require("./dragdrop/_utils");
function addDataSourceToReport(dataSourceHelper, report, undoEngine, itemsProvider, dataSource, forceAssigning) {
    if (forceAssigning === void 0) { forceAssigning = false; }
    undoEngine.start();
    var findFirstDataSourceWithSerializer = analytics_internal_1.findFirstItemMatchesCondition(dataSourceHelper.usedDataSources.peek(), function (item) { return !!item.dataSerializer && item.dataSerializer !== dataSource.dataSerializer; });
    var result = dataSourceHelper.addDataSource(dataSource);
    if (!findFirstDataSourceWithSerializer && dataSource.dataSerializer) {
        report.extensions.peek().forEach(function (item, index) {
            if (item.key.peek() === _dataSourceHelper_1.DataSourceHelper.defaultReportExtensionKey) {
                report.extensions.splice(index, 1);
            }
        });
        var newDataSerializer = new extension_1.ExtensionModel({});
        newDataSerializer.key = ko.observable(_dataSourceHelper_1.DataSourceHelper.defaultReportExtensionKey);
        newDataSerializer.value = ko.observable(dataSource.dataSerializer);
        report.extensions.push(newDataSerializer);
    }
    if (forceAssigning || !report.dataSource()) {
        report.dataSource(result);
        itemsProvider
            .getItems(new analytics_utils_1.PathRequest(dataSource.id || dataSource.ref))
            .done(function (dataMembers) {
            var lists = dataMembers.filter(function (item) { return _utils_1.isList(item); });
            if (dataMembers.length === 0 || includeNonListItem(dataMembers)) {
                report.dataMember('');
            }
            else if (!analytics_internal_1.find(lists, function (item) { return item.name === report.dataMember(); })) {
                report.dataMember(lists[0].name);
            }
        });
    }
    undoEngine.end();
}
exports.addDataSourceToReport = addDataSourceToReport;
function includeNonListItem(dataMembers) {
    return dataMembers.some(function (field) { return !_utils_1.isList(field) || field.specifics === analytics_wizard_internal_1.defaultObjectDataSourceItemSpecifics; });
}
exports.includeNonListItem = includeNonListItem;
function removeDataSourceFromReport(dataSourceHelper, reportDataSource, undoEngine, dataSource) {
    undoEngine().start();
    dataSourceHelper.removeDataSource(dataSource);
    if (reportDataSource() === dataSource.data) {
        reportDataSource(dataSourceHelper.findDataSourceInfoByRef('none').data);
    }
    undoEngine().end();
}
exports.removeDataSourceFromReport = removeDataSourceFromReport;
