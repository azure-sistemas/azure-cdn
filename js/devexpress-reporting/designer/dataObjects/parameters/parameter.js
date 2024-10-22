﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\parameter.js)
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
var _localizationUtils_1 = require("../../controls/utils/_localizationUtils");
var parameterTypesHelper_1 = require("./parameterTypesHelper");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var parameterExpressionBinding_1 = require("./parameterExpressionBinding");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var EditableParameterMode = {
    _ignoreEditors: ['valueSourceSettings', 'valueSourceSettingsType'],
    _displayNamePatcher: {
        'isMultiValue': function (info) { return info.displayName = 'Allow Multiple Value'; },
        'allowNull': function (info) { return info.displayName = 'Allow Null Value'; },
        'valueSourceSettingsType': function (info) { return info.displayName = 'Value Source'; },
    }
};
var Parameter = (function (_super) {
    __extends(Parameter, _super);
    function Parameter(model, _report, serializer) {
        var _this = _super.call(this) || this;
        _this._report = _report;
        _this.templateName = 'dx-treelist-item';
        _this.actionProviders = [];
        _this._expressionActions = {};
        _this.expressionObj = {};
        _this.info = $.extend(true, [], parameter_1.parameterSerializationInfo);
        _this.propertyExpressionMapper = new propertyExpressionMapper_1.PropertyExpressionMapper();
        _this._isEditing = ko.observable(false);
        _this.collapsed = ko.observable(false);
        _this.valueSourceSettingsType = ko.observable('None');
        _this.valueInfo = ko.observable();
        _this.multiValueInfo = ko.observable();
        _this.parameterTypesHelper = new parameterTypesHelper_1.ParameterTypesHelper();
        _this.appendExpressionObjInfo(_this.info);
        _this.actionProviders.push({ getActions: function (name) { return _this._getExpressionActions(name); } });
        _this._disposables.push(_this._localizationProvider);
        var objectsStorage = _report.objectsStorageHelper;
        var parameterHelper = _report.parameterHelper;
        _this._preDeserialize(model);
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(_this, model);
        _this.valueSourceSettingsHelper = new valueSourceSettingsHelper_1.ValueSourceSettingsHelper(_this);
        _this.objectsStorage = objectsStorage;
        _this._parameterHelper = parameterHelper;
        _this['_name'] = ko.observable(_this.parameterName());
        _this['change'] = function (e, parameters) {
            if (parameters.filter(function (x) { return x.parameterName() === e.value; }).length === 1) {
                _this['_name'](e.value);
            }
            else {
                _this.parameterName(_this['_name']());
            }
        };
        if (!_this._type()) {
            _this._type(objectsStorage.getType('System.String'));
        }
        _this._processObsoleteProperties();
        _this.type = ko.pureComputed({
            read: function () {
                return _this._type().content();
            },
            write: function (val) {
                var oldVal = _this._type().content();
                if (val !== oldVal) {
                    var editorValue = _this.value();
                    if (_this.isMultiValue())
                        _this.value([]);
                    else
                        _this.value(null);
                    _this.valueSourceSettingsHelper.updateSettingValues(undefined, null);
                    setTimeout(function () {
                        _this._type(objectsStorage.getType(val));
                        if (_this.isMultiValue())
                            return;
                        if (val === 'System.DateTime') {
                            _this.value(_this.defaultValue);
                        }
                        else {
                            _this.value(_this.parameterTypesHelper.convertSingleValue(editorValue, _this.type()));
                        }
                        _this.valueSourceSettingsHelper.updateSettingValues(_this._type().content(), _this.defaultValue);
                    }, 1);
                }
            }
        });
        _this.expressionObj = {
            getInfo: function () {
                var info = _this.getInfo().filter(function (x) { return x.propertyName.indexOf(parameterExpressionBinding_1.ParameterExpressionBinding.expressionSuff) != -1; });
                info.filter(function (x) { return x.propertyName == 'ValueExpressionObj'; })[0].displayName = 'Value';
                return info;
            }
        };
        _this.info.forEach(function (property) {
            var index = property.propertyName.indexOf(parameterExpressionBinding_1.ParameterExpressionBinding.expressionSuff);
            if (index !== -1) {
                _this.expressionObj[property.propertyName] = parameterExpressionBinding_1.createExpressionProperty(_this, property.propertyName.substr(0, index));
            }
        });
        _this._initializeValue();
        _this._disposables.push(_this.isMultiValue.subscribe(function (newMultiValue) {
            if (newMultiValue) {
                _this.value = ko.observableArray([_this._parameterHelper.createMultiValue(_this, _this.value())]);
            }
            else {
                _this.value = ko.observable(_this.defaultValue);
                _this.selectAllValues(false);
            }
        }));
        _this._disposables.push(_this.selectAllValues.subscribe(function (newValue) {
            if (newValue) {
                _this.value = ko.observableArray([]);
            }
            else if (_this.isMultiValue()) {
                _this.value = ko.observableArray([_this._parameterHelper.createMultiValue(_this, _this.value())]);
            }
            else {
                _this.value = ko.observable(_this.defaultValue);
            }
            _this[parameter_1.parameterExpressionSerializationInfo.propertyName].value('');
        }));
        _this._disposables.push(_this.valueSourceSettingsType.subscribe(function (newVal) {
            if (newVal === 'None') {
                _this.selectAllValues(false);
            }
        }));
        _this._disposables.push(_this._isEditing.subscribe(function (newVal) {
            var settigns = _this.valueSourceSettings();
            if (settigns instanceof rangeSettings_1.RangeParametersSettings || settigns instanceof lookupSettings_1.StaticListLookUpSettings) {
                settigns._isEditing(newVal);
            }
        }));
        _this.valueInfo = ko.pureComputed(function () {
            var result = $.extend(true, {}, parameter_1.parameterValueSerializationInfo, parameterHelper.getParameterInfo(_this));
            result.propertyName = 'value';
            if (_this.type() === 'System.String' || _this.isMultiValue()) {
                result.defaultVal = '';
            }
            return result;
        });
        _this.valueSourceSettingsHelper.initializeParameterSettingsType();
        _this.valueSourceSettingsHelper.initializeLookupValueSubscribe(_report);
        _this.viewmodel = new analytics_widgets_1.ObjectProperties(ko.observable(_this));
        return _this;
    }
    Object.defineProperty(Parameter.prototype, "_localizationProvider", {
        get: function () {
            if (!this.__localizationProvider) {
                this.__localizationProvider = new _localizationUtils_1.DefaultLocalizationProvider(this);
            }
            return this.__localizationProvider;
        },
        enumerable: true,
        configurable: true
    });
    Parameter.prototype.getLocalizationProperty = function (propertyName) {
        return this._localizationProvider.getLocalizationProperty(propertyName);
    };
    Parameter.prototype.getLocalizationProperties = function () {
        return this._localizationProvider.getLocalizationProperties();
    };
    Parameter.prototype.applyLocalization = function (propertyName, propertyValue) {
        this._localizationProvider.applyLocalization(propertyName, propertyValue);
    };
    Parameter.prototype._initializeValue = function () {
        var _this = this;
        var value = this.value();
        if (this.isMultiValue()) {
            typeof value === 'string'
                ? this.value = this._parameterHelper.createMultiValueArray(value.split(parameterSettings_1.parameterSeparator), this, function (part) { return _this.parameterTypesHelper.convertSingleValue(part, _this.type()); })
                : this.value = ko.observableArray();
        }
        else if (this.allowNull() && !value) {
            this.value(null);
        }
        else {
            this.value(this.parameterTypesHelper.convertSingleValue(value, this.type()));
        }
    };
    Parameter.prototype._preDeserialize = function (model) {
        if (model['@LookUpSettings']) {
            model['@ValueSourceSettings'] = model['@LookUpSettings'];
            delete model['@LookUpSettings'];
        }
    };
    Parameter.prototype._processObsoleteProperties = function () {
        if (this._obsoleteValue()) {
            this.value(this._obsoleteValue().content());
            this._obsoleteValue(null);
        }
        delete this._obsoleteValue;
    };
    Parameter.prototype._getExpressionActions = function (name) {
        if (Parameter.propertiesWithExpressions.indexOf(name) === -1)
            return;
        var propertyInfo = this.info.filter(function (x) { return x.propertyName === name; })[0];
        var expression = this[this.propertyExpressionMapper.getExpressionPropertyName(name)];
        var expressionLocalizedName = analytics_internal_1.getLocalization(propertyInfo.displayName, propertyInfo.localizationId);
        var expressionForLocalizedString = analytics_internal_1.getLocalization('{0} Expression', 'ReportStringId.UD_PropertyGrid_Menu_ItemExpression');
        var expressionHint = ko.pureComputed(function () { return expression.value(); });
        this._disposables.push(expressionHint);
        if (!this._expressionActions[name]) {
            var expressionEditor = new reportExpressionEditorWrapper_1.ReportExpressionEditorWrapper(ko.observable(this), ko.observable(expression));
            this._disposables.push(expressionEditor);
            this._expressionActions[name] = [{
                    id: 'dxrd-expression',
                    action: function (propertyName) { expressionEditor.popupVisible(true); },
                    title: analytics_internal_1.formatUnicorn(expressionForLocalizedString, expressionLocalizedName),
                    hint: expressionHint,
                    weight: 50,
                    customTemplate: {
                        name: 'dxrd-expressioneditor-popup',
                        data: expressionEditor
                    },
                    visible: function (name) { return true; }
                }];
        }
        return this._expressionActions[name];
    };
    Parameter.prototype.preprocessInfo = function (info) {
        if (this._isEditing()) {
            info.forEach(function (x) {
                if (EditableParameterMode._ignoreEditors.indexOf(x.propertyName) !== -1) {
                    x.editor = undefined;
                }
                else if (x.editor && x.editor.header === analytics_widgets_1.editorTemplates.getEditor('bool').header) {
                    x.editor = editorTemplates_1.designerEditorTemplates.getEditor('parametersCheckbox');
                }
                else if (x.editor && x.editor.custom === editorTemplates_2.viewerEditorTemplates.multiValueEditable.custom) {
                    x.editor = { custom: 'dxrd-multivalue-editing' };
                }
                EditableParameterMode._displayNamePatcher[x.propertyName] && EditableParameterMode._displayNamePatcher[x.propertyName](x);
            });
        }
    };
    Parameter.prototype.getInfo = function () {
        var info = this.info;
        if (this.type) {
            var newInfo = $.extend(true, [], this.info);
            newInfo.splice(newInfo.indexOf(newInfo.filter(function (prop) { return prop.propertyName === 'value'; })[0]), 1, this.valueInfo());
            if (Parameter.availableRangeSettingTypes.indexOf(this.type()) !== -1) {
                var parameterSettingsTypeInfo = newInfo.filter(function (prop) { return prop.propertyName === 'valueSourceSettingsType'; })[0];
                if (parameterSettingsTypeInfo)
                    parameterSettingsTypeInfo.valuesArray = parameter_1.extendValueSourceSettingsTypes;
            }
            if (this.valueSourceSettings() && this.valueSourceSettings() instanceof rangeSettings_1.RangeParametersSettings) {
                var typeInfo = newInfo.filter(function (prop) { return prop.propertyName === 'type'; })[0];
                if (typeInfo) {
                    typeInfo.valuesArray = parameterTypesHelper_1.ParameterTypesHelper.typeValues.filter(function (typeValue) { return Parameter.availableRangeSettingTypes.indexOf(typeValue.value) !== -1; });
                }
            }
            info = newInfo;
        }
        this.preprocessInfo(info);
        return info;
    };
    Parameter.prototype.appendExpressionObjInfo = function (info) {
        for (var i = 0; i < info.length; i++) {
            if (info[i].propertyName == 'value')
                continue;
            var property = info[i];
            if (Parameter.propertiesWithExpressions.indexOf(property.propertyName) != -1) {
                var newProperty = this.propertyExpressionMapper.registerExpressionProperty(property);
                info.splice(i + 1, 0, newProperty);
                i++;
            }
        }
    };
    Parameter.prototype.getActionClassName = function (propertyName) {
        var expressionPropertyName = this.propertyExpressionMapper.getExpressionPropertyName(propertyName);
        var hasExpressions = !!this[expressionPropertyName].value();
        return {
            'dxrd-editormenu-expressions': hasExpressions,
            'dxd-icon-accented': hasExpressions
        };
    };
    Parameter.prototype.isPropertyVisible = function (name) {
        if (name === 'valueSourceSettings') {
            return !!this.valueSourceSettings();
        }
        else if (name === parameter_1.parameterValueSerializationInfo.propertyName) {
            return !(this.valueSourceSettings() instanceof rangeSettings_1.RangeParametersSettings);
        }
        else if (name == parameter_1.parameterExpressionSerializationInfo.propertyName) {
            return this._isEditing() || this.isMultiValue();
        }
        return this.propertyExpressionMapper.isPropertyVisible(name, this._isEditing());
    };
    Parameter.prototype.getParameterDescriptor = function () {
        return {
            description: this.description.peek(),
            displayName: 'Value',
            localizationId: 'DevExpress.XtraReports.Parameters.Parameter.Value',
            name: this.parameterName.peek(),
            type: this.type.peek(),
            value: this.value.peek(),
            visible: this.visible.peek(),
            enabled: this.enabled.peek(),
            multiValue: this.isMultiValue.peek(),
            allowNull: this.allowNull.peek(),
            selectAllValues: this.selectAllValues.peek(),
            tag: this.tag.peek()
        };
    };
    Parameter.prototype.assign = function (parameter) {
        var _this = this;
        this.getInfo().forEach(function (info) {
            if (_this[info.propertyName] && ko.isWritableObservable(_this[info.propertyName]))
                _this[info.propertyName](parameter[info.propertyName]());
        });
    };
    Parameter.prototype.getRangeParameters = function () {
        var result = [];
        if (this.isList) {
            var settings = (this.valueSourceSettings());
            result = [
                settings.startParameter(),
                settings.endParameter()
            ];
        }
        return result;
    };
    Object.defineProperty(Parameter.prototype, "name", {
        get: function () {
            return this.parameterName();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parameter.prototype, "specifics", {
        get: function () {
            return this.isList ? analytics_widgets_internal_1.RangeSpecific : this.parameterTypesHelper.getSpecifics(this.type());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parameter.prototype, "icon", {
        get: function () {
            return this.parameterTypesHelper.getIcon(this.type());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parameter.prototype, "defaultValue", {
        get: function () {
            return this.parameterTypesHelper.getDefaultValue(this.type());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parameter.prototype, "displayName", {
        get: function () {
            return this.parameterName();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parameter.prototype, "isList", {
        get: function () {
            return this.valueSourceSettings() instanceof rangeSettings_1.RangeParametersSettings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parameter.prototype, "dragData", {
        get: function () {
            return { noDragable: this.isList };
        },
        enumerable: true,
        configurable: true
    });
    Parameter.prototype.isPropertyDisabled = function (propertyName) {
        if (propertyName === 'allowNull' || propertyName === 'isMultiValue') {
            return this.valueSourceSettings() instanceof rangeSettings_1.RangeParametersSettings;
        }
        if (propertyName === 'selectAllValues') {
            return !(this.isMultiValue() && (this.valueSourceSettings() instanceof lookupSettings_1.StaticListLookUpSettings ||
                this.valueSourceSettings() instanceof lookupSettings_1.DynamicListLookUpSettings));
        }
        if (propertyName === parameter_1.parameterValueSerializationInfo.propertyName || propertyName === parameter_1.parameterExpressionSerializationInfo.propertyName)
            return this.selectAllValues() && !this.isPropertyDisabled('selectAllValues');
        return false;
    };
    Parameter.propertiesWithExpressions = ['visible', 'enabled', 'value'];
    Parameter.ParametersRefString = 'Parameters';
    Parameter.defaultGuidValue = parameterTypesHelper_1.ParameterTypesHelper.defaultGuidValue;
    Parameter.availableRangeSettingTypes = ['System.DateTime'];
    return Parameter;
}(analytics_utils_1.Disposable));
exports.Parameter = Parameter;
var parameter_1 = require("../metadata/parameters/parameter");
var valueSourceSettingsHelper_1 = require("./valueSourceSettingsHelper");
var rangeSettings_1 = require("./rangeSettings");
var lookupSettings_1 = require("./lookupSettings");
var editorTemplates_1 = require("../../widgets/editorTemplates");
var editorTemplates_2 = require("../../../viewer/widgets/editorTemplates");
var parameterSettings_1 = require("./parameterSettings");
var propertyExpressionMapper_1 = require("./propertyExpressionMapper");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var reportExpressionEditorWrapper_1 = require("../../widgets/expressioneditor/reportExpressionEditorWrapper");
