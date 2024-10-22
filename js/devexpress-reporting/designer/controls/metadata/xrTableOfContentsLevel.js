﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrTableOfContentsLevel.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./properties/metadata");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var defaultTableOfContentsLevelHeight_1 = require("../defaultTableOfContentsLevelHeight");
var font = { propertyName: 'font', localizable: true, modelName: '@Font', defaultVal: 'Times New Roman, 9.75pt', displayName: 'Font', localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevelBase.Font', editor: analytics_widgets_1.editorTemplates.getEditor('font') };
var backColor = { propertyName: 'backColor', modelName: '@BackColor', defaultVal: 'Transparent', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, displayName: 'Background Color', localizationId: 'DevExpress.XtraReports.UI.XRControl.BackColor', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') };
var foreColor = { propertyName: 'foreColor', modelName: '@ForeColor', defaultVal: 'Black', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, displayName: 'Foreground Color', localizationId: 'DevExpress.XtraReports.UI.XRControl.ForeColor', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor') };
exports.baseTocLevelSerializationsInfo = [
    backColor,
    font,
    foreColor,
    { propertyName: 'height', modelName: '@Height', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: defaultTableOfContentsLevelHeight_1.levelDefaultHeight, displayName: 'Height', localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevelBase.Height', from: analytics_utils_1.floatFromModel, editorOptions: { min: 10 } }
].concat(metadata_1.paddingGroup);
exports.tocLevelSerializationsInfo = [
    { propertyName: 'leaderSymbol', modelName: '@LeaderSymbol', editor: analytics_widgets_1.editorTemplates.getEditor('text'), defaultVal: '.', displayName: 'Leader Symbol', localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevel.LeaderSymbol', editorOptions: { maxLength: 1 } },
    { propertyName: 'indent', modelName: '@Indent', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: null, displayName: 'Indent', localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevel.Indent', from: analytics_utils_1.floatFromModel }
].concat(exports.baseTocLevelSerializationsInfo);
