﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\parameterHelper.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var editorTemplates_1 = require("../widgets/editorTemplates");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var array_store_1 = require("devextreme/data/array_store");
var analytics_internal_2 = require("@devexpress/analytics-core/analytics-internal");
var data_source_1 = require("devextreme/data/data_source");
function getEditorType(typeString) {
    if (typeString === 'multiValueWithLookUp') {
        return editorTemplates_1.viewerEditorTemplates.multiValue;
    }
    if (typeString === 'multiValue') {
        return editorTemplates_1.viewerEditorTemplates.multiValueEditable;
    }
    if (typeString === 'Enum') {
        return editorTemplates_1.viewerEditorTemplates.selectBox;
    }
    return undefined;
}
exports.getEditorType = getEditorType;
var ParameterHelper = (function () {
    function ParameterHelper() {
        this._customizeParameterEditors = ko.observable();
        this.getUnspecifiedDisplayText = function () { return analytics_utils_1.getLocalization('(none)', 'PreviewStringId.NoneString'); };
    }
    ParameterHelper.prototype._isKnownEnumType = function (type) {
        return !!this._knownEnums && this._knownEnums.some(function (knownEnumType) { return knownEnumType.enumType === type; });
    };
    ParameterHelper.getSerializationValue = function (value, dateConverter) {
        if (value instanceof Array) {
            return value.map(function (item) {
                var itemValue = ko.isObservable(item.value) ? item.value() : item;
                return (itemValue instanceof Date) ? dateConverter(itemValue) : itemValue;
            });
        }
        return (value instanceof Date) ? dateConverter(value) : value;
    };
    ParameterHelper.createDefaultDataSource = function (store) {
        return new data_source_1.default({
            store: store,
            paginate: true,
            pageSize: 100
        });
    };
    ParameterHelper.prototype.initialize = function (knownEnums, callbacks) {
        if (arguments.length > 0) {
            this._knownEnums = knownEnums;
            if (callbacks) {
                callbacks.customizeParameterEditors && this._customizeParameterEditors(callbacks.customizeParameterEditors);
                callbacks.customizeParameterLookUpSource && (this.customizeParameterLookUpSource = callbacks.customizeParameterLookUpSource);
            }
        }
    };
    ParameterHelper.prototype.createInfo = function (parameter) {
        var parameterDescriptor = parameter.getParameterDescriptor();
        var typeString = this.isEnumType(parameter) ? 'Enum' : ko.unwrap(parameterDescriptor.type);
        var editorType = getEditorType(typeString);
        var info = {
            propertyName: 'value',
            displayName: parameterDescriptor['displayName'],
            localizationId: parameterDescriptor['localizationId'],
            editor: editorType || analytics_internal_2.getEditorType(typeString),
            editorOptions: {}
        };
        if (parameterDescriptor.type === 'System.Guid') {
            info.editorOptions.isNullable = parameterDescriptor.allowNull;
        }
        this.assignValueStore(info, parameter);
        return info;
    };
    ParameterHelper.prototype.addShowCleanButton = function (info, parameter) {
        var _this = this;
        info.editorOptions.showClearButton = parameter.allowNull;
        info.editorOptions.placeholder = ko.computed(function () {
            if (ko.unwrap(parameter.allowNull))
                return _this.getUnspecifiedDisplayText();
            return ko.unwrap(parameter.isMultiValue) ? analytics_internal_1.selectPlaceholder() : '';
        });
    };
    ParameterHelper.prototype.assignValueStore = function (info, parameter) {
        var items = this.getEnumCollection(parameter);
        info['valueStore'] = this.getItemsSource(parameter.getParameterDescriptor(), items, true);
    };
    ParameterHelper.prototype.createMultiValue = function (parameter, value) {
        var newValue = ko.observable();
        if (value !== null && value !== void 0) {
            newValue(value);
        }
        return { value: newValue, getInfo: function () { return [parameter.multiValueInfo()]; } };
    };
    ParameterHelper.prototype.createMultiValueArray = function (fromArray, parameter, convertSingleValue) {
        var _this = this;
        var converter = convertSingleValue ? convertSingleValue : this.getValueConverter(ko.unwrap(parameter.type));
        return ko.observableArray(fromArray.map(function (item) {
            return _this.createMultiValue(parameter, converter(item));
        }));
    };
    ParameterHelper.prototype.isEnumType = function (parameter) {
        return this._isKnownEnumType(ko.unwrap(parameter.type));
    };
    ParameterHelper.prototype.getItemsSource = function (parameterDescriptor, items, sort) {
        if (items) {
            var newItems;
            if (this.customizeParameterLookUpSource)
                newItems = this.customizeParameterLookUpSource(parameterDescriptor, items.slice(0));
            return newItems ? newItems : ParameterHelper.createDefaultDataSource(sort ? new analytics_internal_1.SortedArrayStore(items, 'displayValue') : new array_store_1.default(items));
        }
        return items;
    };
    ParameterHelper.prototype.getEnumCollection = function (parameter) {
        var type = ko.unwrap(parameter.type);
        if (this._isKnownEnumType(type)) {
            var currentKnownEnumInfo = this._knownEnums.filter(function (knownEnumType) { return knownEnumType.enumType === type; })[0];
            if (currentKnownEnumInfo && currentKnownEnumInfo.values && currentKnownEnumInfo.values.length !== 0) {
                return currentKnownEnumInfo.values.map(function (val) { return { value: val.value, displayValue: val.displayName }; });
            }
        }
    };
    ParameterHelper.prototype.getParameterInfo = function (parameter) {
        var _this = this;
        var valueInfo = this.createInfo(parameter);
        parameter.multiValueInfo($.extend(true, {}, valueInfo, { propertyName: 'value' }));
        if (parameter.allowNull !== undefined) {
            this.addShowCleanButton(valueInfo, parameter);
        }
        if (ko.unwrap(parameter.isMultiValue)) {
            valueInfo.editor = getEditorType(parameter['isMultiValueWithLookUp'] ? 'multiValueWithLookUp' : 'multiValue');
            valueInfo['addHandler'] = function () { return _this.createMultiValue(parameter); };
        }
        valueInfo.editor.custom = valueInfo.editor.custom || 'dxrd-parameters-property-editor';
        if (this._customizeParameterEditors()) {
            this._customizeParameterEditors()(parameter.getParameterDescriptor(), valueInfo);
        }
        return valueInfo;
    };
    ParameterHelper.prototype.getValueConverter = function (type) {
        return (function (val) { return val; });
    };
    return ParameterHelper;
}());
exports.ParameterHelper = ParameterHelper;
