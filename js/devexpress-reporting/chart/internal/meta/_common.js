﻿/**
* DevExpress HTML/JS Reporting (chart\internal\meta\_common.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
exports.defaultBooleanValues = [
    { value: 'True', displayValue: 'True', localizationId: 'StringId.DefaultBooleanTrue' },
    { value: 'False', displayValue: 'False', localizationId: 'StringId.DefaultBooleanFalse' },
    { value: 'Default', displayValue: 'Default', localizationId: 'StringId.DefaultBooleanDefault' }
];
exports.scaleTypeValues = [
    { value: 'Qualitative', displayValue: 'Qualitative', localizationId: 'DevExpress.XtraCharts.ScaleType.Qualitative' },
    { value: 'Numerical', displayValue: 'Numerical', localizationId: 'DevExpress.XtraCharts.ScaleType.Numerical' },
    { value: 'DateTime', displayValue: 'DateTime', localizationId: 'DevExpress.XtraCharts.ScaleType.DateTime' },
    { value: 'Auto', displayValue: 'Auto', localizationId: 'DevExpress.XtraCharts.ScaleType.Auto' }
];
exports.stringAlignmentValues = [
    { value: 'Near', displayValue: 'Near', localizationId: 'ChartStringId.WizStringAlignmentNear' },
    { value: 'Center', displayValue: 'Center', localizationId: 'ChartStringId.WizStringAlignmentCenter' },
    { value: 'Far', displayValue: 'Far', localizationId: 'ChartStringId.WizStringAlignmentFar' }
];
exports.angle = { propertyName: 'angle', modelName: '@Angle', defaultVal: 0, from: analytics_utils_1.floatFromModel, displayName: 'Angle', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), localizationId: 'DevExpress.XtraReports.UI.XRLabel.Angle' };
exports.borderColor = { propertyName: 'borderColor', modelName: '@BorderColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, displayName: 'Border Color', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), localizationId: 'DevExpress.XtraReports.UI.XRControl.BorderColor' };
exports.backColor = { propertyName: 'backColor', modelName: '@BackColor', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, displayName: 'Background Color', editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), localizationId: 'DevExpress.XtraReports.UI.XRControl.BackColor' };
exports.dataMember = { propertyName: 'dataMember', modelName: '@DataMember' };
exports.text = { propertyName: 'text', modelName: '@Text', defaultVal: '', displayName: 'Text', editor: analytics_widgets_1.editorTemplates.getEditor('text'), localizationId: 'ASPxReportsStringId.ExportName_txt' };
exports.visible = { propertyName: 'visible', modelName: '@Visible', defaultVal: true, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), displayName: 'Visible', localizationId: 'DevExpress.XtraReports.UI.XRControl.Visible' };
exports.name = { propertyName: 'name', modelName: '@Name', displayName: 'Name', editor: analytics_widgets_1.editorTemplates.getEditor('text'), localizationId: 'DevExpress.XtraReports.UI.XRControl.Name' };
exports.tag = { propertyName: 'tag', modelName: '@Tag', displayName: 'Tag', editor: analytics_widgets_1.editorTemplates.getEditor('text'), localizationId: 'DevExpress.XtraReports.UI.XRControl.Tag' };
exports.legendText = { propertyName: 'legendText', modelName: '@LegendText', displayName: 'Legend Text', editor: analytics_widgets_1.editorTemplates.getEditor('text'), localizationId: 'DevExpress.XtraCharts.Strip.LegendText' };
exports.showInLegend = { propertyName: 'showInLegend', modelName: '@ShowInLegend', displayName: 'Show In Legend', defaultVal: true, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool, localizationId: 'DevExpress.XtraCharts.Indicator.ShowInLegend' };
exports.thickness = { propertyName: 'thickness', modelName: '@Thickness', displayName: 'Thickness', defaultVal: 1, editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), localizationId: 'DevExpress.XtraCharts.TickmarksBase.Thickness' };
exports.visibility = { propertyName: 'visibility', modelName: '@Visibility', displayName: 'Visibility', defaultVal: 'Default', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: exports.defaultBooleanValues, localizationId: 'DevExpress.XtraCharts.BorderBase.Visibility' };
exports.color = { propertyName: 'color', modelName: '@Color', displayName: 'Color', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), localizationId: 'DevExpress.XtraCharts.SeriesViewBase.Color' };
exports.titleAlignment = { propertyName: 'titleAlignment', modelName: '@Alignment', displayName: 'Alignment', defaultVal: 'Center', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: exports.stringAlignmentValues, localizationId: 'DevExpress.XtraReports.UI.XRBarCode.Alignment' };
exports.textPattern = { propertyName: 'textPattern', modelName: '@TextPattern', displayName: 'Text Pattern', editor: analytics_widgets_1.editorTemplates.getEditor('text'), localizationId: 'DevExpress.XtraCharts.TotalLabel.TextPattern' };
exports.textAlignment = { propertyName: 'textAlignment', modelName: '@TextAlignment', displayName: 'Text Alignment', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), valuesArray: exports.stringAlignmentValues, localizationId: 'DevExpress.XtraReports.UI.XRControl.TextAlignment' };
exports.maxLineCount = { propertyName: 'maxLineCount', modelName: '@MaxLineCount', displayName: 'Max Line Count', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), localizationId: 'DevExpress.XtraCharts.SeriesLabelBase.MaxLineCount' };
exports.maxWidth = { propertyName: 'maxWidth', modelName: '@MaxWidth', displayName: 'Max Width', editor: analytics_widgets_1.editorTemplates.getEditor('numeric'), localizationId: 'DevExpress.XtraPivotGrid.PivotGridOptionsSelection.MaxWidth' };
exports.textColor = { propertyName: 'textColor', modelName: '@TextColor', displayName: 'Text Color', from: analytics_utils_1.colorFromString, toJsonObject: analytics_utils_1.colorToString, editor: analytics_widgets_1.editorTemplates.getEditor('customColorEditor'), localizationId: 'DevExpress.XtraCharts.TotalLabel.TextColor' };
exports.antialiasing = { propertyName: 'antialiasing', modelName: '@Antialiasing', displayName: 'Antialiasing', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool, localizationId: 'DevExpress.XtraCharts.SwiftPlotSeriesView.Antialiasing' };
exports.font = { propertyName: 'font', modelName: '@Font', displayName: 'Font', defaultVal: 'Tahoma, 8pt', editor: analytics_widgets_1.editorTemplates.getEditor('font'), localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevelBase.Font' };
exports.enableAxisXZooming = { propertyName: 'enableAxisXZooming', modelName: '@EnableAxisXZooming', displayName: 'Enable Axis X Zooming' };
exports.enableAxisXScrolling = { propertyName: 'enableAxisXScrolling', modelName: '@EnableAxisXScrolling', displayName: 'Enable Axis X Scrolling' };
exports.enableAxisYZooming = { propertyName: 'enableAxisYZooming', modelName: '@EnableAxisYZooming', displayName: 'Enable Axis Y Zooming' };
exports.enableAxisYScrolling = { propertyName: 'enableAxisYScrolling', modelName: '@EnableAxisYScrolling', displayName: 'Enable Axis Y Scrolling' };
exports.rotated = { propertyName: 'rotated', modelName: '@Rotated', displayName: 'Rotated', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool, localizationId: 'DevExpress.XtraCharts.XYDiagram.Rotated' };
exports.typeNameNotShow = { propertyName: 'typeNameSerializable', modelName: '@TypeNameSerializable' };
exports.left = { propertyName: 'left', modelName: '@Left', displayName: 'Left', localizationId: 'AnalyticsCoreStringId.PaddingInfo.Left', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
exports.right = { propertyName: 'right', modelName: '@Top', displayName: 'Top', localizationId: 'AnalyticsCoreStringId.PaddingInfo.Top', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
exports.top = { propertyName: 'top', modelName: '@Right', displayName: 'Right', localizationId: 'AnalyticsCoreStringId.PaddingInfo.Right', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
exports.bottom = { propertyName: 'bottom', modelName: '@Bottom', displayName: 'Bottom', localizationId: 'AnalyticsCoreStringId.PaddingInfo.Bottom', editor: analytics_widgets_1.editorTemplates.getEditor('numeric') };
exports.margin = { propertyName: 'chartMargins', modelName: 'Margins', displayName: 'Margins', info: [exports.left, exports.right, exports.top, exports.bottom], editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), localizationId: 'DevExpress.XtraReports.UI.XtraReport.Margins' };
exports.font18 = { propertyName: 'font18', modelName: '@Font', displayName: 'Font', defaultVal: 'Tahoma, 18pt', editor: analytics_widgets_1.editorTemplates.getEditor('font'), localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevelBase.Font' };
exports.font12 = { propertyName: 'font12', modelName: '@Font', displayName: 'Font', defaultVal: 'Tahoma, 12pt', editor: analytics_widgets_1.editorTemplates.getEditor('font'), localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevelBase.Font' };
exports.font8 = { propertyName: 'font8', modelName: '@Font', displayName: 'Font', defaultVal: 'Tahoma, 8pt', editor: analytics_widgets_1.editorTemplates.getEditor('font'), localizationId: 'DevExpress.XtraReports.UI.XRTableOfContentsLevelBase.Font' };
exports.paneSerializationsInfo = [exports.enableAxisXScrolling, exports.enableAxisYScrolling, exports.enableAxisYZooming, exports.enableAxisXZooming, exports.backColor, exports.borderColor];
exports.defaultPane = { propertyName: 'defaultPane', modelName: 'DefaultPane', displayName: 'Default Pane', localizationId: 'ChartStringId.DefaultPaneName', info: exports.paneSerializationsInfo, defaultVal: {}, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.additionalPaneSerializationsInfo = [exports.name].concat(exports.paneSerializationsInfo);
exports.filterString = { propertyName: '_filterString', modelName: '@FilterString' };
exports.filterStringEditable = { propertyName: 'filterString', displayName: 'Filter String', localizationId: 'DevExpress.XtraReports.UI.XtraReportBase.FilterString', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('filterEditor') };
