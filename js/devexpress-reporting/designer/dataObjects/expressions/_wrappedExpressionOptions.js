﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\expressions\_wrappedExpressionOptions.js)
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
var _createIDataMemberInfoByName_1 = require("../../internal/_createIDataMemberInfoByName");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_criteria_1 = require("@devexpress/analytics-core/analytics-criteria");
var WrappedExpressionOptions = (function (_super) {
    __extends(WrappedExpressionOptions, _super);
    function WrappedExpressionOptions(options, handlers, fieldListProvider, eventName) {
        var _this = _super.call(this) || this;
        _this.eventName = eventName;
        _this.isValid = ko.observable(true);
        _this.warningMessage = ko.observable('');
        _this.expression = ko.observable(null);
        _this.rootItems = [
            { name: 'Parameters', needPrefix: true },
            { name: 'ReportItems', needPrefix: false, rootPath: 'Root' },
            { name: 'DataSource', needPrefix: false, rootPath: 'Root' }
        ];
        if (handlers) {
            _this._disposables.push(_this.value = ko.computed({
                read: function () {
                    return _this.expression() && _this.expression().expression() || '';
                },
                write: function (newVal) {
                    if (_this.expression()) {
                        if (newVal && newVal.trim()) {
                            _this.expression().expression(newVal);
                        }
                        else {
                            handlers.removeExpression(_this.expression());
                        }
                    }
                    else {
                        if (newVal && newVal.trim())
                            handlers.addExpression(newVal);
                    }
                }
            }));
        }
        else {
            _this.value = options.value;
        }
        _this.path = options.path;
        _this.functions = options.functions;
        _this.customizeCategories = options.customizeCategories;
        var specificRootItems = {
            'DataSource': function (path) {
                return path === 'DataSource' && ['CurrentRowIndex', 'RowCount', 'CurrentRowHierarchyLevel'].map(function (name) { return _createIDataMemberInfoByName_1.createIDataMemberInfoByName(name, 'integer'); });
            }
        };
        if (_this.eventName === 'PrintOnPage') {
            _this.rootItems.push({ name: 'Arguments', needPrefix: false, rootPath: 'Root' });
            specificRootItems['Arguments'] = function (path) {
                return path === 'Arguments' && ['PageIndex', 'PageCount'].map(function (name) { return _createIDataMemberInfoByName_1.createIDataMemberInfoByName(name, 'integer'); });
            };
        }
        _this._disposables.push(ko.computed(function () {
            var unwrappedfieldListProvider = ko.unwrap(fieldListProvider);
            try {
                _this.isValid(true);
                _this.warningMessage('');
                if (!_this.value())
                    return;
                analytics_criteria_1.CriteriaOperator.parse(_this.value());
                if (unwrappedfieldListProvider) {
                    analytics_internal_1.validateExpression({
                        fieldListProvider: {
                            getItemByPath: function (path) {
                                return unwrappedfieldListProvider.getItemByPath(path, specificRootItems);
                            },
                            getItems: function () { return void 0; }
                        },
                        expression: _this.value(),
                        path: _this.path(),
                        rootItems: _this.rootItems.map(function (x) { return x.name; }),
                    }).done(function (result) { return _this.warningMessage(result); }).fail(function () { return _this.isValid(false); });
                }
            }
            catch (_a) {
                _this.isValid(false);
            }
        }));
        return _this;
    }
    WrappedExpressionOptions.prototype.onHiding = function (e) { };
    WrappedExpressionOptions.prototype.onShowing = function (e) { };
    return WrappedExpressionOptions;
}(analytics_utils_1.Disposable));
exports.WrappedExpressionOptions = WrappedExpressionOptions;
