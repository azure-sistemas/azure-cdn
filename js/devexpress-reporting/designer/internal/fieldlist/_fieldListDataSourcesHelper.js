﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_fieldListDataSourcesHelper.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataFederation_1 = require("../../dataObjects/dataFederation");
var _renameDataSourceStrategy_1 = require("./_renameDataSourceStrategy");
var parameter_1 = require("../../dataObjects/parameters/parameter");
var components_1 = require("../../controls/properties/components");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var $ = require("jquery");
exports.maxNestingLevelUpdate = analytics_internal_1.createGlobalModuleVariableFunc(5);
function patchRequest(request, dataSources, state) {
    request.state = state;
    var dataSource = analytics_internal_1.findFirstItemMatchesCondition(dataSources, function (ds) { return (request.id && ds.id === request.id) || (request.ref && ds.ref === request.ref); });
    if (dataSource && dataSource.data) {
        if (dataSource.data instanceof dataFederation_1.DataFederationDataSource) {
            dataSource.data.getSerializableModel().serializer = new analytics_utils_1.ModelSerializer();
            var serializedModel = dataSource.data.getSerializableModel().serialize();
            request.dataSource = JSON.stringify(serializedModel.dataSource);
            request['dataSources'] = Object.keys(serializedModel.dataSources).map(function (key) { return JSON.stringify(serializedModel.dataSources[key]); });
        }
        else
            request.dataSource = JSON.stringify(new analytics_utils_1.ModelSerializer().serialize(dataSource.data));
    }
}
exports.patchRequest = patchRequest;
var FieldListDataSourcesHelper = (function () {
    function FieldListDataSourcesHelper() {
        var _this = this;
        this._fieldListCache = {};
        this._dataSourceSubscriptions = [];
        this._innerCache = {};
        this._usedDataSourceSubscription = null;
        this._cacheIsClearNotificicator = ko.observable();
        this.dataSourceHelper = ko.observable();
        this.fieldListDataSources = ko.observableArray([]);
        this._renameDataSourceStrategy = new _renameDataSourceStrategy_1.RenameDataSourceStrategy(this.dataSourceHelper, function () { return _this.fieldListDataSources.valueHasMutated(); });
    }
    FieldListDataSourcesHelper.prototype.dispose = function () {
        this._usedDataSourceSubscription && this._usedDataSourceSubscription.dispose();
        this._usedDataSourceSubscription = null;
        this._clearDataSourceCache();
        this.fieldListDataSources([]);
        this.dataSourceHelper(null);
    };
    FieldListDataSourcesHelper.prototype._clearDataSourceCache = function (dataSourceRef) {
        var _this = this;
        Object.keys(this._fieldListCache).forEach(function (prop) {
            if (dataSourceRef === undefined || prop.split('.')[0] === dataSourceRef) {
                delete _this._fieldListCache[prop];
                delete _this._innerCache[prop];
            }
        });
        dataSourceRef !== undefined && this._cacheIsClearNotificicator.notifySubscribers();
    };
    FieldListDataSourcesHelper.prototype._subscribeDataSource = function (dataSource) {
        var _this = this;
        if (dataSource.data && dataSource.data.base64) {
            this._dataSourceSubscriptions.push(dataSource.data.base64.subscribe(function (newVal) {
                _this._clearDataSourceCache(dataSource.ref || dataSource.id);
                _this.fieldListDataSources.notifySubscribers(_this.fieldListDataSources());
                _this.dataSourceHelper().usedDataSources.notifySubscribers(_this.dataSourceHelper().usedDataSources());
            }));
        }
    };
    FieldListDataSourcesHelper.prototype._updateFieldListDataSources = function (usedDataSources, parameters) {
        var _this = this;
        if (!usedDataSources) {
            this.fieldListDataSources(null);
            return;
        }
        this._dataSourceSubscriptions.forEach(function (x) { return x.dispose(); });
        this._dataSourceSubscriptions = [];
        this._fieldListCache = {};
        this._innerCache = {};
        var dataSourcesArray = [].concat(usedDataSources);
        if (parameters) {
            dataSourcesArray.splice(-1, 0, { ref: parameter_1.Parameter.ParametersRefString, name: 'Parameters', specifics: 'parameters', data: parameters, dataSerializer: null });
        }
        dataSourcesArray.forEach(function (item) { return _this._subscribeDataSource(item); });
        this.fieldListDataSources(dataSourcesArray);
    };
    FieldListDataSourcesHelper.prototype._wrapRequest = function (request) {
        var pathParts = request.pathParts.length > 0 ? request.pathParts.map(function (x) { return x; }) : request.fullPath.split('.');
        var currentPathLength = Math.floor((pathParts.length - 1) / exports.maxNestingLevelUpdate());
        var currentRequestPath = pathParts.splice(0, 1 + currentPathLength * exports.maxNestingLevelUpdate());
        return new analytics_utils_1.PathRequest(currentRequestPath.join('.'), currentRequestPath);
    };
    FieldListDataSourcesHelper.prototype._findItems = function (items, pathParts) {
        if (pathParts.length === 0 || !items)
            return items;
        var itemName = pathParts.splice(0, 1)[0];
        var item = items.filter(function (x) { return x.name === itemName; })[0];
        if (!item)
            return;
        if (pathParts.length > 0 && item['items']) {
            return this._findItems(item['items'], pathParts);
        }
        else if (pathParts.length === 0) {
            return item['items'];
        }
    };
    FieldListDataSourcesHelper.prototype._createRelativePath = function (fullPath, currentPath) {
        if (!currentPath)
            return fullPath;
        if (fullPath != currentPath) {
            return fullPath.replace(currentPath + '.', '');
        }
        return '';
    };
    FieldListDataSourcesHelper.prototype._updateInnerCache = function (currentRequest, currentPath, result) {
        var _this = this;
        result.forEach(function (item) {
            var itemPath = [currentPath, item.name].join('.');
            if (item.relationPath) {
                Object.defineProperty(item, 'items', {
                    get: function () { return _this._findItems(_this._innerCache[currentRequest.fullPath], _this._createRelativePath(item.relationPath, currentRequest.path).split('.')); }
                });
            }
            else if (item.items) {
                _this._updateInnerCache(currentRequest, itemPath, item.items);
            }
        });
    };
    FieldListDataSourcesHelper.prototype._getPathPartsFromRequest = function (request) {
        return request.pathParts.length > 0 ? request.pathParts.map(function (x) { return x; }) : request.fullPath.split('.');
    };
    FieldListDataSourcesHelper.prototype._getItemsFromCache = function (currentRequest) {
        var items = this._innerCache[currentRequest.fullPath];
        var closestCachedPath = this._getPathPartsFromRequest(currentRequest);
        while (!items && closestCachedPath.length > 1) {
            closestCachedPath.pop();
            items = this._innerCache[closestCachedPath.join('.')];
        }
        var currentPath = this._getPathPartsFromRequest(currentRequest);
        currentPath = currentPath.splice(closestCachedPath.length, currentPath.length);
        return this._findItems(items, currentPath);
    };
    FieldListDataSourcesHelper.prototype.wrapFieldsCallback = function (fieldsCallback, state) {
        var _this = this;
        var cache = this._fieldListCache;
        var dataSources = this.fieldListDataSources;
        return function (request) {
            if (cache) {
                var items = _this._getItemsFromCache(request);
                if (items)
                    return $.Deferred().resolve(items).promise();
                var newRequest = _this._wrapRequest(request);
                _this._cacheIsClearNotificicator();
                if (cache[newRequest.fullPath]) {
                    var $deferred = $.Deferred();
                    cache[newRequest.fullPath].done(function (result) {
                        if (!Array.isArray(result))
                            $deferred.resolve(result);
                        else
                            $deferred.resolve(_this._getItemsFromCache(request));
                    });
                    return $deferred.promise();
                }
                patchRequest(newRequest, dataSources.peek(), state());
                if (newRequest['dataSource']) {
                    var $deferred = $.Deferred();
                    cache[newRequest.fullPath] = fieldsCallback(newRequest).done(function (result) {
                        if (Array.isArray(result)) {
                            _this._innerCache[newRequest.fullPath] = result;
                            _this._updateInnerCache(newRequest, newRequest.fullPath, result);
                            $deferred.resolve(_this._getItemsFromCache(request));
                        }
                        else {
                            $deferred.resolve(result);
                        }
                    });
                    return $deferred.promise();
                }
                cache[newRequest.fullPath] = undefined;
                return $.Deferred().reject().promise();
            }
            else {
                patchRequest(request, dataSources.peek(), state());
                return request.dataSource ? fieldsCallback(request) : $.Deferred().reject().promise();
            }
        };
    };
    FieldListDataSourcesHelper.prototype._subscribeDataSources = function (usedDataSources, model) {
        var _this = this;
        this._usedDataSourceSubscription = usedDataSources.subscribe(function (args) {
            var changeSet = args[0];
            var dataSource = changeSet.value;
            if (changeSet.status === 'added') {
                _this._subscribeDataSource(dataSource);
                model.components.push(new components_1.ComponentsModel(dataSource, _this._renameDataSourceStrategy));
                _this.fieldListDataSources.splice(changeSet.index, 0, dataSource);
            }
            else {
                if (dataSource.data && dataSource.data.base64) {
                    _this._dataSourceSubscriptions[changeSet.index].dispose();
                    _this._dataSourceSubscriptions.splice(changeSet.index, 1);
                }
                model.components.splice(changeSet.index, 1);
                _this.fieldListDataSources.splice(changeSet.index, 1);
                _this._clearDataSourceCache(dataSource.ref || dataSource.id);
            }
        }, null, 'arrayChange');
    };
    FieldListDataSourcesHelper.prototype.updateDataSources = function (dsHelper, model, parameters) {
        var _this = this;
        this._subscribeDataSources(dsHelper.usedDataSources, model);
        this._updateFieldListDataSources(dsHelper.usedDataSources(), parameters);
        this.dataSourceHelper(dsHelper);
        model.components([]);
        model.components(dsHelper.usedDataSources()
            .filter(function (item) { return item.specifics !== 'none'; })
            .map(function (item) { return new components_1.ComponentsModel(item, _this._renameDataSourceStrategy); }));
    };
    return FieldListDataSourcesHelper;
}());
exports.FieldListDataSourcesHelper = FieldListDataSourcesHelper;
