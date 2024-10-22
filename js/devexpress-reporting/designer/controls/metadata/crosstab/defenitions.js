﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\crosstab\defenitions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var xrCrossTabCell_1 = require("./xrCrossTabCell");
exports.crossTabCellWidth = { propertyName: 'width', modelName: '@Width', localizationId: 'AnalyticsCoreStringId.SizeF.Width', defaultVal: 100, from: analytics_utils_1.floatFromModel };
var autoWidthMode = { propertyName: 'autoWidthMode', modelName: '@AutoWidthMode', defaultVal: 'None', valuesArray: xrCrossTabCell_1.autoSizeMode };
var visible = { propertyName: 'visible', modelName: '@Visible', defaultVal: true, from: analytics_utils_1.parseBool };
exports.crossTabColumnDefinitionInfo = [exports.crossTabCellWidth, autoWidthMode, visible];
exports.crossTabCellHeight = { propertyName: 'height', modelName: '@Height', displayName: 'Height', localizationId: 'AnalyticsCoreStringId.SizeF.Height', defaultVal: 25, from: analytics_utils_1.floatFromModel };
var autoHeightMode = { propertyName: 'autoHeightMode', modelName: '@AutoHeightMode', defaultVal: 'None', valuesArray: xrCrossTabCell_1.autoSizeMode };
exports.crossTabRowDefinitionInfo = [exports.crossTabCellHeight, autoHeightMode, visible];
exports.rowDefinitions = { propertyName: '_rowDefinitions', modelName: 'RowDefinitions', array: true, alwaysSerialize: true };
exports.columnDefinitions = { propertyName: '_columnDefinitions', modelName: 'ColumnDefinitions', array: true, alwaysSerialize: true };
