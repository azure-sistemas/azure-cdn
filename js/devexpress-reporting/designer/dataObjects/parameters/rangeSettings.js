﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\rangeSettings.js)
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
var objectStorageItem_1 = require("../objectStorageItem");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var RangeParametersSettings = (function (_super) {
    __extends(RangeParametersSettings, _super);
    function RangeParametersSettings(model, dsHelperProvider, serializer) {
        return _super.call(this, $.extend({ '@ObjectType': 'DevExpress.XtraReports.Parameters.RangeParametersSettings' }, model), dsHelperProvider, serializer) || this;
    }
    RangeParametersSettings.prototype._updateInfo = function (info) {
        if (this._isEditing())
            info.forEach(function (x) {
                if (x.editor && x.editor === analytics_widgets_1.editorTemplates.getEditor('objecteditor'))
                    x.editor = rangeSettings_1.rangeEditor;
            });
    };
    RangeParametersSettings.prototype.preInitProperties = function (model, helper, serializer) {
        _super.prototype.preInitProperties.call(this, model, helper, serializer);
        this._isEditing = ko.observable(false);
    };
    RangeParametersSettings.prototype.getInfo = function () {
        var info = _super.prototype.getInfo.call(this).concat(rangeSettings_1.rangeSettingsInfos);
        this._updateInfo(info);
        return info;
    };
    RangeParametersSettings.prototype.initalizeRangeParameter = function (rangeParameter, parameter, namePostfix) {
        if (namePostfix === void 0) { namePostfix = '_Start'; }
        rangeParameter.parameterName(parameter.name + namePostfix);
        rangeParameter.value(parameter.defaultValue);
    };
    RangeParametersSettings.prototype.assingParameterInfo = function (parameter) {
        [this.startParameter(), this.endParameter()].forEach(function (rangeParameter) {
            rangeParameter.valueInfo = parameter.valueInfo;
            rangeParameter._type = parameter.type;
            rangeParameter._specifics(parameter.parameterTypesHelper.getSpecifics(parameter.type()));
            parameterExpressionBinding_1.createExpressionProperty(rangeParameter, 'Value');
        });
    };
    RangeParametersSettings.prototype.initializeParameters = function (parameter) {
        this.assingParameterInfo(parameter);
        this.initalizeRangeParameter(this.startParameter(), parameter);
        this.initalizeRangeParameter(this.endParameter(), parameter, '_End');
    };
    return RangeParametersSettings;
}(objectStorageItem_1.ObjectItem));
exports.RangeParametersSettings = RangeParametersSettings;
var RangeBoundaryParameter = (function (_super) {
    __extends(RangeBoundaryParameter, _super);
    function RangeBoundaryParameter(model, dsHelperProvider, serializer) {
        var _this = _super.call(this, model, dsHelperProvider, serializer) || this;
        _this._specifics = ko.observable('date');
        _this.templateName = 'dx-treelist-item';
        return _this;
    }
    RangeBoundaryParameter.prototype.getInfo = function () {
        if (this.valueInfo) {
            var info = $.extend(true, [], rangeSettings_1.rangeBoundaryParameterInfos);
            var valueInfo = this._type() === 'System.DateTime' ? analytics_internal_1.extend({}, this.valueInfo(), { editorOptions: { type: 'date' } }) : this.valueInfo();
            info.splice(info.indexOf(info.filter(function (prop) { return prop.propertyName === 'value'; })[0]), 1, valueInfo);
            return info;
        }
        return rangeSettings_1.rangeBoundaryParameterInfos;
    };
    Object.defineProperty(RangeBoundaryParameter.prototype, "name", {
        get: function () {
            return this.parameterName();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeBoundaryParameter.prototype, "displayName", {
        get: function () {
            return this.parameterName();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeBoundaryParameter.prototype, "specifics", {
        get: function () {
            return this._specifics();
        },
        enumerable: true,
        configurable: true
    });
    return RangeBoundaryParameter;
}(objectStorageItem_1.ObjectItem));
exports.RangeBoundaryParameter = RangeBoundaryParameter;
var RangeStartParameter = (function (_super) {
    __extends(RangeStartParameter, _super);
    function RangeStartParameter(model, dsHelperProvider, serializer) {
        return _super.call(this, $.extend({ '@ObjectType': 'DevExpress.XtraReports.Parameters.RangeStartParameter' }, model), dsHelperProvider, serializer) || this;
    }
    return RangeStartParameter;
}(RangeBoundaryParameter));
exports.RangeStartParameter = RangeStartParameter;
var RangeEndParameter = (function (_super) {
    __extends(RangeEndParameter, _super);
    function RangeEndParameter(model, dsHelperProvider, serializer) {
        return _super.call(this, $.extend({ '@ObjectType': 'DevExpress.XtraReports.Parameters.RangeEndParameter' }, model), dsHelperProvider, serializer) || this;
    }
    return RangeEndParameter;
}(RangeBoundaryParameter));
exports.RangeEndParameter = RangeEndParameter;
var parameterExpressionBinding_1 = require("./parameterExpressionBinding");
var rangeSettings_1 = require("../metadata/parameters/rangeSettings");
