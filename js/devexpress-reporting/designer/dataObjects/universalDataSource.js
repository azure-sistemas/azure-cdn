﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\universalDataSource.js)
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
var metadata_1 = require("../controls/metadata/properties/metadata");
var objectStorageItem_1 = require("./objectStorageItem");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var ko = require("knockout");
var $ = require("jquery");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var TableInfoCollectionItem = (function (_super) {
    __extends(TableInfoCollectionItem, _super);
    function TableInfoCollectionItem(model, dataSource, dsHelper, serializer) {
        var _this = _super.call(this, model, serializer, tableInfoCollectionItemSerializationsInfo) || this;
        _this.filterString = ko.observable(null);
        var options = new analytics_widgets_1.FilterStringOptions(_this['_filterString'], ko.pureComputed(function () {
            return dsHelper() && (dsHelper().getDataSourcePath(dataSource) + '.' + _this['tableName']());
        }), ko.pureComputed(function () { return !dataSource; }));
        options.helper.canChoiceParameters = true;
        _this.filterString(options);
        return _this;
    }
    return TableInfoCollectionItem;
}(analytics_elements_1.SerializableModel));
exports.TableInfoCollectionItem = TableInfoCollectionItem;
var tableInfoCollectionItemSerializationsInfo = [metadata_1.filterString, metadata_1.filterStringEditable, { propertyName: 'tableName', modelName: '@TableName' }];
var UniversalDataSource = (function (_super) {
    __extends(UniversalDataSource, _super);
    function UniversalDataSource(model, dsHelperProvider, serializer) {
        var _this = _super.call(this, $.extend({ '@ObjectType': 'DevExpress.ReportServer.Infrastructure.Data.UniversalDataSource' }, model), dsHelperProvider, serializer) || this;
        _this.parameters = analytics_utils_1.deserializeArray(model.Parameters || [], function (item) { return new objectStorageItem_1.ObjectStorageParameter(item, serializer); });
        _this.tableInfoCollection = analytics_utils_1.deserializeArray(model.TableInfoCollection || [], function (item) { return new TableInfoCollectionItem(item, _this, dsHelperProvider, serializer); });
        _this.spParameterInfoCollection = analytics_utils_1.deserializeArray(model.StoredProcedureParameterInfoCollection || [], function (item) { return new objectStorageItem_1.ObjectStorageParameter(item, serializer); });
        return _this;
    }
    UniversalDataSource.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.parameters);
        this.disposeObservableArray(this.tableInfoCollection);
        this.disposeObservableArray(this.spParameterInfoCollection);
        this.resetObservableArray(this.parameters);
        this.resetObservableArray(this.tableInfoCollection);
        this.resetObservableArray(this.spParameterInfoCollection);
    };
    UniversalDataSource.prototype.getInfo = function () {
        return _super.prototype.getInfo.call(this).concat([
            { propertyName: 'parameters', modelName: 'Parameters', array: true },
            { propertyName: 'tableInfoCollection', modelName: 'TableInfoCollection', array: true },
            { propertyName: 'spParameterInfoCollection', modelName: 'StoredProcedureParameterInfoCollection', array: true },
            { propertyName: 'name', modelName: '@Name' }
        ]);
    };
    return UniversalDataSource;
}(objectStorageItem_1.ObjectItem));
exports.UniversalDataSource = UniversalDataSource;
