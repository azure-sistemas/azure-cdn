﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\valueSourceSettingsHelper.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _locker_1 = require("../../../common/utils/_locker");
var ko = require("knockout");
var ValueSourceSettingsHelper = (function () {
    function ValueSourceSettingsHelper(parameter) {
        this.parameter = parameter;
    }
    ValueSourceSettingsHelper.prototype._updateValueSourceSettingsType = function (valueSourceSettings) {
        if (valueSourceSettings === void 0) { valueSourceSettings = this.parameter.valueSourceSettings(); }
        if (valueSourceSettings) {
            if (valueSourceSettings.objectType().indexOf('StaticListLookUpSettings') !== -1) {
                this.parameter.valueSourceSettingsType('StaticListLookUpSettings');
            }
            else if (valueSourceSettings.objectType().indexOf('DynamicListLookUpSettings') !== -1) {
                this.parameter.valueSourceSettingsType('DynamicListLookUpSettings');
            }
            else {
                this.parameter.valueSourceSettingsType('RangeParametersSettings');
            }
        }
    };
    ValueSourceSettingsHelper.prototype._updateValueSourceSettings = function (valueSourceSettingsType) {
        var _this = this;
        var updateSettings = function (settings) {
            settings._isEditing(_this.parameter._isEditing());
            return settings;
        };
        if (valueSourceSettingsType === 'StaticListLookUpSettings') {
            this.parameter.valueSourceSettings(updateSettings(this.parameter.objectsStorage.createStaticLookUpSetting()));
        }
        else if (valueSourceSettingsType === 'DynamicListLookUpSettings') {
            this.parameter.valueSourceSettings(this.parameter.objectsStorage.createDynamicLookUpSetting());
        }
        else if (valueSourceSettingsType === 'RangeParametersSettings') {
            this.parameter.isMultiValue(false);
            this.parameter.allowNull(false);
            this.parameter.selectAllValues(false);
            var rangeSetting = this.parameter.objectsStorage.createRangeSetting();
            rangeSetting.initializeParameters(this.parameter);
            this.parameter.valueSourceSettings(updateSettings(rangeSetting));
        }
        else {
            this.parameter.objectsStorage.objects.remove(this.parameter.valueSourceSettings());
            this.parameter.valueSourceSettings(null);
        }
    };
    ValueSourceSettingsHelper.prototype.initializeParameterSettingsType = function () {
        var _this = this;
        var locker = new _locker_1.Locker();
        var valueSourceSettings = this.parameter.valueSourceSettings(), lookUpValues = valueSourceSettings && (valueSourceSettings instanceof lookupSettings_1.StaticListLookUpSettings) && valueSourceSettings.lookUpValues();
        if (lookUpValues) {
            lookUpValues.forEach(function (lookUpValue) {
                lookUpValue.valueInfo = _this.parameter.multiValueInfo;
                if (lookUpValue.isEmpty)
                    _this.initializeLookUpValue(lookUpValue);
            });
        }
        this._updateValueSourceSettingsType();
        this.parameter._disposables.push(this.parameter.valueSourceSettings.subscribe(function (settings) {
            locker.lock(function () { return _this._updateValueSourceSettingsType(settings); });
        }));
        this.parameter._disposables.push(this.parameter.valueSourceSettingsType.subscribe(function (newVal) {
            locker.lock(function () { return _this._updateValueSourceSettings(newVal); });
        }));
        if (valueSourceSettings instanceof rangeSettings_1.RangeParametersSettings) {
            valueSourceSettings.assingParameterInfo(this.parameter);
        }
    };
    ValueSourceSettingsHelper.prototype.initializeLookupValueSubscribe = function (report) {
        var _this = this;
        var self = this;
        this.parameter._disposables.push(ko.computed(function () {
            var valueSourceSettings = _this.parameter.valueSourceSettings();
            if (valueSourceSettings instanceof lookupSettings_1.LookUpSettings) {
                valueSourceSettings.updateFilter(_this.parameter, report);
                if (valueSourceSettings instanceof lookupSettings_1.StaticListLookUpSettings) {
                    _this.parameter._disposables.push(valueSourceSettings.lookUpValues.subscribe(function (changes) {
                        for (var index = 0; index < changes.length; index++) {
                            if (changes[index].status === 'added') {
                                self.initializeLookUpValue(changes[index].value);
                                changes[index].value.valueInfo = self.parameter.multiValueInfo;
                            }
                            else if (changes[index].status === 'deleted') {
                                self.parameter.objectsStorage.objects.remove(changes[index].value._value());
                            }
                        }
                    }, null, 'arrayChange'));
                }
            }
        }));
    };
    ValueSourceSettingsHelper.prototype.initializeLookUpValue = function (lookUpValue) {
        var newValue = this.parameter.objectsStorage.addValue();
        newValue.type(this.parameter.type());
        newValue.content(this.parameter.defaultValue);
        lookUpValue._value(newValue);
    };
    ValueSourceSettingsHelper.prototype.updateLookUpValues = function (newType, value) {
        if (value === void 0) { value = null; }
        var valueSourceSettings = this.parameter.valueSourceSettings(), lookUpValues = valueSourceSettings && (valueSourceSettings instanceof lookupSettings_1.StaticListLookUpSettings) && valueSourceSettings.lookUpValues();
        if (!valueSourceSettings || !lookUpValues)
            return;
        lookUpValues.forEach(function (lookUpValue) {
            var lookUpVal = lookUpValue._value();
            lookUpVal.content(value);
            !!newType && lookUpVal.type(newType);
        });
    };
    ValueSourceSettingsHelper.prototype.updateSettingValues = function (newType, value) {
        if (value === void 0) { value = null; }
        var valueSourceSettings = this.parameter.valueSourceSettings();
        if (valueSourceSettings && valueSourceSettings instanceof lookupSettings_1.StaticListLookUpSettings) {
            this.updateLookUpValues(newType, value);
            valueSourceSettings._isEditing(this.parameter._isEditing());
        }
        else if (valueSourceSettings instanceof rangeSettings_1.RangeParametersSettings) {
            valueSourceSettings.startParameter().value(value);
            valueSourceSettings.endParameter().value(value);
            valueSourceSettings._isEditing(this.parameter._isEditing());
        }
    };
    return ValueSourceSettingsHelper;
}());
exports.ValueSourceSettingsHelper = ValueSourceSettingsHelper;
var lookupSettings_1 = require("./lookupSettings");
var rangeSettings_1 = require("./rangeSettings");
