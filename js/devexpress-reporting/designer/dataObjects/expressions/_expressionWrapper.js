﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\expressions\_expressionWrapper.js)
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
var expressionBinding_1 = require("../../controls/metadata/properties/expressionBinding");
var metadata_1 = require("../../controls/metadata/properties/metadata");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var customFunctions_1 = require("../../widgets/customFunctions");
var _wrappedExpressionOptions_1 = require("./_wrappedExpressionOptions");
var _dataBindingMode_1 = require("../../internal/_dataBindingMode");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var editorTemplates_1 = require("../../widgets/editorTemplates");
var colors = ['Transparent', 'AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenrod', 'DarkGray', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DodgerBlue', 'Firebrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'Goldenrod', 'Gray', 'Green', 'GreenYellow', 'Honeydew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenrodYellow', 'LightGreen', 'LightGray', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquamarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenrod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];
var ExpressionWrapper = (function (_super) {
    __extends(ExpressionWrapper, _super);
    function ExpressionWrapper(_bindingMode, _fieldListProvider) {
        if (_bindingMode === void 0) { _bindingMode = _dataBindingMode_1.DataBindingMode.Expressions; }
        var _this = _super.call(this) || this;
        _this._bindingMode = _bindingMode;
        _this._fieldListProvider = _fieldListProvider;
        _this._valuesDictionary = {
            ForeColor: colors,
            BackColor: colors,
            FillColor: colors,
            BorderColor: colors,
            Borders: ['Left', 'Right', 'Top', 'Bottom', 'All'],
            BorderDashStyle: metadata_1.borderDashStyleValues,
            TextAlignment: metadata_1.textAlignmentValues,
            Name: Object.keys(ko.unwrap(analytics_widgets_internal_1.availableFonts))
        };
        _this._displayNameDictionary = {
            Text: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Text', displayName: 'Text' },
            Visible: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Visible', displayName: 'Visible' },
            NavigateUrl: { localizationId: 'DevExpress.XtraReports.UI.XRControl.NavigateUrl', displayName: 'Navigate Url' },
            Bookmark: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Bookmark', displayName: 'Bookmark' },
            Tag: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Tag', displayName: 'Tag' },
            LeftF: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Left', displayName: 'Left' },
            TopF: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Top', displayName: 'Top' },
            WidthF: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Width', displayName: 'Width' },
            HeightF: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Height', displayName: 'Height' },
            StyleName: { localizationId: 'DevExpress.XtraReports.UI.XRControl.StyleName', displayName: 'Style Name' },
            ForeColor: { localizationId: 'DevExpress.XtraReports.UI.XRControl.ForeColor', displayName: 'Foreground Color' },
            BackColor: { localizationId: 'DevExpress.XtraReports.UI.XRControl.BackColor', displayName: 'Background Color' },
            BorderColor: { localizationId: 'DevExpress.XtraReports.UI.XRControl.BorderColor', displayName: 'Border Color' },
            Borders: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Borders', displayName: 'Borders' },
            BorderWidth: { localizationId: 'DevExpress.XtraReports.UI.XRControl.BorderWidth', displayName: 'Border Width' },
            BorderDashStyle: { localizationId: 'DevExpress.XtraReports.UI.XRControl.BorderDashStyle', displayName: 'Border Dash Style' },
            TextAlignment: { localizationId: 'DevExpress.XtraReports.UI.XRControl.TextAlignment', displayName: 'Text Alignment' },
            Font: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Font', displayName: 'Font' },
            Padding: { localizationId: 'DevExpress.XtraReports.UI.XRControl.Padding', displayName: 'Padding' },
            Appearance: { localizationId: 'ReportStringId.CatAppearance', displayName: 'Appearance' },
            Layout: { localizationId: 'ReportStringId.CatLayout', displayName: 'Layout' },
            Name: { localizationId: 'AnalyticsCoreStringId.FormatFontName', displayName: 'Name' },
            Size: { localizationId: 'AnalyticsCoreStringId.Font.Size', displayName: 'Size' },
            Italic: { localizationId: 'System.Drawing.Font.Italic', displayName: 'Italic' },
            Strikeout: { localizationId: 'System.Drawing.Font.Strikeout', displayName: 'Strikeout' },
            Bold: { localizationId: 'System.Drawing.Font.Bold', displayName: 'Bold' },
            Underline: { localizationId: 'System.Drawing.Font.Underline', displayName: 'Underline' },
            Left: { localizationId: 'AnalyticsCoreStringId.PaddingInfo.Left', displayName: 'Left' },
            Right: { localizationId: 'AnalyticsCoreStringId.PaddingInfo.Right', displayName: 'Right' },
            Top: { localizationId: 'AnalyticsCoreStringId.PaddingInfo.Top', displayName: 'Top' },
            Bottom: { localizationId: 'AnalyticsCoreStringId.PaddingInfo.Bottom', displayName: 'Bottom' },
            CheckBoxState: { localizationId: 'DevExpress.XtraReports.UI.XRCheckBox.CheckBoxState', displayName: 'Check Box State' },
            Image: { localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.Image', displayName: 'Image' },
            ImageSource: { localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.ImageSource', displayName: 'Image Source' },
            ImageUrl: { localizationId: 'DevExpress.XtraReports.UI.XRPictureBox.ImageUrl', displayName: 'Image Url' },
            BinaryData: { localizationId: 'DevExpress.XtraReports.UI.XRBarCode.BinaryData', displayName: 'Binary Data' },
            TargetValue: { localizationId: 'DevExpress.XtraReports.UI.XRGauge.TargetValue', displayName: 'Target Value' },
            ActualValue: { localizationId: 'DevExpress.XtraReports.UI.XRGauge.ActualValue', displayName: 'Actual Value' },
            PrintOnPage: { localizationId: 'DevExpress.XtraReports.UI.XRControlEvents.OnPrintOnPage', displayName: 'PrintOnPage' },
            BeforePrint: { localizationId: 'DevExpress.XtraReports.UI.XRControlEvents.OnBeforePrint', displayName: 'BeforePrint' },
            Minimum: { localizationId: 'DevExpress.XtraReports.UI.XRGauge.Minimum', displayName: 'Minimum' },
            Maximum: { localizationId: 'DevExpress.XtraReports.UI.XRGauge.Maximum', displayName: 'Maximum' },
            FillColor: { localizationId: 'DevExpress.XtraReports.UI.XRShape.FillColor', displayName: 'Fill Color' }
        };
        _this._expressionsInfo = {};
        _this._expressionsSerializationInfoCache = {};
        return _this;
    }
    ExpressionWrapper.prototype.dispose = function () {
        this._expressionsInfo = null;
        this._expressionsSerializationInfoCache = null;
        this._fieldListProvider = null;
    };
    ExpressionWrapper.createExpression = function (propertyName, eventName, expression) {
        return {
            getInfo: function () { return expressionBinding_1.expressionBindingSerializationsInfo; },
            eventName: ko.observable(eventName),
            expression: ko.observable(expression),
            propertyName: ko.observable(propertyName)
        };
    };
    ExpressionWrapper.prototype._createPropertyByName = function (propertyName, prefix) {
        var result = {
            propertyName: prefix ? [prefix, propertyName].join('.') : propertyName,
            modelName: propertyName,
            displayName: propertyName,
            editor: editorTemplates_1.designerEditorTemplates.getEditor('reportexpressionComplex')
        };
        if (this._displayNameDictionary[propertyName]) {
            result.localizationId = this._displayNameDictionary[propertyName].localizationId;
            result.displayName = this._displayNameDictionary[propertyName].displayName;
        }
        if (this._valuesDictionary[propertyName]) {
            result.valuesArray = this._valuesDictionary[propertyName];
        }
        return result;
    };
    ExpressionWrapper.prototype._createInfo = function (rootInfo, prefix, path) {
        var _this = this;
        var info = rootInfo;
        for (var i = 0; i < path.length; i++) {
            if (typeof (path[i]) !== 'string' && Array.isArray(path[i])) {
                info.push.apply(info, path[i].map(function (innerProperty) { return _this._createPropertyByName(innerProperty, path[i - 1]); }));
            }
            else {
                var currentInfo = info.filter(function (x) { return x.propertyName === path[i]; })[0];
                if (!currentInfo) {
                    currentInfo = this._createPropertyByName(path[i]);
                    if (i !== path.length - 1) {
                        currentInfo.editor = analytics_widgets_1.editorTemplates.getEditor('objecteditor');
                        currentInfo.info = [];
                    }
                    info.push(currentInfo);
                }
                info = currentInfo.info;
            }
        }
        return rootInfo;
    };
    ExpressionWrapper.prototype._addControlInfo = function (controlType) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (!this._expressionsSerializationInfoCache[controlType]) {
            this._expressionsSerializationInfoCache[controlType] = [];
        }
        this._expressionsSerializationInfoCache[controlType] = this._createInfo(this._expressionsSerializationInfoCache[controlType], '', params.filter(function (x) { return !!x; }));
    };
    ExpressionWrapper.prototype._createSerializationInfo = function (controlType, useEvents) {
        var _this = this;
        if (useEvents === void 0) { useEvents = false; }
        var propertyNames = Object.keys(this._expressionsInfo[controlType]);
        propertyNames.forEach(function (propertyName) {
            var propertyDescriptor = _this._expressionsInfo[controlType][propertyName];
            if (!useEvents) {
                if (propertyDescriptor.events.indexOf('BeforePrint') !== -1)
                    _this._addControlInfo(controlType, propertyDescriptor.group, propertyName, propertyDescriptor.objectProperties);
            }
            else {
                propertyDescriptor.events.forEach(function (eventName) {
                    _this._addControlInfo(controlType, eventName, propertyDescriptor.group, propertyName, propertyDescriptor.objectProperties);
                });
            }
        });
    };
    ExpressionWrapper.prototype._getPropertyDescriptors = function (controlType, expressionName) {
        var propertyNames = Object.keys(this._expressionsInfo[controlType]);
        if (!propertyNames.some(function (propertyName) { return propertyName === expressionName; }))
            return null;
        return this._expressionsInfo[controlType][expressionName];
    };
    ExpressionWrapper.prototype._getExpressionFromArray = function (propertyName, eventName, expressions) {
        return expressions().filter(function (x) {
            return x.propertyName() === propertyName &&
                x.eventName() === eventName;
        })[0];
    };
    ExpressionWrapper.prototype._createExpressionMap = function (propertyName, eventName, expressions, subscriptions, path, summaryRunning) {
        var _this = this;
        var functions = !!summaryRunning && !!summaryRunning(propertyName)
            ? ko.computed(function () { return summaryRunning(propertyName)() ? _this._summaryFunctions() : customFunctions_1.reportFunctionDisplay; })
            : customFunctions_1.reportFunctionDisplay;
        var expressionOptions = new _wrappedExpressionOptions_1.WrappedExpressionOptions({
            path: path || ko.observable(''),
            functions: functions
        }, {
            addExpression: function (newVal) {
                expressions.push(ExpressionWrapper.createExpression(propertyName, eventName, newVal));
            },
            removeExpression: function (expression) {
                expressions.remove(expression);
            }
        }, this._fieldListProvider, eventName);
        expressionOptions._disposables.push(functions);
        expressionOptions.expression(this._getExpressionFromArray(propertyName, eventName, expressions));
        return expressionOptions;
    };
    ExpressionWrapper.prototype._summaryFunctions = function () {
        var createNewItemDelegate = function (funcName, paramCount) {
            return [{
                    paramCount: paramCount,
                    text: 'sum' + funcName + '()',
                    descriptionStringId: 'ReportStringId.ExpressionEditor_Description_Function_Summary' + funcName
                }];
        };
        var summaryCategory = {
            display: 'Summary',
            localizationId: 'ReportStringId.ExpressionEditor_ItemInfo_FunctionSummary',
            category: 'Summary',
            items: {}
        };
        ['Avg', 'Count', 'Sum', 'RunningSum', 'Percentage', 'Max', 'Min', 'Median', 'Var', 'VarP', 'StdDev', 'StdDevP', 'DAvg', 'DCount', 'DSum', 'DVar', 'DVarP', 'DStdDev', 'DStdDevP', 'RecordNumber',
            { name: 'WAvg', paramCount: 2 }
        ].forEach(function (func) {
            if (typeof func === 'string') {
                summaryCategory.items[func] = createNewItemDelegate(func, 1);
            }
            else {
                summaryCategory.items[func.name] = createNewItemDelegate(func.name, func.paramCount);
            }
        });
        return customFunctions_1.reportFunctionDisplay
            .filter(function (cat) { return cat.category != 'Aggregate'; })
            .concat([summaryCategory]);
    };
    ExpressionWrapper.prototype._mapExpressionsToObjectByEventName = function (object, eventName, expressions, subscriptions, path, summaryRunning) {
        var _this = this;
        var properties = object.getInfo();
        properties.forEach(function (info) {
            if (!ko.isObservable(object[info.propertyName])) {
                _this._mapExpressionsToObjectByEventName(object[info.propertyName], eventName, expressions, subscriptions, path, summaryRunning);
            }
            else {
                object[info.propertyName] = _this._createExpressionMap(info.propertyName, eventName, expressions, subscriptions, path, summaryRunning);
                object[info.propertyName].serializationInfo = info;
                subscriptions.push(object[info.propertyName]);
            }
        });
    };
    ExpressionWrapper.prototype._allExpressions = function (object, condition) {
        var _this = this;
        var positive = true;
        var properties = object.getInfo();
        properties.forEach(function (info) {
            if (!positive)
                return;
            if (object[info.propertyName] instanceof Object && !(object[info.propertyName] instanceof _wrappedExpressionOptions_1.WrappedExpressionOptions)) {
                positive = _this._allExpressions(object[info.propertyName], condition);
            }
            else {
                positive = condition(object[info.propertyName]);
            }
        });
        return positive;
    };
    ExpressionWrapper.prototype._isValidExpressions = function (object) {
        return this._allExpressions(object, function (expr) { return expr.isValid(); });
    };
    ExpressionWrapper.prototype._isWarningExpressions = function (object) {
        return !this._allExpressions(object, function (expr) { return !expr.warningMessage(); });
    };
    ExpressionWrapper.prototype._getExpressionByPropertyName = function (object, propertyNameToSearch) {
        if (!object)
            return;
        if (object[propertyNameToSearch]) {
            return object[propertyNameToSearch];
        }
        else {
            var properties = object.getInfo();
            var innerObjectPropertyNames = properties.filter(function (info) { return !(object[info.propertyName] instanceof _wrappedExpressionOptions_1.WrappedExpressionOptions); });
            for (var i = 0; i < innerObjectPropertyNames.length; i++) {
                var result = this._getExpressionByPropertyName(object[innerObjectPropertyNames[i].propertyName], propertyNameToSearch);
                if (result)
                    return result;
            }
        }
    };
    ExpressionWrapper.prototype._mapExpressionsToObject = function (controlType, expressions, path, summaryRunning) {
        var _this = this;
        if (this._bindingMode === _dataBindingMode_1.DataBindingMode.Bindings) {
            return null;
        }
        var useEvents = this._bindingMode === _dataBindingMode_1.DataBindingMode.ExpressionsAdvanced;
        var subscriptions = [];
        if (!this._expressionsSerializationInfoCache[controlType]) {
            this._createSerializationInfo(controlType, useEvents);
        }
        var stateObj = {
            getInfo: function () { return _this._expressionsSerializationInfoCache[controlType]; },
            getExpression: function (propertyName, eventName) {
                if (useEvents) {
                    return _this._getExpressionByPropertyName(stateObj[eventName], propertyName);
                }
                else {
                    return _this._getExpressionByPropertyName(stateObj, propertyName);
                }
            },
            getExpressionsTreeItems: function (expressionName) {
                var propertyDescriptor = _this._getPropertyDescriptors(controlType, expressionName);
                if (!propertyDescriptor)
                    return null;
                var expressionTreeItems = [];
                var isComplexProperty = !!(propertyDescriptor.objectProperties || []).length;
                var generateExpressionItem = function (currentExpressionName, parentExpressionName) {
                    var expressionTreeItem = {
                        innerItems: null,
                        expressionName: currentExpressionName,
                    };
                    var expressionObjPropertyName = parentExpressionName ? [parentExpressionName, currentExpressionName].join('.') : currentExpressionName;
                    if (useEvents) {
                        propertyDescriptor.events.forEach(function (eventName) {
                            var innerExpressionObj = stateObj.getExpression(expressionObjPropertyName, eventName);
                            if (!innerExpressionObj)
                                return;
                            var serializationInfo = innerExpressionObj['serializationInfo'];
                            expressionTreeItem.displayName = serializationInfo && serializationInfo.displayName;
                            expressionTreeItem.localizationId = serializationInfo && serializationInfo.localizationId;
                            expressionTreeItem.innerItems = expressionTreeItem.innerItems || [];
                            var eventInfo = _this._displayNameDictionary[eventName];
                            expressionTreeItem.innerItems.push({
                                eventName: eventName,
                                displayName: eventInfo && eventInfo.displayName,
                                localizationId: eventInfo && eventInfo.localizationId,
                                expressionName: currentExpressionName,
                                expressionObj: innerExpressionObj
                            });
                        });
                    }
                    else {
                        var innerExpressionObj = stateObj.getExpression(expressionObjPropertyName);
                        if (!innerExpressionObj)
                            return;
                        expressionTreeItem.expressionObj = innerExpressionObj;
                        var serializationInfo = innerExpressionObj['serializationInfo'];
                        expressionTreeItem.displayName = serializationInfo.displayName;
                        expressionTreeItem.localizationId = serializationInfo.localizationId;
                    }
                    expressionTreeItems.push(expressionTreeItem);
                };
                if (isComplexProperty) {
                    (propertyDescriptor.objectProperties || []).forEach(function (innerExpresionName) { generateExpressionItem(innerExpresionName, expressionName); });
                }
                else {
                    generateExpressionItem(expressionName);
                }
                return expressionTreeItems;
            },
            dispose: function () {
                subscriptions.forEach(function (x) { return x.dispose(); });
                subscriptions.splice(0);
            },
            validateExpression: function () {
                return _this._isValidExpressions(stateObj);
            },
            hasWarning: function () {
                return _this._isWarningExpressions(stateObj);
            }
        };
        new analytics_utils_1.ModelSerializer().deserialize(stateObj, {});
        if (useEvents) {
            var properties = stateObj.getInfo();
            properties.forEach(function (info) {
                _this._mapExpressionsToObjectByEventName(stateObj[info.propertyName], info.propertyName, expressions, subscriptions, path, summaryRunning);
            });
        }
        else {
            this._mapExpressionsToObjectByEventName(stateObj, 'BeforePrint', expressions, subscriptions, path, summaryRunning);
        }
        subscriptions.push(expressions.subscribe(function (args) {
            args.forEach(function (arg) {
                if (arg.status === 'deleted') {
                    stateObj.getExpression(arg.value.propertyName(), arg.value.eventName()).expression(null);
                }
                else if (arg.status === 'added') {
                    stateObj.getExpression(arg.value.propertyName(), arg.value.eventName()).expression(arg.value);
                }
            });
        }, null, 'arrayChange'));
        return { stateObj: stateObj, subscriptions: subscriptions };
    };
    ExpressionWrapper.prototype.setPropertyDescription = function (controlType, propertyName, events, objectProperties, group) {
        if (!this._expressionsInfo[controlType])
            this._expressionsInfo[controlType] = {};
        this._expressionsInfo[controlType][propertyName] = {
            events: events,
            group: group,
            objectProperties: objectProperties
        };
    };
    ExpressionWrapper.prototype.hidePropertyDescriptions = function (controlType) {
        var _this = this;
        var propertyNames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            propertyNames[_i - 1] = arguments[_i];
        }
        propertyNames.forEach(function (propertyName) {
            if (propertyName.indexOf('.') !== -1) {
                var propertyPath = propertyName.split('.');
                if (propertyPath.length > 2)
                    return;
                var expressionInfo = _this._expressionsInfo[controlType][propertyPath[0]];
                if (!expressionInfo || !expressionInfo.objectProperties)
                    return;
                var index = expressionInfo.objectProperties.indexOf(propertyPath[1]);
                if (index === -1)
                    return;
                expressionInfo.objectProperties.splice(index, 1);
                if (expressionInfo.objectProperties.length === 0)
                    delete _this._expressionsInfo[controlType][propertyPath[0]];
                return;
            }
            delete _this._expressionsInfo[controlType][propertyName];
        });
    };
    ExpressionWrapper.prototype.createExpressionsObject = function (controlType, expressions, path, summaryRunning) {
        var result = this._mapExpressionsToObject(controlType, expressions, path, summaryRunning);
        if (!result)
            return;
        return result.stateObj;
    };
    ExpressionWrapper.prototype.setLocalizationId = function (propertyName, localizationId, displayName) {
        this._displayNameDictionary[propertyName] = {
            localizationId: localizationId,
            displayName: displayName || propertyName
        };
    };
    ExpressionWrapper.prototype.setValues = function (propertyName, values) {
        this._valuesDictionary[propertyName] = values;
    };
    return ExpressionWrapper;
}(analytics_utils_1.Disposable));
exports.ExpressionWrapper = ExpressionWrapper;
