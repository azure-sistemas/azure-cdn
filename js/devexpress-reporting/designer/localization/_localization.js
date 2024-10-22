﻿/**
* DevExpress HTML/JS Reporting (designer\localization\_localization.js)
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
var _serializer_1 = require("../internal/serialization/_serializer");
var localizationMetadata_1 = require("./localizationMetadata");
var metadata_1 = require("../../common/metadata");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var _initUtils_1 = require("../controls/utils/_initUtils");
var LocalizationItem = (function () {
    function LocalizationItem(model, serializer) {
        this.culture = ko.observable();
        this.component = ko.observable();
        this.propertyName = ko.observable();
        this.propertyValue = ko.observable();
        serializer = serializer || new _serializer_1.ReportModelSerializer();
        model && serializer.deserialize(this, model);
    }
    LocalizationItem.prototype.getInfo = function () {
        return [localizationMetadata_1.componentInfo, localizationMetadata_1.cultureInfo, localizationMetadata_1.propertyNameInfo, localizationMetadata_1.propertyValueInfo];
    };
    return LocalizationItem;
}());
exports.LocalizationItem = LocalizationItem;
function getComponentInfo(localizationPropertyInfo) {
    return localizationPropertyInfo.component.getLocalizationProperty(localizationPropertyInfo.propertyName);
}
function searchInLocalizationArray(localizationArray, controlPropertyName, component) {
    return localizationArray.filter(function (localizationItem) {
        return localizationItem.component == component && localizationItem.propertyName === controlPropertyName;
    })[0];
}
exports.searchInLocalizationArray = searchInLocalizationArray;
var ReportLocalizationEngine = (function (_super) {
    __extends(ReportLocalizationEngine, _super);
    function ReportLocalizationEngine(report) {
        var _this = _super.call(this) || this;
        _this.report = report;
        _this.items = new LocalizationDictionary();
        _this.add = function (cultureCode, component, propertyName, value) {
            var node = _this.items.get(cultureCode);
            if (!node) {
                _this.items.add(cultureCode).setValue(component, propertyName, value);
            }
            else
                node.setValue(component, propertyName, value);
        };
        _this.save = function (cultureCode) {
            if (cultureCode === void 0) { cultureCode = _this.report.language(); }
            _this.report.enumerateComponents().forEach(function (control) {
                if (control.getLocalizationProperties) {
                    control.getLocalizationProperties().forEach(function (item) {
                        return _this.add(cultureCode, control, item.propertyName, item.value);
                    });
                }
            });
        };
        _this.apply = function (cultureCode) {
            var localizationItem = _this.items.get(cultureCode);
            if (!localizationItem) {
                _this.items.add(cultureCode);
                _this.apply(cultureCode);
            }
            else {
                var needUpdate = !_this.report['_update']();
                needUpdate && _this.report['_update'](true);
                localizationItem.getInheritedProperties().forEach(function (localizationPropertyInfo) {
                    localizationPropertyInfo.component.applyLocalization(localizationPropertyInfo.propertyName, localizationPropertyInfo.value);
                });
                needUpdate && _this.report['_update'](false);
            }
        };
        _this.serialize = function () {
            var outArray = [];
            var _avalibleComponents = _this.report.enumerateComponents();
            var _avalibleComponentsDictionary = {};
            var _getUniqueName = function (component) {
                return analytics_internal_1.replaceInvalidSymbols(component.controlType + ko.unwrap(component.name));
            };
            _avalibleComponents.forEach(function (component) {
                _avalibleComponentsDictionary[_getUniqueName(component)] = component;
            });
            var canSerialize = function (component) {
                var item = _avalibleComponentsDictionary[_getUniqueName(component)];
                return item && component === item;
            };
            _this.items.keys().forEach(function (key) {
                outArray.push.apply(outArray, _this.items.get(key).serialize(canSerialize));
            });
            return outArray;
        };
        report._localizationItems().forEach(function (item) {
            item.component() && _this.add(item.culture(), item.component(), item.propertyName(), item.propertyValue);
        });
        return _this;
    }
    ReportLocalizationEngine.prototype.recalculateUnits = function (coef) {
        var _this = this;
        this.items.keys().forEach(function (key) {
            key !== _this.report.language() && _this.items.get(key).properties.forEach(function (x) { return x.recalculate && x.recalculate(coef); });
        });
    };
    ReportLocalizationEngine.prototype.hasCulture = function (cultureCode) {
        var item = this.items.get(cultureCode);
        return item && item.isLocalized();
    };
    ReportLocalizationEngine.prototype.isLocalized = function () {
        var _this = this;
        return this.items.keys().some(function (key) {
            return key !== metadata_1.defaultCulture && _this.items.get(key).properties.length > 0;
        });
    };
    return ReportLocalizationEngine;
}(analytics_utils_1.Disposable));
exports.ReportLocalizationEngine = ReportLocalizationEngine;
var LocalizationDictionary = (function () {
    function LocalizationDictionary() {
        var _this = this;
        this.cultures = {};
        this.count = function () {
            return Object.keys(_this.cultures).length;
        };
        this.clear = function (code) {
            if (!code) {
                var defaultCultureInfo = _this.cultures[metadata_1.defaultCulture];
                _this.cultures = {};
                _this.cultures[metadata_1.defaultCulture] = defaultCultureInfo;
            }
            else {
                _this.cultures[code].properties = [];
                delete _this.cultures[code];
            }
        };
    }
    LocalizationDictionary.prototype.add = function (code) {
        this.cultures[code] = new LocalizationInfo(code);
        this.cultures[code].createNodes(code, this);
        return this.cultures[code];
    };
    LocalizationDictionary.prototype.get = function (code) {
        return this.cultures[code];
    };
    LocalizationDictionary.prototype.keys = function () {
        return Object.keys(this.cultures);
    };
    return LocalizationDictionary;
}());
exports.LocalizationDictionary = LocalizationDictionary;
var LocalizationInfo = (function () {
    function LocalizationInfo(code) {
        var _this = this;
        this.code = code;
        this.properties = [];
        this.isLocalized = ko.observable(false);
        this.setValue = function (component, propertyName, value) {
            var propertyValue = ko.unwrap(value);
            var setInfo = {
                component: component,
                propertyName: propertyName,
                value: propertyValue && propertyValue.toString() || propertyValue
            };
            var selfProperty = searchInLocalizationArray(_this.properties, setInfo.propertyName, setInfo.component);
            var closestProperty = _this.parent ? _this.parent.findClosestProperty(setInfo) : undefined;
            if (selfProperty) {
                if (closestProperty && closestProperty.value == setInfo.value)
                    _this.properties.splice(_this.properties.indexOf(selfProperty), 1);
                else
                    selfProperty.value = setInfo.value;
            }
            else if (!closestProperty || closestProperty.value !== setInfo.value) {
                _this._updateLocalizationInfoItem(setInfo);
                _this.properties.push(setInfo);
            }
            _this.isLocalized(_this.properties.length > 0);
        };
    }
    LocalizationInfo.prototype.getInheritedProperties = function () {
        var collectedProperties = this.properties.map(function (a) { return a; });
        return this.parent ? this.parent.mergePropertiesWithChild(collectedProperties) : collectedProperties;
    };
    LocalizationInfo.prototype.createNodes = function (code, list) {
        var parent = this.getParentCulture(code);
        if (!parent)
            return;
        if (!list.get(parent))
            list.add(parent);
        this.parent = list.get(parent);
    };
    LocalizationInfo.prototype.mergePropertiesWithChild = function (childArray) {
        this.properties.forEach(function (property) {
            var mergeElement = childArray.filter(function (info) { return info.component === property.component && info.propertyName === property.propertyName; });
            if (!mergeElement.length)
                childArray.push(property);
        });
        return this.parent ? this.parent.mergePropertiesWithChild(childArray) : childArray;
    };
    LocalizationInfo.prototype._recalculateUnit = function (item, serializationInfo, process) {
        var model = ko.unwrap(serializationInfo.from ? serializationInfo.from(item.value) : item.value);
        model = process(model);
        item.value = serializationInfo.toJsonObject ? serializationInfo.toJsonObject(model) : model.toString();
    };
    LocalizationInfo.prototype._updateLocalizationInfoItem = function (setInfo) {
        var _this = this;
        var localizedControl = getComponentInfo(setInfo);
        var serializationInfo = localizedControl && localizedControl.info;
        var unitProperties = _initUtils_1.getUnitProperties(setInfo.component);
        if (serializationInfo && unitProperties && unitProperties.properties.some(function (x) { return x === serializationInfo.propertyName; })) {
            setInfo.recalculate = function (coef) {
                _this._recalculateUnit(setInfo, serializationInfo, function (value) {
                    var valueUnits = _initUtils_1.getUnitProperties(value);
                    if (valueUnits) {
                        valueUnits.reCalculateObject(coef);
                        return value;
                    }
                    return unitProperties.calcProperty(value, coef);
                });
            };
        }
    };
    LocalizationInfo.prototype._createLocalizationItem = function (itemInfo) {
        var item = new LocalizationItem();
        item.culture(this.code);
        item.component(itemInfo.component);
        item.propertyName(itemInfo.propertyName);
        item.propertyValue(itemInfo.value.toString());
        return item;
    };
    LocalizationInfo.prototype.serialize = function (canSerialize) {
        var _this = this;
        return this.properties.reduce(function (result, property) {
            if (canSerialize(property.component)) {
                if (_this.code === metadata_1.defaultCulture) {
                    var localizedProperty = getComponentInfo(property);
                    var defaultVal = ko.unwrap(localizedProperty.info.from ? localizedProperty.info.from(localizedProperty.info.defaultVal) : localizedProperty.info.defaultVal);
                    defaultVal = localizedProperty.info.toJsonObject ? localizedProperty.info.toJsonObject(defaultVal) : (defaultVal != null && defaultVal.toString() || defaultVal);
                    if (property.value != undefined && property.value.toString() !== defaultVal) {
                        result.push(_this._createLocalizationItem(property));
                    }
                }
                else {
                    result.push(_this._createLocalizationItem(property));
                }
            }
            return result;
        }, []);
    };
    LocalizationInfo.prototype.findClosestProperty = function (mergeProperty) {
        for (var i = 0; i < this.properties.length; i++)
            if (this.properties[i].component === mergeProperty.component && this.properties[i].propertyName === mergeProperty.propertyName)
                return this.properties[i];
        return this.parent ? this.parent.findClosestProperty(mergeProperty) : undefined;
    };
    LocalizationInfo.prototype.getParentCulture = function (cultureCode) {
        if (cultureCode == null || cultureCode == metadata_1.defaultCulture)
            return undefined;
        var parts = cultureCode.split('-');
        return parts.length == 1 ? metadata_1.defaultCulture : parts.splice(0, parts.length - 1).join('-');
    };
    return LocalizationInfo;
}());
exports.LocalizationInfo = LocalizationInfo;
