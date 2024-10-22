﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\parameterTypesHelper.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var ParameterTypesHelper = (function () {
    function ParameterTypesHelper() {
    }
    ParameterTypesHelper.prototype._getTypeInfo = function (typeName) {
        var values = ParameterTypesHelper.typeValues.filter(function (type) { return type.value === typeName; });
        return values.length > 0 ? values[0] : null;
    };
    ParameterTypesHelper.prototype._tryConvertValue = function (value, typeName) {
        var condition = function (val) { return val !== void 0 && val !== null && !isNaN(typeof val === 'string' ? '' : val); };
        if (!condition(value)) {
            return { isValid: false, newValue: null };
        }
        var typeValue = this._getTypeInfo(typeName), newValue = (typeValue && typeValue.valueConverter) ? typeValue.valueConverter(value, this.getDefaultValue(typeName)) : value;
        return { isValid: condition(newValue), newValue: newValue };
    };
    ParameterTypesHelper.prototype.convertSingleValue = function (value, typeName) {
        var result = this._tryConvertValue(value, typeName);
        return result.isValid ? result.newValue : this.getDefaultValue(typeName);
    };
    ParameterTypesHelper.prototype.getSpecifics = function (typeName) {
        var typeValue = this._getTypeInfo(typeName);
        return typeValue ? typeValue.specifics : 'default';
    };
    ParameterTypesHelper.prototype.getIcon = function (typeName) {
        var typeValue = this._getTypeInfo(typeName);
        return typeValue && typeValue.icon;
    };
    ParameterTypesHelper.prototype.getDefaultValue = function (typeName) {
        var typeValue = this._getTypeInfo(typeName);
        var _value = typeValue ? typeValue.defaultValue : '';
        if (_value instanceof Date) {
            _value = new Date(_value);
        }
        return _value;
    };
    ParameterTypesHelper.defaultGuidValue = '00000000-0000-0000-0000-000000000000';
    ParameterTypesHelper.typeValues = [
        { value: 'System.String', displayValue: 'String', defaultValue: '', specifics: 'String', valueConverter: function (val) { return val.toString(); }, localizationId: 'UtilsUIStringId.Parameter_Type_String' },
        { value: 'System.DateTime', displayValue: 'Date', defaultValue: new Date(new Date().setHours(0, 0, 0, 0)), specifics: 'Date', valueConverter: function (val) { return analytics_internal_1.parseDate(val); }, localizationId: 'UtilsUIStringId.Parameter_Type_DateTime' },
        { value: 'System.Int16', displayValue: 'Number (16 bit integer)', defaultValue: '0', specifics: 'Integer', valueConverter: function (val, defaultValue) { return analytics_internal_1.integerValueConverter(val, defaultValue, 'System.Int16'); }, localizationId: 'UtilsUIStringId.Parameter_Type_Int16' },
        { value: 'System.Int32', displayValue: 'Number (32 bit integer)', defaultValue: '0', specifics: 'Integer', valueConverter: function (val, defaultValue) { return analytics_internal_1.integerValueConverter(val, defaultValue, 'System.Int32'); }, localizationId: 'UtilsUIStringId.Parameter_Type_Int32' },
        { value: 'System.Int64', displayValue: 'Number (64 bit integer)', defaultValue: '0', specifics: 'Integer', valueConverter: function (val, defaultValue) { return analytics_internal_1.integerValueConverter(val, defaultValue, 'System.Int64'); }, localizationId: 'UtilsUIStringId.Parameter_Type_Int64' },
        { value: 'System.Single', displayValue: 'Number (floating-point)', defaultValue: '0', specifics: 'Float', valueConverter: function (val, defaultValue) { return analytics_internal_1.floatValueConverter(val, defaultValue, 'System.Single'); }, localizationId: 'UtilsUIStringId.Parameter_Type_Float' },
        { value: 'System.Double', displayValue: 'Number (double-precision floating-point)', defaultValue: '0', specifics: 'Float', valueConverter: function (val, defaultValue) { return analytics_internal_1.floatValueConverter(val, defaultValue, 'System.Double'); }, localizationId: 'UtilsUIStringId.Parameter_Type_Double' },
        { value: 'System.Decimal', displayValue: 'Number (decimal)', defaultValue: '0', specifics: 'Float', valueConverter: function (val, defaultValue) { return analytics_internal_1.floatValueConverter(val, defaultValue, 'System.Decimal'); }, localizationId: 'UtilsUIStringId.Parameter_Type_Decimal' },
        { value: 'System.Boolean', displayValue: 'Boolean', defaultValue: false, specifics: 'Bool', valueConverter: function (val) { return String(val).toLowerCase() === 'true' ? true : (String(val).toLowerCase() === 'false' ? false : null); }, localizationId: 'UtilsUIStringId.Parameter_Type_Boolean' },
        { value: 'System.Guid', displayValue: 'Guid', defaultValue: ParameterTypesHelper.defaultGuidValue, valueConverter: function (val) { return analytics_widgets_internal_1.validateGuid(val) ? val : ParameterTypesHelper.defaultGuidValue; }, specifics: 'guid', localizationId: 'UtilsUIStringId.Parameter_Type_Guid' }
    ];
    return ParameterTypesHelper;
}());
exports.ParameterTypesHelper = ParameterTypesHelper;
