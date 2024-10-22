﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_dataSourceItemsExtender.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var DataSourceItemsExtender = (function () {
    function DataSourceItemsExtender(dataSources) {
        this._dataSources = dataSources;
    }
    DataSourceItemsExtender.prototype.beforeItemsFilled = function (request, items) {
        return false;
    };
    DataSourceItemsExtender.prototype.afterItemsFilled = function (request, items) {
        if (!(this._dataSources && this._dataSources.peek()))
            return;
        if (!request.fullPath) {
            this._dataSources.peek().forEach(function (dataSourceItem) {
                var dataMember = analytics_internal_1.getFirstItemByPropertyValue(items, 'displayName', dataSourceItem.name);
                if (!(dataMember && dataSourceItem.data))
                    return;
                if (dataSourceItem.data.tableInfoCollection) {
                    dataMember['contenttemplate'] = 'dxrd-datasource-item';
                    dataMember['tableInfoItems'] = dataSourceItem.data.tableInfoCollection;
                }
                else if (dataSourceItem.isSqlDataSource) {
                    dataMember['canAddSqlQuery'] = true;
                }
                else if (dataSourceItem.isJsonDataSource) {
                    dataMember['isJsonDataSource'] = true;
                }
                else if (dataSourceItem.isObjectDataSource) {
                    dataMember['isObjectDataSource'] = true;
                    dataMember['hasParams'] = dataSourceItem['hasParams'];
                }
                dataMember['canRemove'] = true;
            });
        }
        else if (request.fullPath === request.id || request.fullPath === request.ref) {
            var dataSourcesInfo = this._dataSources.peek().filter(function (dataSourceItem) {
                return !!dataSourceItem.id && dataSourceItem.id === request.id || !!dataSourceItem.ref && dataSourceItem.ref === request.ref;
            })[0];
            if (!dataSourcesInfo || !dataSourcesInfo.isSqlDataSource)
                return;
            items.forEach(function (dataMemberItem) { dataMemberItem['canEditQuery'] = dataMemberItem.isList; });
        }
    };
    return DataSourceItemsExtender;
}());
exports.DataSourceItemsExtender = DataSourceItemsExtender;
