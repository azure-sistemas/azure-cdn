﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\previewParameter.js)
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
var parameterHelper_1 = require("./parameterHelper");
var previewParameterHelper_1 = require("./previewParameterHelper");
var multiValuesHelper_1 = require("./multiValuesHelper");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var array_store_1 = require("devextreme/data/array_store");
var ko = require("knockout");
var _groupEditor_1 = require("../widgets/_groupEditor");
var PreviewParameter = (function (_super) {
    __extends(PreviewParameter, _super);
    function PreviewParameter(parameterInfo, parameterHelper) {
        var _this = _super.call(this) || this;
        _this.hasSeparator = ko.observable(false);
        _this.hasVerticalLabel = ko.observable(false);
        _this.valueInfo = ko.observable();
        _this.lookUpValues = ko.observableArray();
        _this.valueStoreCache = null;
        _this.multiValueInfo = ko.observable();
        _this.intTypes = ['System.Int16', 'System.Int32', 'System.Int64'];
        _this.floatTypes = ['System.Single', 'System.Double', 'System.Decimal'];
        _this.isTypesCurrentType = function (types, type) { return types.indexOf(type) > -1; };
        _this.tag = parameterInfo.Tag;
        _this.type = parameterInfo.TypeName;
        _this.isRange = parameterInfo.Value && parameterInfo.Value.Start !== undefined && parameterInfo.Value.End !== undefined;
        _this.path = parameterInfo.Path;
        _this.visible = ko.observable(parameterInfo.Visible);
        _this.enabled = ko.observable(parameterInfo.Enabled);
        _this.isFilteredLookUpSettings = parameterInfo.IsFilteredLookUpSettings;
        _this.hasBindedExpressions = !!(parameterInfo.EnabledExpression || parameterInfo.VisibleExpression);
        _this.hasVisibleExpression = !!parameterInfo.VisibleExpression;
        _this._originalLookUpValues = parameterInfo.LookUpValues ? parameterHelper.mapLookUpValues(_this.type, parameterInfo.LookUpValues || []) : null;
        _this.lookUpValues(_this._originalLookUpValues);
        _this.lookUpValues.subscribe(function () { _this.valueStoreCache = null; });
        _this.isMultiValue = parameterInfo.MultiValue;
        _this.selectAllValues = parameterInfo.SelectAllValues;
        _this.allowNull = parameterInfo.AllowNull;
        _this.isMultiValueWithLookUp = _this.isMultiValue && !!_this.lookUpValues();
        _this._originalValue = parameterInfo.Value;
        if (parameterInfo.ValueInfo && _this.isTypesCurrentType(_this.intTypes.concat(_this.floatTypes), _this.type) && !_this.isMultiValueWithLookUp) {
            _this._originalValue = parameterInfo.ValueInfo;
        }
        _this.getParameterDescriptor = function () {
            return {
                description: parameterInfo.Description,
                displayName: parameterInfo.Description || parameterInfo.Name,
                name: parameterInfo.Name,
                tag: parameterInfo.Tag,
                type: parameterInfo.TypeName,
                value: _this._originalValue,
                multiValue: parameterInfo.MultiValue,
                selectAllValues: parameterInfo.SelectAllValues,
                allowNull: parameterInfo.AllowNull,
                hasLookUpValues: !!_this.lookUpValues() || parameterHelper.isEnumType(_this),
                visible: parameterInfo.Visible,
                enabled: parameterInfo.Enabled
            };
        };
        _this._disposables.push(ko.computed(function () {
            var info = parameterHelper.getParameterInfo(_this);
            info.propertyName = previewParameterHelper_1.PreviewParameterHelper.getPrivatePropertyName(parameterInfo.Path);
            info.editor.editorType = info.editor.editorType || _groupEditor_1.ParametersEditor;
            info.editorOptions.hasSeparator = _this.hasSeparator();
            info.editorOptions.hasVerticalLabel = _this.hasVerticalLabel();
            _this.valueInfo(info);
        }));
        _this.initialize(_this._originalValue, parameterHelper);
        return _this;
    }
    PreviewParameter._compareValues = function (value1, value2) {
        if (value1 instanceof Date && value2 instanceof Date) {
            return value1 - value2 === 0;
        }
        return value1 === value2;
    };
    PreviewParameter.prototype.safeAssignObservable = function (name, value) {
        if (this[name]) {
            if (PreviewParameter._compareValues(this[name](), value()))
                this[name](null);
            this[name](value());
        }
        else {
            this[name] = value;
        }
    };
    PreviewParameter.prototype.initialize = function (value, parameterHelper) {
        var _this = this;
        var resultValue;
        if (this.isMultiValueWithLookUp) {
            this.safeAssignObservable('_value', ko.observableArray((value || []).map(function (arrayItem) {
                return parameterHelper.getValueConverter(_this.type)(arrayItem);
            })));
            var multiValuesHelper = new multiValuesHelper_1.MultiValuesHelper(this._value, this.lookUpValues(), this.selectAllValues);
            var newItems;
            if (parameterHelper.customizeParameterLookUpSource)
                newItems = parameterHelper.customizeParameterLookUpSource(this.getParameterDescriptor(), multiValuesHelper.dataSource);
            if (newItems) {
                multiValuesHelper.dataSource = newItems;
            }
            else {
                var store = new array_store_1.default({
                    data: multiValuesHelper.dataSource,
                    key: 'value',
                });
                multiValuesHelper.dataSource = parameterHelper_1.ParameterHelper.createDefaultDataSource(store);
            }
            resultValue = ko.observable(multiValuesHelper);
        }
        else if (this.isMultiValue) {
            resultValue = value ? parameterHelper.createMultiValueArray(value, this) : ko.observableArray();
        }
        else if (this.allowNull && !value && value !== false) {
            resultValue = ko.observable(null);
        }
        else if (this.isRange) {
            var converter = parameterHelper.getValueConverter(this.type);
            resultValue = ko.observableArray([this._originalValue.Start, this._originalValue.End].map(function (x) { return ko.unwrap(converter(x)); }));
        }
        else {
            resultValue = ko.observable(parameterHelper.getValueConverter(this.type)(value));
        }
        this.safeAssignObservable('value', resultValue);
    };
    return PreviewParameter;
}(analytics_utils_1.Disposable));
exports.PreviewParameter = PreviewParameter;
