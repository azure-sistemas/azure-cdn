﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_localizationUtils.js)
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
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
function __createLocalizationProperties(target, format) {
    if (format === void 0) { format = '{0}'; }
    return target.getInfo().filter(function (x) { return x.localizable && x.modelName; }).map(function (x) {
        return new LocalizedProperty(analytics_internal_1.formatUnicorn(format, x.modelName.substr(1)), target['_' + x.propertyName] || target[x.propertyName], x);
    });
}
exports.__createLocalizationProperties = __createLocalizationProperties;
var DefaultLocalizationProvider = (function (_super) {
    __extends(DefaultLocalizationProvider, _super);
    function DefaultLocalizationProvider(_model) {
        var _this = _super.call(this) || this;
        _this._model = _model;
        return _this;
    }
    DefaultLocalizationProvider.prototype.dispose = function () {
        this._localizationInfo = null;
    };
    DefaultLocalizationProvider.prototype.getLocalizationProperty = function (propertyName) {
        return this.getLocalizationProperties().filter(function (x) { return x.propertyName === propertyName; })[0];
    };
    DefaultLocalizationProvider.prototype.getLocalizationProperties = function () {
        if (!this._localizationInfo) {
            this._localizationInfo = __createLocalizationProperties(this._model);
        }
        return this._localizationInfo;
    };
    DefaultLocalizationProvider.prototype.applyLocalization = function (propertyName, propertyValue) {
        this.getLocalizationProperties().filter(function (x) { return x.propertyName === propertyName; }).forEach(function (x) { return x.applyLocalization(propertyValue); });
    };
    return DefaultLocalizationProvider;
}(analytics_utils_1.Disposable));
exports.DefaultLocalizationProvider = DefaultLocalizationProvider;
var TableOfContentLocalizationProvider = (function (_super) {
    __extends(TableOfContentLocalizationProvider, _super);
    function TableOfContentLocalizationProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableOfContentLocalizationProvider.prototype.getLocalizationProperties = function () {
        if (!this._localizationInfo) {
            this._localizationInfo = [].concat.apply(_super.prototype.getLocalizationProperties.call(this), [
                __createLocalizationProperties(this._model.levelTitle, 'LevelTitle.{0}')
            ]);
        }
        return [].concat.apply(this._localizationInfo, this._model.levels().map(function (level, i) {
            return __createLocalizationProperties(level, analytics_internal_1.formatUnicorn('Levels.{0}.', i) + '{0}');
        }));
    };
    return TableOfContentLocalizationProvider;
}(DefaultLocalizationProvider));
exports.TableOfContentLocalizationProvider = TableOfContentLocalizationProvider;
var ReportLocalizationProvider = (function (_super) {
    __extends(ReportLocalizationProvider, _super);
    function ReportLocalizationProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReportLocalizationProvider.prototype.getLocalizationProperties = function () {
        if (!this._localizationInfo) {
            this._localizationInfo = [].concat.apply(_super.prototype.getLocalizationProperties.call(this), __createLocalizationProperties(this._model.watermark, 'Watermark.{0}'));
        }
        return this._localizationInfo;
    };
    return ReportLocalizationProvider;
}(DefaultLocalizationProvider));
exports.ReportLocalizationProvider = ReportLocalizationProvider;
var ChartLocalizationProvider = (function (_super) {
    __extends(ChartLocalizationProvider, _super);
    function ChartLocalizationProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChartLocalizationProvider.prototype.getLocalizationProperties = function () {
        return [].concat.apply(_super.prototype.getLocalizationProperties.call(this), this._model.chart.titles().map(function (title, i) {
            return __createLocalizationProperties(title, analytics_internal_1.formatUnicorn('Titles.{0}.', i) + '{0}');
        }));
    };
    return ChartLocalizationProvider;
}(DefaultLocalizationProvider));
exports.ChartLocalizationProvider = ChartLocalizationProvider;
var LocalizedProperty = (function () {
    function LocalizedProperty(propertyName, value, info) {
        this.propertyName = propertyName;
        this.value = value;
        this.info = info;
    }
    LocalizedProperty.prototype.applyLocalization = function (value) {
        var newValue = this.info.from ? ko.unwrap(this.info.from(value)) : value;
        var componentValueAsValue = ko.unwrap(this.value);
        if (this.value.getInfo) {
            var info = componentValueAsValue.getInfo();
            info.forEach(function (info) {
                componentValueAsValue[info.propertyName] && componentValueAsValue[info.propertyName](newValue[info.propertyName]());
            });
        }
        else {
            this.value(newValue);
        }
    };
    return LocalizedProperty;
}());
exports.LocalizedProperty = LocalizedProperty;
