﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_dataSourceHelper.js)
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
var objectStorageItem_1 = require("../dataObjects/objectStorageItem");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var objectItemCreation_1 = require("../dataObjects/objectItemCreation");
var dataFederation_1 = require("../dataObjects/dataFederation");
var DataSourceHelper = (function (_super) {
    __extends(DataSourceHelper, _super);
    function DataSourceHelper(objects, dataSourceRefs, availableDataSources) {
        var _this = _super.call(this) || this;
        _this.usedDataSources = ko.observableArray();
        _this.allDataSources = ko.observableArray();
        _this.usedDataSources.push({ ref: 'none', name: 'none', specifics: 'none', data: null, dataSerializer: null });
        _this._objects = objects;
        for (var i = 0; i < objects().length; i++) {
            var currentObject = objects()[i];
            var ref = currentObject['_model']['@Ref'];
            var dataSourceRef = dataSourceRefs.filter(function (ds) { return ds.ref === ref; })[0];
            if (dataSourceRef) {
                var currentDataSourceInfo = {
                    ref: ref,
                    data: currentObject,
                    name: dataSourceRef.name,
                    isSqlDataSource: dataSourceRef.isSqlDataSource,
                    isJsonDataSource: dataSourceRef.isJsonDataSource,
                    isObjectDataSource: dataSourceRef.isObjectDataSource,
                    dataSerializer: dataSourceRef.dataSerializer,
                    hasParams: dataSourceRef.hasParams,
                    hasErrors: dataSourceRef.hasErrors
                };
                currentObject['dataSourceInfo'] = currentDataSourceInfo;
                _this._addUsedDataSource(currentDataSourceInfo);
            }
        }
        var self = _this;
        _this._disposables.push(objects.subscribe(function (changes) {
            for (var index = 0; index < changes.length; index++) {
                if (!changes[index].value['dataSourceInfo'])
                    return;
                if (changes[index].status === 'added') {
                    self._addUsedDataSource(changes[index].value['dataSourceInfo']);
                }
                else if (changes[index].status === 'deleted') {
                    var dataSourceInfo = self.findDataSourceInfo(changes[index].value);
                    if (dataSourceInfo) {
                        _this.usedDataSources.remove(dataSourceInfo);
                        _this.allDataSources.remove(dataSourceInfo);
                    }
                }
            }
        }, null, 'arrayChange'));
        var serializer = new analytics_utils_1.ModelSerializer();
        _this.availableDataSources = (availableDataSources || []).map(function (object) {
            return $.extend({}, object, { data: objectItemCreation_1.createNewObjectItem(object.data, function () { return _this; }, serializer) });
        });
        _this.allDataSources.push.apply(_this.allDataSources, _this.availableDataSources);
        return _this;
    }
    DataSourceHelper.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._objects = null;
        this.availableDataSources.splice(0);
        this.usedDataSources([]);
        this.allDataSources([]);
    };
    DataSourceHelper.prototype.getDataSourcePath = function (dataSource) {
        var dataSourceInfo = dataSource && this.findDataSourceInfo(dataSource);
        if (dataSourceInfo) {
            return dataSourceInfo.id || dataSourceInfo.ref;
        }
        else {
            return '';
        }
    };
    DataSourceHelper.prototype._findDataSourceInfo = function (name, collection) {
        return collection().filter(function (info) { return info.name === name; })[0];
    };
    DataSourceHelper.prototype._getDataSourceInfo = function (name) {
        var result = this._findDataSourceInfo(name, this.usedDataSources);
        if (!result) {
            var resultSource = this._findDataSourceInfo(name, this.allDataSources);
            if (resultSource) {
                result = this._addDataSource(resultSource, resultSource.data);
            }
        }
        return result;
    };
    DataSourceHelper.prototype._getDataSourceName = function (dataSource) {
        var dataSourceInfo = this.findDataSourceInfo(dataSource);
        return dataSourceInfo && dataSourceInfo.name;
    };
    DataSourceHelper.prototype._addUsedDataSource = function (result) {
        this.usedDataSources.splice(this.usedDataSources().length - 1, 0, result);
        this.allDataSources.push(result);
    };
    DataSourceHelper.prototype._addDataSource = function (dataSource, data, uniqueName) {
        if (!dataSource.name) {
            throw new Error('dataSource name is undefined or null (ref=' + dataSource.ref + ', id=' + dataSource.id + ')');
        }
        var dataSourceName = uniqueName || this.getUniqueDataSourceName(dataSource.name);
        var newData = data;
        if (this._objects().indexOf(data) === -1) {
            newData = this._cloneObjectItem(data);
            newData['dataSourceInfo'] = $.extend({}, dataSource, { name: dataSourceName, data: newData });
            newData['name'] = ko.observable(dataSourceName);
            this._objects.push(newData);
        }
        return this.findDataSourceInfo(newData);
    };
    DataSourceHelper.prototype._cloneObjectItem = function (data) {
        var _this = this;
        var serializer = new analytics_utils_1.ModelSerializer();
        var serializedObj;
        if (data instanceof dataFederation_1.DataFederationDataSource) {
            serializedObj = data.getSerializableModel().serialize();
            var newModel = new dataFederation_1.SerializableDataFederationDataSource(null, serializedObj, data.dsHelperProvider, serializer);
            var cloneSerializableSourceMap = [];
            data.serializableSourceMap().forEach(function (source) {
                var info = _this.availableDataSources.filter(function (item) { return item.data === source.dataSource(); })[0];
                if (info) {
                    var existedDataSource = _this.findDataSourceInfoByName(info.name);
                    var usedDataSource = existedDataSource || _this._addDataSource(info, info.data, info.name);
                    cloneSerializableSourceMap.push(usedDataSource.data);
                }
            });
            var newSerializableModel = newModel.dataSource.getSerializableModel();
            newSerializableModel.dataSources(cloneSerializableSourceMap);
            cloneSerializableSourceMap.forEach(function (item, index) {
                newSerializableModel.dataSource.serializableSourceMap()[index].dataSource(item);
            });
            return newSerializableModel.dataSource;
        }
        else {
            serializedObj = serializer.serialize(data);
            return objectItemCreation_1.createNewObjectItem(serializedObj, data.dsHelperProvider, serializer);
        }
    };
    DataSourceHelper.prototype.getUniqueDataSourceName = function (name) {
        return analytics_internal_1.getUniqueNameForNamedObjectsArray(this.allDataSources(), analytics_internal_1.replaceInvalidSymbols(name));
    };
    DataSourceHelper.prototype.addDataSource = function (dataSourceInfo) {
        var _this = this;
        var data = (dataSourceInfo.data instanceof objectStorageItem_1.ObjectItem) ? dataSourceInfo.data : objectItemCreation_1.createNewObjectItem(dataSourceInfo.data, function () { return _this; });
        return this._addDataSource(dataSourceInfo, data).data;
    };
    DataSourceHelper.prototype.removeDataSource = function (dataSourceInfo) {
        this._objects.remove(dataSourceInfo.data);
    };
    DataSourceHelper.prototype.restoreDataSource = function (dataSourceInfo) {
        this._objects.push(dataSourceInfo.data);
    };
    DataSourceHelper.prototype.dataSourceValue = function (value, undoEngine) {
        var _this = this;
        var dataSourceValue = ko.pureComputed({
            read: function () {
                return _this._getDataSourceName(value());
            },
            write: function (val) {
                var _undoEngine = undoEngine && undoEngine();
                _undoEngine && _undoEngine.start();
                var newDataSource = _this._getDataSourceInfo(val);
                if (DataSourceHelper._assignValueInTimeout) {
                    setTimeout(function () {
                        value(newDataSource && newDataSource.data);
                        _undoEngine && _undoEngine.end();
                    }, 1);
                }
                else {
                    value(newDataSource && newDataSource.data);
                    _undoEngine && _undoEngine.end();
                }
            }
        });
        this._disposables.push(dataSourceValue);
        return dataSourceValue;
    };
    DataSourceHelper.prototype.dataSourceDisplayExpr = function (dataSource) {
        return (!dataSource || !dataSource.data) ? analytics_internal_1.localizeNoneString('none') : dataSource.name;
    };
    DataSourceHelper.prototype.mergedDataSources = function () {
        var _this = this;
        var dataSources = this.usedDataSources().slice(0, -1);
        for (var i = this.availableDataSources.length - 1; i >= 0; i--) {
            if (!analytics_internal_1.findFirstItemMatchesCondition(dataSources, function (item) { return item.name === _this.availableDataSources[i].name; })) {
                dataSources.unshift(this.availableDataSources[i]);
            }
        }
        return dataSources;
    };
    DataSourceHelper.prototype.findDataSourceInfo = function (dataSource) {
        return this.usedDataSources().filter(function (info) { return info.data === dataSource; })[0];
    };
    DataSourceHelper.prototype.findDataSourceInfoByID = function (id) {
        return this.usedDataSources().filter(function (info) { return info.id === id; })[0];
    };
    DataSourceHelper.prototype.findDataSourceInfoByRef = function (ref) {
        return this.usedDataSources().filter(function (info) { return info.ref === ref; })[0];
    };
    DataSourceHelper.prototype.findDataSourceInfoByName = function (name) {
        return this.usedDataSources().filter(function (item) { return item.name === name; })[0];
    };
    DataSourceHelper.defaultReportExtensionKey = 'DataSerializationExtension';
    DataSourceHelper._assignValueInTimeout = true;
    return DataSourceHelper;
}(analytics_utils_1.Disposable));
exports.DataSourceHelper = DataSourceHelper;
