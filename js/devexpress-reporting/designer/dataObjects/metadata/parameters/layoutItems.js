﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\parameters\layoutItems.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var orientationValues = [
    { displayValue: 'Horizontal', value: 'Horizontal' },
    { displayValue: 'Vertical', value: 'Vertical' }
];
var parameter = { propertyName: 'parameter', modelName: '@Parameter', link: true };
var layoutitemtype = { propertyName: 'layoutItemType', modelName: '@LayoutItemType', displayName: 'LayoutItemType', localizationId: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') };
var titlevisible = { propertyName: 'titleVisible', modelName: '@TitleVisible', displayName: 'TitleVisible', localizationId: '', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true, from: analytics_utils_1.parseBool };
var title = { propertyName: 'title', modelName: '@Title', displayName: 'Title', localizationId: '', editor: analytics_widgets_1.editorTemplates.getEditor('text'), defaultVal: '' };
var bordervisible = { propertyName: 'borderVisible', modelName: '@BorderVisible', displayName: 'BorderVisible', localizationId: '', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true, from: analytics_utils_1.parseBool };
var expanded = { propertyName: 'expanded', modelName: '@Expanded', displayName: 'Expanded', localizationId: '', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true, from: analytics_utils_1.parseBool };
var showexpandbutton = { propertyName: 'showExpandButton', modelName: '@ShowExpandButton', displayName: 'ShowExpandButton', localizationId: '', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: false, from: analytics_utils_1.parseBool };
var orientation = { propertyName: 'orientation', modelName: '@Orientation', displayName: 'Orientation', localizationId: '', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Vertical', valuesArray: orientationValues };
var labelSizeScope = { propertyName: 'labelSizeScope', modelName: '@LabelSizeScope', displayName: 'LabelSizeScope', localizationId: '', editor: analytics_widgets_1.editorTemplates.getEditor('text'), defaultVal: '' };
var subItems = { propertyName: 'items', modelName: 'Items', array: true };
exports.groupLayoutItemInfo = [layoutitemtype, titlevisible, title, bordervisible, expanded, showexpandbutton, orientation, labelSizeScope, subItems];
var labelorientation = { propertyName: 'labelOrientation', modelName: '@LabelOrientation', displayName: 'LabelOrientation', localizationId: '', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'Horizontal', valuesArray: orientationValues };
exports.parameterLayoutItemInfo = [layoutitemtype, labelorientation, parameter];
exports.separatorLayoutItemInfo = [layoutitemtype];
exports.parameterPanelLayoutMapper = {
    'Parameter': exports.parameterLayoutItemInfo,
    'Separator': exports.separatorLayoutItemInfo,
    'Group': exports.groupLayoutItemInfo,
};
