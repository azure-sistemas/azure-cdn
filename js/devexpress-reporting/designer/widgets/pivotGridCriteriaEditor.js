﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\pivotGridCriteriaEditor.js)
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
var parameter_1 = require("../dataObjects/parameters/parameter");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var PivotGridCriteriaEditor = (function (_super) {
    __extends(PivotGridCriteriaEditor, _super);
    function PivotGridCriteriaEditor(info, level, parentDisabled, textToSearch) {
        return _super.call(this, info, level, parentDisabled, textToSearch) || this;
    }
    PivotGridCriteriaEditor.prototype._createItemsProvider = function (fieldListProvider) {
        var _this = this;
        return {
            getItems: function (pathRequest) {
                var model = _this._model.peek();
                if (!model || pathRequest.fullPath.indexOf(parameter_1.Parameter.ParametersRefString) === 0)
                    return $.Deferred().resolve().promise();
                var pivot = model['parent'];
                var result = $.Deferred();
                var fullPath = new analytics_utils_1.PathRequest(analytics_internal_1.getFullPath(pivot.getPath(''), pivot.dataMember()));
                ko.unwrap(fieldListProvider).getItems(fullPath).done(function (dataSourceItems) {
                    var items = [], fields = pivot.fields();
                    for (var i = 0; i < fields.length; i++) {
                        var field = fields[i];
                        if (field.area() === 'DataArea') {
                            continue;
                        }
                        var dataMemberInfo = dataSourceItems.filter(function (item) { return item.name === field.fieldName(); })[0];
                        items.push({
                            displayName: field.getDisplayName(),
                            isList: false,
                            name: field.name(),
                            specifics: dataMemberInfo && dataMemberInfo.specifics.toLowerCase() || 'integer'
                        });
                    }
                    result.resolve(items);
                });
                return result.promise();
            }
        };
    };
    PivotGridCriteriaEditor.prototype._getFieldName = function (name, isRealName) {
        if (isRealName === void 0) { isRealName = false; }
        var model = this._model.peek();
        if (!model)
            return $.Deferred().resolve().promise();
        var pivot = model['parent'];
        var field = analytics_internal_1.find(pivot.fields.peek(), function (f) { return (isRealName ? (f.getDisplayName() || name) : f.name()) === name; });
        var def = $.Deferred();
        if (!field)
            def.reject();
        else
            def.resolve(isRealName ? field.name() : field.getDisplayName());
        return def.promise();
    };
    PivotGridCriteriaEditor.prototype._createDisplayNameProvider = function () {
        var _this = this;
        return {
            getDisplayNameByPath: function (path, name) {
                return _this._getFieldName(name);
            },
            getRealName: function (path, name) {
                return _this._getFieldName(name, true);
            }
        };
    };
    PivotGridCriteriaEditor.prototype.wrapModel = function (fieldListProvider) {
        if (!this.itemsProvider) {
            this.itemsProvider = this._createItemsProvider(fieldListProvider);
            this.displayNameProvider = this._createDisplayNameProvider();
        }
        return this;
    };
    return PivotGridCriteriaEditor;
}(analytics_widgets_1.Editor));
exports.PivotGridCriteriaEditor = PivotGridCriteriaEditor;
