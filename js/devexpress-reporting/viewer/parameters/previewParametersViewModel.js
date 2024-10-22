﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\previewParametersViewModel.js)
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
var previewParameter_1 = require("./previewParameter");
var settings_1 = require("../settings");
var parameterHelper_1 = require("./parameterHelper");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var parameterPanelItemBase_1 = require("./parameterPanelItemBase");
var PreviewParametersViewModel = (function (_super) {
    __extends(PreviewParametersViewModel, _super);
    function PreviewParametersViewModel(reportPreview, parameterHelper, enableKeyboardSupport) {
        var _this = _super.call(this, parameterHelper) || this;
        _this._getParametersStateRequest = function (argsObject) {
            return analytics_internal_1.ajax(settings_1.HandlerUri(), 'getParametersState', encodeURIComponent(JSON.stringify(argsObject)), function (message, jqXHR, textStatus) { return _this._reportPreview._processError(analytics_utils_1.getLocalization('Cannot supply filtered lookup values to a report parameter editor', 'ASPxReportsStringId.WebDocumentViewer_GetLookUpValuesError'), jqXHR); });
        };
        _this._getDoneGetParametersStateHandler = function (changedParameter) {
            var parametersViewModel = _this;
            return function (response) {
                try {
                    if (!response || !response.parameters) {
                        return;
                    }
                    response.parameters.forEach(function (parametersInfoCollection) {
                        var matchedParameter = parametersViewModel._parameters.filter(function (p) { return p.path === parametersInfoCollection.Key; })[0];
                        if (!parametersViewModel._shouldProcessParameter(matchedParameter))
                            return;
                        matchedParameter.visible(parametersInfoCollection.Value.visible);
                        matchedParameter.enabled(parametersInfoCollection.Value.enabled);
                        if (parametersViewModel._parameters.indexOf(changedParameter) < parametersViewModel._parameters.indexOf(matchedParameter)) {
                            parametersViewModel._setLookUpValues(matchedParameter, parametersInfoCollection.Value.lookUpValues, matchedParameter.visible() && !matchedParameter.allowNull);
                        }
                    });
                }
                finally {
                    parametersViewModel.parametersLoading(false);
                }
            };
        };
        _this._getFailGetParametersStateHandler = function () {
            var parametersViewModel = _this;
            return function (jqXHRError) {
                parametersViewModel.parametersLoading(false);
            };
        };
        _this.restore = function () {
            if (_this.parametersLoading()) {
                return;
            }
            try {
                _this.parametersLoading(true);
                _this._parameters.forEach(function (parameter) {
                    if (!_this._shouldProcessParameter(parameter))
                        return;
                    parameter.lookUpValues(parameter._originalLookUpValues);
                    parameter.initialize(parameter._originalValue, _this.parameterHelper);
                });
            }
            finally {
                _this.parameterHelper.callbacks && _this.parameterHelper.callbacks.parametersReset && _this.parameterHelper.callbacks.parametersReset(_this, _this._parameters);
                _this.parametersLoading(false);
            }
        };
        _this.getInfo = ko.observable(null);
        _this.needToUpdateParameter = ko.observable(false);
        _this.processInvisibleParameters = false;
        _this.parametersLoading = ko.observable(false);
        _this._reportPreview = reportPreview;
        _this.validateAndSubmit = function (params) {
            var result = params && params.validationGroup && params.validationGroup.validate && params.validationGroup.validate();
            if (!result || result.isValid)
                _this.submit();
        };
        _this.submit = function () {
            if (_this.parametersLoading())
                return;
            _this.parametersLoading(true);
            var promise = reportPreview.startBuild();
            promise && promise.done(function (val) { _this.parametersLoading(false); });
        };
        _this._disposables.push(reportPreview.originalParametersInfo.subscribe(function (originalParametersInfo) {
            _this.initialize(originalParametersInfo);
        }));
        _this.initialize(reportPreview.originalParametersInfo());
        var notEmpty = ko.pureComputed(function () { return !_this.isEmpty(); });
        _this.tabInfo = new analytics_utils_1.TabInfoWithPropertyGrid({
            text: 'Parameters',
            template: 'dxrd-preview-parameters',
            model: _this,
            keyboardHelper: enableKeyboardSupport ? new analytics_internal_1.AccordionKeyboardHelper() : undefined,
            localizationId: 'PreviewStringId.RibbonPreview_Parameters_Caption',
            imageClassName: 'parameters',
            imageTemplateName: 'dxrd-svg-tabs-parameters',
            visible: notEmpty
        });
        _this.tabInfo['showBottomBorder'] = ko.observable(false);
        var popupVisibleSwitch = ko.observable(false);
        var popupVisible = ko.pureComputed({
            read: function () {
                return notEmpty() && popupVisibleSwitch();
            },
            write: function (newVal) {
                return popupVisibleSwitch(newVal);
            }
        });
        _this.popupInfo = { visible: popupVisible, notEmpty: notEmpty };
        _this._disposables.push(_this.popupInfo);
        return _this;
    }
    Object.defineProperty(PreviewParametersViewModel.prototype, "_visibleParameters", {
        get: function () {
            return this._parameters.filter(function (p) { return p.visible(); });
        },
        enumerable: true,
        configurable: true
    });
    PreviewParametersViewModel.prototype._shouldProcessParameter = function (param) {
        return this.processInvisibleParameters || (param && (param.visible() || param.hasVisibleExpression || param.isFilteredLookUpSettings));
    };
    PreviewParametersViewModel.prototype._convertLocalDateToUTC = function (localDate) {
        return new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), localDate.getHours(), localDate.getMinutes(), localDate.getSeconds()));
    };
    PreviewParametersViewModel.prototype.subscribeParameter = function (parameter) {
        var _this = this;
        var needToUpdateParameter = this.needToUpdateParameter() || (this._shouldProcessParameter(parameter)) &&
            (parameter.isFilteredLookUpSettings || parameter.hasBindedExpressions);
        this.needToUpdateParameter(needToUpdateParameter);
        if (this._shouldProcessParameter(parameter)) {
            this._disposables.push((parameter.isMultiValueWithLookUp ? parameter._value : parameter.value).subscribe(function (newValue) {
                if (!_this.parametersLoading() && _this.needToUpdateParameter()) {
                    _this.updateParameters(parameter);
                }
            }));
        }
    };
    PreviewParametersViewModel.prototype._setLookUpValues = function (parameter, lookUpValues, assignFirstLookUpValue) {
        if (!lookUpValues) {
            parameter.lookUpValues([]);
            return;
        }
        parameter.lookUpValues(this.parameterHelper.mapLookUpValues(parameter.type, lookUpValues));
        var _parameterValuesContainedInLookUps = this._getParameterValuesContainedInLookups(lookUpValues, parameter);
        if (parameter.isMultiValue) {
            parameter.initialize(_parameterValuesContainedInLookUps.length > 0 ? _parameterValuesContainedInLookUps : [], this.parameterHelper);
        }
        else {
            parameter.initialize(_parameterValuesContainedInLookUps[0] && _parameterValuesContainedInLookUps[0].Value || (assignFirstLookUpValue && lookUpValues.length > 0 ? lookUpValues[0].Value : null), this.parameterHelper);
        }
    };
    PreviewParametersViewModel.prototype._getParameterValuesContainedInLookups = function (parameterLookUpValues, parameter) {
        var _this = this;
        if (parameterLookUpValues) {
            if (parameter.isMultiValue) {
                var selectedItems = parameter.value().value();
                return selectedItems.filter(function (item) { return _this._filterParameterValuesContainsInLookups(parameterLookUpValues, parameter.type, item).length > 0; });
            }
            else {
                return this._filterParameterValuesContainsInLookups(parameterLookUpValues, parameter.type, parameter.value());
            }
        }
        return [];
    };
    PreviewParametersViewModel.prototype._filterParameterValuesContainsInLookups = function (parameterLookUpValues, parameterType, value) {
        var _this = this;
        return parameterLookUpValues.filter(function (x) {
            return previewParameter_1.PreviewParameter._compareValues(_this.parameterHelper.getValueConverter(parameterType)(x.Value), value);
        });
    };
    PreviewParametersViewModel.prototype.initialize = function (originalParametersInfo) {
        var _this = this;
        originalParametersInfo && this.parameterHelper.initialize(originalParametersInfo.knownEnums);
        _super.prototype.initialize.call(this, originalParametersInfo);
        if (!originalParametersInfo)
            return;
        var layout = originalParametersInfo.parameterPanelLayout;
        if ((!layout || layout.layoutItems.length === 0) && originalParametersInfo.parameters) {
            this._parameters.forEach(function (x) { return _this._add(x, {}); });
        }
        this.isEmpty(this._visibleParameters.length === 0);
        var actualParametersInfo = [];
        this._parameters.forEach(function (x) {
            _this.subscribeParameter(x);
            actualParametersInfo.push({ value: x.value, parameterDescriptor: x.getParameterDescriptor(), lookUpValues: x.lookUpValues });
        });
        if (this.parameterHelper.callbacks && this.parameterHelper.callbacks.parametersInitialized) {
            this.parameterHelper.callbacks.parametersInitialized(this, actualParametersInfo, this.submit, originalParametersInfo.shouldRequestParameters);
        }
        if (this._reportPreview.documentId)
            return;
        if (!originalParametersInfo.shouldRequestParameters || this.isEmpty()) {
            this.submit();
        }
        else {
            this._reportPreview.removeEmptyPages();
            this.tabInfo.active(true);
            if (this.tabInfo.visible() && ko.isWriteableObservable(this.tabInfo.collapsed))
                this.tabInfo.collapsed(false);
            this.popupInfo.visible(true);
            this._reportPreview.pageLoading(false);
        }
        this.tabInfo['showBottomBorder'](layout && layout.layoutItems.length > 0);
    };
    PreviewParametersViewModel.prototype.getPathsAfterPath = function (parameterPath) {
        var _this = this;
        var startIndex = 0;
        for (var index = 0; index < this._parameters.length; index++) {
            if (this._parameters[index].path === parameterPath) {
                startIndex = index + 1;
                break;
            }
        }
        var paths = this._parameters
            .filter(function (param, index) {
            return _this._shouldProcessParameter(param) &&
                (param.hasBindedExpressions || param.isFilteredLookUpSettings && index >= startIndex);
        })
            .map(function (x) { return x.path; });
        return paths || [];
    };
    PreviewParametersViewModel.prototype.serializeParameters = function () {
        var params = [], self = this;
        this._parameters.forEach(function (parameter) {
            var convertItem = function (item) {
                return (parameter.type === 'System.DateTime' && !!item && (item instanceof Date)) ? self._convertLocalDateToUTC(item) : item;
            };
            var value = parameter.isMultiValueWithLookUp ? parameter._value() : parameter.value();
            if (parameter.allowNull) {
                if ((parameter.isMultiValue && Array.isArray(value) && value.length === 0) || value === '') {
                    value = null;
                }
            }
            params.push({ Value: parameterHelper_1.ParameterHelper.getSerializationValue(value, convertItem), Key: parameter.path, TypeName: parameter.type });
        });
        return params;
    };
    PreviewParametersViewModel.prototype.updateParameters = function (changedParameter) {
        var _this = this;
        var requiredParameterPaths = this.getPathsAfterPath(changedParameter.path);
        if (!requiredParameterPaths || requiredParameterPaths.length === 0) {
            return;
        }
        var argsObject = {
            reportId: this._reportPreview.reportId,
            reportUrl: this._reportPreview.reportUrl,
            requiredParameterPaths: requiredParameterPaths,
            parameters: this.serializeParameters(),
            timeZoneOffset: 0 - new Date().getTimezoneOffset()
        };
        setTimeout(function () {
            _this.parametersLoading(true);
            _this._getParametersStateRequest(argsObject)
                .done(_this._getDoneGetParametersStateHandler(changedParameter))
                .fail(_this._getFailGetParametersStateHandler());
        }, 10);
    };
    return PreviewParametersViewModel;
}(parameterPanelItemBase_1.ParameterPanelItemBase));
exports.PreviewParametersViewModel = PreviewParametersViewModel;
