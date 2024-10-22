﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\dataFederation.js)
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
var objectStorageItem_1 = require("./objectStorageItem");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var DataFederationDataSource = (function (_super) {
    __extends(DataFederationDataSource, _super);
    function DataFederationDataSource(model, _dsHelperProvider, _serializer) {
        var _this = _super.call(this, model, _dsHelperProvider, _serializer) || this;
        _this._dsHelperProvider = _dsHelperProvider;
        _this._serializer = _serializer;
        return _this;
    }
    DataFederationDataSource.prototype.preInitProperties = function (model) {
        var info = this.getInfo();
        this.getInfo = function () {
            var result = [];
            if (model && model['@Base64'])
                result = result.concat({ propertyName: 'base64', modelName: '@Base64' });
            return result.concat([], info, [
                {
                    modelName: 'SerializableSourceMap',
                    propertyName: 'serializableSourceMap',
                    array: true,
                    info: [
                        { modelName: '@DataSource', propertyName: 'dataSource', link: true },
                        { modelName: '@Name', propertyName: 'name' }
                    ]
                }
            ]);
        };
    };
    DataFederationDataSource.prototype.getSerializableModel = function () {
        if (!this._serializableModel)
            this._serializableModel = new SerializableDataFederationDataSource(this, null, this._dsHelperProvider, this._serializer);
        return this._serializableModel;
    };
    return DataFederationDataSource;
}(objectStorageItem_1.ObjectStorageItem));
exports.DataFederationDataSource = DataFederationDataSource;
var SerializableDataFederationDataSource = (function () {
    function SerializableDataFederationDataSource(dataSource, model, dsHelperProvider, serializer) {
        var _this = this;
        this.serializer = serializer || new analytics_utils_1.ModelSerializer();
        if (dataSource) {
            this.dataSource = dataSource;
            this.dataSources = dataSource.serializableSourceMap().reduce(function (result, x) {
                if (result.indexOf(x.dataSource() === -1))
                    result.push(x.dataSource());
                return result;
            }, ko.observableArray([]));
        }
        else if (model) {
            this.dataSources = ko.observableArray(Object.keys(model.dataSources || {}).map(function (item) { return new objectStorageItem_1.ObjectStorageItem(model.dataSources[item], dsHelperProvider, _this.serializer); }));
            this.dataSource = new DataFederationDataSource(model.dataSource, dsHelperProvider, this.serializer);
        }
    }
    SerializableDataFederationDataSource.prototype.getInfo = function () {
        return [
            { propertyName: 'dataSources', modelName: 'dataSources', array: true },
            { propertyName: 'dataSource', modelName: 'dataSource' }
        ];
    };
    SerializableDataFederationDataSource.prototype.serialize = function () {
        return this.serializer.serialize(this);
    };
    return SerializableDataFederationDataSource;
}());
exports.SerializableDataFederationDataSource = SerializableDataFederationDataSource;
