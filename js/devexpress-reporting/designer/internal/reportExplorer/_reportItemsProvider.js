﻿/**
* DevExpress HTML/JS Reporting (designer\internal\reportExplorer\_reportItemsProvider.js)
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
var xrReport_1 = require("../../controls/xrReport");
var _createIDataMemberInfoByName_1 = require("../_createIDataMemberInfoByName");
var calculatedField_1 = require("../../dataObjects/calculatedField");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var $ = require("jquery");
var ReportItemsProvider = (function (_super) {
    __extends(ReportItemsProvider, _super);
    function ReportItemsProvider(controlsHelper, fieldListProvider) {
        var _this = _super.call(this) || this;
        _this._rootItems = {
            'ReportItems': function (path, controlsHelper) {
                return _this.getReportElementsByPath(controlsHelper, path.split('.'));
            }
        };
        _this.getItems = function (path, rootItems) {
            var rootItems = $.extend({}, _this._rootItems, rootItems);
            var getItemsFunc = undefined;
            Object.keys(rootItems).some(function (currentName) {
                var rootItem = { propertyName: currentName, getItems: rootItems[currentName] };
                getItemsFunc = _this._tryGenerateGetItemsFunc(rootItem, path.path) || _this._tryGenerateGetItemsFunc(rootItem, path.fullPath);
                return !!getItemsFunc;
            });
            if (getItemsFunc) {
                var $deferred = $.Deferred();
                var items = getItemsFunc(controlsHelper);
                items && $deferred.resolve(items) || $deferred.reject();
                return $deferred.promise();
            }
            else if (path.fullPath === 'Root') {
                var $deferred = $.Deferred();
                var result = Object.keys(rootItems).map(function (name) { return _createIDataMemberInfoByName_1.createIDataMemberInfoByName(name); });
                $deferred.resolve(result);
                return $deferred.promise();
            }
            else {
                return fieldListProvider.getItems(path);
            }
        };
        _this.getItemByPath = function (pathRequest, rootItems) {
            var parts = pathRequest.fullPath.split('.');
            var propertyName = parts.pop();
            return _this._getItemByPath(parts, rootItems, propertyName);
        };
        return _this;
    }
    ReportItemsProvider.prototype._getControlByName = function (controlsHelper, name) {
        if (name === 'Report') {
            return controlsHelper.allControls().filter(function (x) { return x instanceof xrReport_1.ReportViewModel; })[0];
        }
        return controlsHelper.allControls().filter(function (x) { return controlsHelper.getNameProperty(x)() === name; })[0];
    };
    ReportItemsProvider.prototype._getProperties = function (targetInfo, propertyName) {
        return targetInfo.filter(function (x) { return x.modelName === '@' + propertyName || x.modelName === propertyName; })[0];
    };
    ReportItemsProvider.prototype._tryGenerateGetItemsFunc = function (rootItem, path) {
        if (path.indexOf(rootItem.propertyName) === 0) {
            return function (controlsHelper) { return rootItem.getItems(path, controlsHelper); };
        }
    };
    ReportItemsProvider.prototype.getReportElementsByPath = function (controlsHelper, path) {
        if (path.length === 1) {
            return controlsHelper.allControls().map(function (x) {
                var name = x instanceof xrReport_1.ReportViewModel ? 'Report' : controlsHelper.getNameProperty(x)();
                return _createIDataMemberInfoByName_1.createIDataMemberInfoByName(name);
            });
        }
        path = path.slice(1);
        var control = this._getControlByName(controlsHelper, path[0]);
        if (!control) {
            return null;
        }
        var info = control.getInfo();
        var controlsPath = path.slice(1);
        for (var i = 0; i < controlsPath.length; i++) {
            info = this._getProperties(info, controlsPath[i]);
            info = info && info.info;
        }
        if (info) {
            return info.filter(function (x) { return !!x.modelName && !x.array; }).map(function (x) {
                var name = x.modelName.indexOf('@') === 0 ? x.modelName.slice(1) : x.modelName;
                return _createIDataMemberInfoByName_1.createIDataMemberInfoByName(name, x.info ? 'list' : 'string');
            });
        }
        else {
            return null;
        }
    };
    ReportItemsProvider.prototype._getItemByPath = function (pathParts, rootItems, propertyName) {
        var _this = this;
        var $deferred = $.Deferred();
        var currentPropertyName = propertyName;
        if (pathParts.length === 0)
            return $deferred.reject().promise();
        var parentPathRequest = new analytics_utils_1.PathRequest(pathParts.join('.'));
        this.getItems(parentPathRequest, rootItems).done(function (items) {
            var isParameter = pathParts.length === 1 && pathParts[0] === 'Parameters';
            if (!isParameter && items.length === 0) {
                currentPropertyName = [pathParts.pop(), currentPropertyName].join('.');
                return _this._getItemByPath(pathParts, rootItems, currentPropertyName)
                    .done(function (item) { return $deferred.resolve(item); })
                    .fail(function () { return $deferred.reject(); });
            }
            var item = items.filter(function (x) { return x.name === currentPropertyName; })[0];
            if (item) {
                if (item instanceof calculatedField_1.CalculatedField && pathParts.length > 1) {
                    currentPropertyName = pathParts.pop();
                    _this._getItemByPath(pathParts, rootItems, currentPropertyName)
                        .done(function () { return $deferred.resolve(item); })
                        .fail(function () { return $deferred.reject(); });
                }
                else if (isParameter && item.isList) {
                    $deferred.reject();
                }
                else {
                    $deferred.resolve(item);
                }
            }
            else if (isParameter) {
                items.forEach(function (parameter) {
                    if (!parameter.isList)
                        return;
                    _this._getItemByPath(['Parameters', parameter.name], rootItems, currentPropertyName)
                        .done(function (innerParameter) { return $deferred.resolve(innerParameter); });
                });
                $deferred.state() !== 'resolved' && $deferred.reject();
            }
            else {
                $deferred.reject();
            }
        }).fail(function () { return $deferred.reject(); });
        return $deferred.promise();
    };
    return ReportItemsProvider;
}(analytics_utils_1.Disposable));
exports.ReportItemsProvider = ReportItemsProvider;
