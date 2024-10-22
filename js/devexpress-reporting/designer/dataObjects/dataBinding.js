﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\dataBinding.js)
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
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var DataBindingBase = (function (_super) {
    __extends(DataBindingBase, _super);
    function DataBindingBase(model, serializer) {
        var _this = _super.call(this) || this;
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(_this, model);
        _this._disposables.push(_this.displayExpr = ko.pureComputed(function () {
            var parameter = _this.parameter();
            return parameter ? parameter.name : _this.dataMember();
        }));
        return _this;
    }
    DataBindingBase.prototype.getInfo = function () {
        return dataBindingInfo_1.dataBindingBaseSerializationInfo;
    };
    DataBindingBase.prototype._findDataSourceFromPath = function (path, dataSources) {
        var dataSourceId = path.split('.')[0];
        var dataSourceInfo = (dataSources || []).filter(function (dataSource) { return dataSource.ref === dataSourceId || dataSource.id === dataSourceId; })[0];
        if (dataSourceInfo) {
            return dataSourceInfo.data;
        }
        return null;
    };
    DataBindingBase.prototype.updateParameter = function (pathRequest, dataSources) {
        var parameterName = pathRequest.fullPath.split('.').pop();
        this.parameter(_parameterUtils_1.collectAvailableParameters(this._findDataSourceFromPath(pathRequest.fullPath, dataSources)() || [])
            .filter(function (item) { return item.name === parameterName; })[0]);
        this.dataSource(null);
    };
    DataBindingBase.prototype.updateBinding = function (path, dataSources) {
        if (!!path) {
            var pathRequest = new analytics_utils_1.PathRequest(path);
            if (path.indexOf('Parameters.') === 0) {
                this.updateParameter(pathRequest, dataSources);
            }
            else {
                this.dataMember(pathRequest.path);
                this.dataSource(this._findDataSourceFromPath(path, dataSources));
                this.parameter(null);
            }
        }
        else {
            this.resetValue();
        }
    };
    DataBindingBase.prototype.getValuePath = function (dataSourceHelper) {
        if (this.parameter()) {
            return 'Parameters.' + this.parameter().name;
        }
        var dataSourceName = '';
        if (this.dataSource()) {
            var ds = dataSourceHelper.findDataSourceInfo(this.dataSource());
            dataSourceName = ds && (ds.id || ds.ref);
        }
        return dataSourceName && this.dataMember() ? (dataSourceName + '.' + this.dataMember()) : '';
    };
    DataBindingBase.prototype.generateValue = function (undoEngine, dataSourceHelper, dataSources) {
        var _this = this;
        if (!this.generatedValue) {
            this._disposables.push(this.generatedValue = ko.computed({
                read: function () {
                    return _this.getValuePath(dataSourceHelper);
                },
                write: function (val) {
                    undoEngine.start();
                    _this.updateBinding(val, dataSources);
                    undoEngine.end();
                }
            }));
        }
        return this.generatedValue;
    };
    DataBindingBase.prototype.resetValue = function () {
        this.parameter(null);
        this.dataSource(null);
        this.dataMember(null);
    };
    DataBindingBase.prototype.isEmpty = function () {
        return !(this.dataMember() || this.dataSource() || this.parameter());
    };
    return DataBindingBase;
}(analytics_utils_1.Disposable));
exports.DataBindingBase = DataBindingBase;
var DataBinding = (function (_super) {
    __extends(DataBinding, _super);
    function DataBinding(model, serializer) {
        var _this = _super.call(this, model, serializer) || this;
        _this.visible = ko.observable(true);
        _this.disabled = ko.pureComputed(function () {
            var dataMember = _this.dataMember();
            return !(_this.parameter() || dataMember);
        });
        _this._disposables.push(_this.disabled.subscribe(function (newVal) {
            newVal && _this.formatString('');
        }));
        _this._disposables.push(_this.disabled);
        return _this;
    }
    DataBinding.initialize = function (model, serializer) {
        var currentDataBindings = analytics_utils_1.deserializeArray(model, function (item) { return new DataBinding(item, serializer); });
        (this['allDataBindings'] || []).forEach(function (value) {
            if (currentDataBindings().filter(function (databinding) { return databinding.propertyName() === value; }).length === 0)
                currentDataBindings.push(new DataBinding({ '@PropertyName': value }, serializer));
        });
        currentDataBindings()['findBinding'] = function (bindingName) {
            return currentDataBindings().filter(function (binding) { return binding.propertyName() === bindingName; })[0];
        };
        return currentDataBindings;
    };
    DataBinding.prototype.getInfo = function () {
        return dataBindingInfo_1.dataBindingSerializationInfo;
    };
    DataBinding.prototype.updateParameter = function (pathRequest, dataSources) {
        _super.prototype.updateParameter.call(this, pathRequest, dataSources);
        this.dataMember(pathRequest.path);
    };
    DataBinding.prototype.resetValue = function () {
        _super.prototype.resetValue.call(this);
        this.formatString('');
    };
    return DataBinding;
}(DataBindingBase));
exports.DataBinding = DataBinding;
var dataBindingInfo_1 = require("./metadata/dataBindingInfo");
var _parameterUtils_1 = require("./metadata/_parameterUtils");
