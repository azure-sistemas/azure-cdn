﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\crosstab\printOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
exports.crossTabPrintOptionsInfo = [
    {
        propertyName: 'printLayout', modelName: '@PrintLayout', displayName: 'PrintLayout', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabPrintOptions.PrintLayout', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'AcrossOnly', valuesArray: [
            { displayValue: 'AcrossOnly', value: 'AcrossOnly', localizationId: 'DevExpress.XtraReports.UI.PrintLayout.AcrossOnly' },
            { displayValue: 'AcrossThenDown', value: 'AcrossThenDown', localizationId: 'DevExpress.XtraReports.UI.PrintLayout.AcrossThenDown' },
        ]
    }, { propertyName: 'acrossThenDownOffset', modelName: '@AcrossThenDownOffset', displayName: 'Across Then Down Offset', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabPrintOptions.AcrossThenDownOffset', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), defaultVal: 10 },
    { propertyName: 'repeatRowHeaders', modelName: '@RepeatRowHeaders', displayName: 'Repeat Row Headers', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabPrintOptions.RepeatRowHeaders', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true, from: analytics_utils_1.parseBool },
    { propertyName: 'repeatColumnHeaders', modelName: '@RepeatColumnHeaders', displayName: 'Repeat Column Headers', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabPrintOptions.RepeatColumnHeaders', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true, from: analytics_utils_1.parseBool },
    { propertyName: 'printTotalsForSingleValues', modelName: '@PrintTotalsForSingleValues', displayName: 'Print Totals For Single Values', localizationId: 'DevExpress.XtraReports.UI.CrossTab.CrossTabPrintOptions.PrintTotalsForSingleValues', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), defaultVal: true, from: analytics_utils_1.parseBool }
];
exports.crossTabPrintOptions = { propertyName: 'printOptions', modelName: 'PrintOptions', localizationId: 'DevExpress.XtraReports.UI.XRCrossTab.PrintOptions', displayName: 'Print Options', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: exports.crossTabPrintOptionsInfo };
