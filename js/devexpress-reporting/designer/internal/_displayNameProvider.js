﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_displayNameProvider.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var DisplayNameProvider = (function () {
    function DisplayNameProvider(_fieldsProvider, _dataSourceHelper, _rootDS) {
        this._fieldsProvider = _fieldsProvider;
        this._dataSourceHelper = _dataSourceHelper;
        this._rootDS = _rootDS;
        this._requests = {};
        this._fieldsProvider = _fieldsProvider;
        this._dataSourceHelper = _dataSourceHelper;
        this._rootDS = _rootDS;
    }
    DisplayNameProvider.prototype._getRequest = function (path) {
        var _this = this;
        if (!this._requests[path]) {
            var pathRequest = new analytics_utils_1.PathRequest(path);
            this._requests[path] = ko.pureComputed(function () { return _this._fieldsProvider.getItems(pathRequest); });
        }
        return this._requests[path];
    };
    DisplayNameProvider.prototype._ignoreDisplayNameRequest = function (propertyName) {
        if (propertyName.indexOf('ReportItems') === 0)
            return true;
        return false;
    };
    DisplayNameProvider.prototype._getDisplayNameRequest = function (path, fieldName) {
        var _this = this;
        var def = $.Deferred();
        this._getRequest(path)().done(function (data) {
            var displayName = _this._getFieldDisplayName(data, fieldName);
            if (!displayName)
                def.reject();
            else
                def.resolve(displayName);
        }).fail(function () {
            def.reject();
        });
        return def.promise();
    };
    DisplayNameProvider.prototype._createRequestInfo = function (dataSource, path, dataMember, dataMemberOffset, includeDataSourceName) {
        if (!dataMember)
            return null;
        var dataSourceName = null;
        if (!path) {
            var ds = (dataSource || this._rootDS());
            var dsInfo = ds && this._dataSourceHelper.findDataSourceInfo(ds);
            if (!dsInfo)
                return null;
            path = (dsInfo.ref || dsInfo.id);
            if (includeDataSourceName)
                dataSourceName = dsInfo.name;
        }
        var offset = analytics_internal_1.getFullPath(path, dataMemberOffset);
        return {
            fullPath: offset + '.' + dataMember,
            offset: offset,
            dataMember: dataMember,
            dataMemberParts: dataMember.split('.'),
            dataSourceName: dataSourceName
        };
    };
    DisplayNameProvider.prototype._getFieldDisplayName = function (fields, fieldName) {
        if (!fields)
            return null;
        var field = analytics_internal_1.findFirstItemMatchesCondition(fields, function (field) { return field.name === fieldName; });
        return field ? field.displayName : null;
    };
    DisplayNameProvider.prototype._getDisplayName = function (request) {
        var def = $.Deferred();
        if (!request) {
            def.reject();
            return def.promise();
        }
        var fieldsRequests = [];
        for (var i = -1, path = request.offset; i < request.dataMemberParts.length - 1;) {
            fieldsRequests.push(this._getDisplayNameRequest(path, request.dataMemberParts[i + 1]));
            path += '.' + request.dataMemberParts[++i];
        }
        $.when.apply($, fieldsRequests).done(function () {
            var result = request.dataSourceName ? (request.dataSourceName + ' - ') : '';
            for (var i = 0; i < arguments.length; i++) {
                result += arguments[i];
                if (i < arguments.length - 1)
                    result += '.';
            }
            def.resolve(result);
        }).fail(function () { return def.reject(); });
        return def.promise();
    };
    DisplayNameProvider.prototype._getRealName = function (request) {
        if (!request)
            return $.Deferred().reject().promise();
        return this._getRealNameRequest(request.offset, request.dataMember);
    };
    DisplayNameProvider.prototype._getRealNameRequest = function (path, dataMember) {
        var _this = this;
        var def = $.Deferred();
        this._getRequest(path)()
            .done(function (items) {
            var targetItem = items.filter(function (item) { return dataMember.indexOf(item.displayName + '.') === 0 || dataMember === item.displayName; })[0];
            if (targetItem) {
                dataMember === targetItem.displayName ? def.resolve(targetItem.name) :
                    _this._getRealNameRequest(path + '.' + targetItem.name, dataMember.substring(targetItem.displayName.length + 1))
                        .done(function (data) {
                        def.resolve(targetItem.name + '.' + data);
                    })
                        .fail(function () {
                        def.reject();
                    });
            }
            else {
                def.reject();
            }
        })
            .fail(function () {
            def.reject();
        });
        return def.promise();
    };
    DisplayNameProvider.prototype.getDisplayName = function (dataSource, dataMember, dataMemberOffset, includeDataSourceName) {
        if (dataMemberOffset === void 0) { dataMemberOffset = ''; }
        if (includeDataSourceName === void 0) { includeDataSourceName = true; }
        var request = this._createRequestInfo(dataSource, null, dataMember, dataMemberOffset, includeDataSourceName);
        return this._getDisplayName(request);
    };
    DisplayNameProvider.prototype.getDisplayNameByPath = function (path, dataMember) {
        var _this = this;
        if (this._ignoreDisplayNameRequest(dataMember))
            return $.Deferred().resolve(dataMember).promise();
        return this._getByPath(path, dataMember, function (x) { return _this._getDisplayName(x); });
    };
    DisplayNameProvider.prototype.getRealName = function (path, dataMember) {
        var _this = this;
        return this._getByPath(path, dataMember, function (x) { return _this._getRealName(x); });
    };
    DisplayNameProvider.prototype._getByPath = function (path, dataMember, getNameFunc) {
        var _this = this;
        path = path || '';
        var request = this._createRequestInfo(null, path, dataMember, '', false);
        var pathParts = path.split('.');
        if (pathParts.length === 1) {
            return getNameFunc(request);
        }
        else {
            var result = $.Deferred();
            getNameFunc(request).done(function (x) {
                result.resolve(x);
            }).fail(function (x) {
                request = _this._createRequestInfo(null, pathParts[0], dataMember, '', false);
                getNameFunc(request).done(function (x) {
                    result.resolve(x);
                }).fail(function (x) { return result.reject(); });
            });
            return result.promise();
        }
    };
    DisplayNameProvider.prototype.dispose = function () {
        var _this = this;
        Object.keys(this._requests).forEach(function (key) {
            _this._requests[key].dispose();
            delete _this._requests[key];
        });
    };
    return DisplayNameProvider;
}());
exports.DisplayNameProvider = DisplayNameProvider;
