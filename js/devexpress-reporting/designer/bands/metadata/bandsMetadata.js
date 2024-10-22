﻿/**
* DevExpress HTML/JS Reporting (designer\bands\metadata\bandsMetadata.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var editorTemplates_1 = require("../../widgets/editorTemplates");
exports.drillDownDetailReportExpanded = { propertyName: 'drillDownDetailReportExpanded', modelName: '@DrillDownExpanded', displayName: 'Drill-Down Expanded', localizationId: 'DevExpress.XtraReports.UI.Band.DrillDownExpanded', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool, defaultVal: true };
exports.printAtBottom = { propertyName: 'printAtBottom', modelName: '@PrintAtBottom', defaultVal: false, from: analytics_utils_1.parseBool, displayName: 'Print at Bottom', localizationId: 'DevExpress.XtraReports.UI.ReportFooterBand.PrintAtBottom', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.printAcrossBands = { propertyName: 'printAcrossBands', modelName: '@PrintAcrossBands', defaultVal: false, from: analytics_utils_1.parseBool, displayName: 'Print Across Bands', localizationId: 'DevExpress.XtraReports.UI.Band.PrintAcrossBands', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.repeatEveryPage = { propertyName: 'repeatEveryPage', modelName: '@RepeatEveryPage', displayName: 'Repeat Every Page', localizationId: 'DevExpress.XtraReports.UI.GroupBand.RepeatEveryPage', defaultVal: false, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.pageBreakWithoutAfterValues = [
    { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.PageBreak.None' },
    { value: 'BeforeBand', displayValue: 'Before the Band', localizationId: 'DevExpress.XtraReports.UI.PageBreak.BeforeBand' },
    { value: 'BeforeBandExceptFirstEntry', displayValue: 'Before the Band, Except for the First Entry', localizationId: 'DevExpress.XtraReports.UI.PageBreak.BeforeBandExceptFirstEntry' },
];
exports.pageBreakValues = [].concat(exports.pageBreakWithoutAfterValues, [
    { value: 'AfterBand', displayValue: 'After the Band', localizationId: 'DevExpress.XtraReports.UI.PageBreak.AfterBand' },
    { value: 'AfterBandExceptLastEntry', displayValue: 'After the Band, Except for the Last Entry', localizationId: 'DevExpress.XtraReports.UI.PageBreak.AfterBandExceptLastEntry' }
]);
exports.pageBreak = {
    propertyName: 'pageBreak',
    modelName: '@PageBreak', displayName: 'Page Break', localizationId: 'DevExpress.XtraReports.UI.Band.PageBreak', defaultVal: 'None', from: analytics_utils_1.fromEnum,
    editor: editorTemplates_1.designerEditorTemplates.getEditor('comboboxPageBreak'),
    valuesArray: exports.pageBreakValues
};
exports.keepTogetherWithDetailReports = { propertyName: 'keepTogetherWithDetailReports', modelName: '@KeepTogetherWithDetailReports', defaultVal: false, from: analytics_utils_1.parseBool, displayName: 'Keep Together with Detail Reports', localizationId: 'DevExpress.XtraReports.UI.DetailBand.KeepTogetherWithDetailReports', editor: analytics_widgets_1.editorTemplates.getEditor('bool') };
exports.height = { propertyName: 'height', modelName: '@HeightF', defaultVal: '100', displayName: 'Height', localizationId: 'DevExpress.XtraReports.UI.Band.Height', from: analytics_utils_1.floatFromModel, localizable: true };
exports.level = { propertyName: 'level', modelName: '@Level', displayName: 'Level', localizationId: 'DevExpress.XtraReports.UI.GroupBand.Level', defaultVal: 0, from: analytics_utils_1.floatFromModel, editor: editorTemplates_1.designerEditorTemplates.getEditor('bandLevel') };
exports.drillDownControl = { propertyName: 'drillDownControl', modelName: '@DrillDownControl', displayName: 'Drill-Down Control', localizationId: 'DevExpress.XtraReports.UI.Band.DrillDownControl', link: true, defaultVal: null, editor: editorTemplates_1.designerEditorTemplates.getEditor('drillDownControls') };
