﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\previewParameterHelper.js)
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
var editorTemplates_1 = require("../widgets/editorTemplates");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var $ = require("jquery");
var PreviewParameterHelper = (function (_super) {
    __extends(PreviewParameterHelper, _super);
    function PreviewParameterHelper(knownEnums, callbacks) {
        var _this = _super.call(this) || this;
        _this.callbacks = callbacks;
        _this.initialize(knownEnums, callbacks);
        return _this;
    }
    PreviewParameterHelper.prototype.mapLookUpValues = function (type, lookUpValues) {
        var converter = this.getValueConverter(type);
        return $.map(lookUpValues || [], function (lookUpValue) { return { value: converter(lookUpValue.Value), displayValue: lookUpValue.Description }; });
    };
    PreviewParameterHelper.fixPropertyName = function (propertyName) {
        return propertyName.replace(/\./g, '_');
    };
    PreviewParameterHelper.getPrivatePropertyName = function (propertyName) {
        return '_' + PreviewParameterHelper.fixPropertyName(propertyName);
    };
    PreviewParameterHelper.prototype.createInfo = function (parameter) {
        var info = _super.prototype.createInfo.call(this, parameter);
        info.propertyName = PreviewParameterHelper.getPrivatePropertyName(parameter.path);
        if (!parameter.isMultiValue && (parameter.lookUpValues() || this.isEnumType(parameter))) {
            info.editorOptions.searchEnabled = true;
            if (!parameter.allowNull)
                info.editorOptions.allowClearing = false;
        }
        if (parameter.isRange) {
            info.editor = this.getRangeEditor();
            return info;
        }
        if ((parameter.type === 'System.DateTime' || parameter.isTypesCurrentType(parameter.intTypes.concat(parameter.floatTypes), parameter.type)) && !parameter.allowNull && !parameter.isMultiValue && !parameter.isMultiValueWithLookUp) {
            info.validationRules = analytics_widgets_internal_1.requiredValidationRules;
        }
        else if (parameter.type === 'System.Guid') {
            info.editorOptions.displayCustomValue = false;
        }
        return info;
    };
    PreviewParameterHelper.prototype.assignValueStore = function (info, parameter) {
        var _helper = this;
        if (!parameter.isMultiValueWithLookUp) {
            Object.defineProperty(info, 'valueStore', {
                get: function () {
                    var items = [];
                    var needSorting = false;
                    if (parameter.isFilteredLookUpSettings || parameter.lookUpValues() && parameter.lookUpValues().length !== 0) {
                        items = parameter.lookUpValues();
                    }
                    else {
                        items = _helper.getEnumCollection(parameter);
                        needSorting = true;
                    }
                    if (parameter.valueStoreCache)
                        return parameter.valueStoreCache;
                    var itemsSource = _helper.getItemsSource(parameter.getParameterDescriptor(), items, needSorting);
                    if (itemsSource)
                        parameter.valueStoreCache = itemsSource;
                    return itemsSource;
                },
                set: function (values) {
                    parameter.lookUpValues(values);
                }
            });
        }
    };
    PreviewParameterHelper.prototype.isEnumType = function (parameter) {
        return parameter.isFilteredLookUpSettings || !!parameter.lookUpValues() || _super.prototype.isEnumType.call(this, parameter);
    };
    PreviewParameterHelper.prototype.getValueConverter = function (type) {
        if (type === 'System.DateTime') {
            return function (dateString) { return analytics_internal_1.parseDate(dateString); };
        }
        else if (['System.Int16', 'System.Int32', 'System.Int64'].indexOf(type) > -1) {
            return function (val) { return analytics_internal_1.integerValueConverter(val, '0'); };
        }
        else if (['System.Single', 'System.Double', 'System.Decimal'].indexOf(type) > -1) {
            return function (val) { return analytics_internal_1.floatValueConverter(val, '0'); };
        }
        return _super.prototype.getValueConverter.call(this, type);
    };
    PreviewParameterHelper.prototype.getRangeEditor = function () {
        return editorTemplates_1.viewerEditorTemplates.rangeEditor;
    };
    return PreviewParameterHelper;
}(parameterHelper_1.ParameterHelper));
exports.PreviewParameterHelper = PreviewParameterHelper;
