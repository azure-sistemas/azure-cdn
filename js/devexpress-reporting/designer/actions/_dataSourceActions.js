﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_dataSourceActions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _dataUtils_1 = require("../internal/_dataUtils");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var DataSourceActions = (function () {
    function DataSourceActions(dsHelper, reportViewModel, undoEngine) {
        var _this = this;
        this.removeDataSourceAction = {
            clickAction: function (item) {
                _this.removeDataSource(item.data.name);
            },
            position: 50,
            imageClassName: 'dxrd-image-recycle-bin',
            imageTemplateName: 'dxrd-svg-operations-recycle_bin',
            text: analytics_utils_1.getLocalization('Remove Data Source', 'ASPxReportsStringId.ReportDesigner_FieldListActions_RemoveDataSource')
        };
        this._dsHelper = dsHelper;
        this._reportViewModel = reportViewModel;
        this._undoEngine = undoEngine;
    }
    DataSourceActions.prototype._findDataSource = function (dataSourceID) {
        return this._dsHelper().usedDataSources().filter(function (item) {
            return item.id === dataSourceID || item.ref === dataSourceID;
        })[0];
    };
    DataSourceActions.prototype.removeDataSource = function (dataSourceID) {
        var dsInfo = this._findDataSource(dataSourceID);
        if (!dsInfo)
            return;
        _dataUtils_1.removeDataSourceFromReport(this._dsHelper(), this._reportViewModel().dataSource, this._undoEngine, dsInfo);
    };
    DataSourceActions.prototype.getActions = function (context) {
        var result = [];
        if (!context.data)
            return result;
        if (context.data['canRemove'] === true) {
            result.push(this.removeDataSourceAction);
        }
        return result;
    };
    return DataSourceActions;
}());
exports.DataSourceActions = DataSourceActions;
