﻿/**
* DevExpress HTML/JS Reporting (common\metadata.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
exports.previewBackColor = { propertyName: 'backColor', modelName: '@BackColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString };
exports.previewSides = { propertyName: 'borders', modelName: '@Sides' };
exports.previewBorderColor = { propertyName: 'borderColor', modelName: '@BorderColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString };
exports.previewBorderStyle = { propertyName: 'borderStyle', modelName: '@BorderStyle' };
exports.previewBorderDashStyle = { propertyName: 'borderDashStyle', modelName: '@BorderDashStyle' };
exports.previewBorderWidth = { propertyName: 'borderWidth', modelName: '@BorderWidthSerializable', from: analytics_utils_1.floatFromModel };
exports.previewForeColor = { propertyName: 'foreColor', modelName: '@ForeColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString };
exports.previewFont = { propertyName: 'font', modelName: '@Font' };
exports.previewPadding = { propertyName: 'padding', modelName: '@Padding', from: analytics_elements_1.PaddingModel.from };
exports.previewTextAlignment = { propertyName: 'textAlignment', modelName: '@TextAlignment' };
exports.brickStyleSerializationsInfo = [
    exports.previewBackColor,
    exports.previewSides,
    exports.previewBorderColor,
    exports.previewBorderStyle,
    exports.previewBorderDashStyle,
    exports.previewBorderWidth,
    exports.previewForeColor,
    exports.previewFont,
    exports.previewPadding,
    exports.previewTextAlignment
];
exports.defaultCulture = 'Default';
exports.availableCultures = ko.observable((_a = {},
    _a[exports.defaultCulture] = '(Default)',
    _a));
