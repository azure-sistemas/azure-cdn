﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\registerEditors.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var nameEditor_1 = require("./nameEditor");
var formatStringEditor_1 = require("./formatStringEditor");
var dataSourceEditor_1 = require("./dataSourceEditor");
var propertyGridEditors_1 = require("./propertyGridEditors");
var explorerEditors_1 = require("./explorerEditors");
var reportComplexExpressionEditor_1 = require("./expressioneditor/reportComplexExpressionEditor");
var reportExpressionEditor_1 = require("./expressioneditor/reportExpressionEditor");
var reportUrlEditor_1 = require("./reportUrlEditor");
var bandEditors_1 = require("./bandEditors");
var formattingRuleEditor_1 = require("./formattingRuleEditor");
var undoEditors_1 = require("./undoEditors");
var chartValueBindingEditor_1 = require("./chartValueBindingEditor");
var pivotGridCriteriaEditor_1 = require("./pivotGridCriteriaEditor");
var fieldsComboboxEditor_1 = require("./fieldsComboboxEditor");
var expressionableFontEditor_1 = require("./expressionableFontEditor");
var dataSourceSelectBox_1 = require("./dataSourceSelectBox");
var editorTemplates_1 = require("./editorTemplates");
var gaugeStyleEditor_1 = require("./gaugeStyleEditor");
var summaryEditor_1 = require("./summaryEditor");
var _bandLevelEditor_1 = require("../internal/_bandLevelEditor");
var _editorTemplates_1 = require("../../chart/internal/_editorTemplates");
var analytics_widgets_2 = require("@devexpress/analytics-core/analytics-widgets");
function registerEditors() {
    editorTemplates_1.designerEditorTemplates.registerEditors({
        formatEditor: { header: 'dxrd-formatstring', editorType: formatStringEditor_1.FormatStringEditor },
        dataSource: { header: 'dxrd-datasource', editorType: dataSourceEditor_1.DataSourceEditor },
        dataBindings: { header: 'dxrd-dataBindings', content: 'dxrd-dataBindingsContent', editorType: propertyGridEditors_1.DataBindingsEditor },
        dataBinding: { header: 'dxrd-dataBinding', content: 'dxrd-dataBindingContent', editorType: propertyGridEditors_1.DataBindingEditor },
        reportExplorer: { header: 'dxrd-reportexplorer-editor', editorType: explorerEditors_1.ExplorerEditor },
        reportSourceUrl: { header: 'dxrd-reportSourceUrl', editorType: reportUrlEditor_1.ReportUrlEditor },
        bands: { header: 'dxrd-bands', editorType: bandEditors_1.BandsEditor },
        runningBand: { header: 'dxrd-bands', editorType: bandEditors_1.RunningBandEditor },
        sortingBand: { header: 'dxrd-bands', content: 'dx-objectEditorContent', editorType: bandEditors_1.SortingBandEditor },
        style: { header: 'dxrd-style', content: 'dxrd-styleContent' },
        stylePriority: { header: 'dxrd-stylePriority' },
        contentByType: { header: 'dxrd-content-type', content: 'dx-objectEditorContent', editorType: propertyGridEditors_1.ContentByTypeEditor },
        lookUpValues: { custom: 'dxrd-lookUpValues' },
        reportexpression: { header: 'dxrd-reportexpression', editorType: reportExpressionEditor_1.ReportExpressionEditor },
        reportexpressionComplex: { header: 'dxrd-reportexpression-complex', editorType: reportComplexExpressionEditor_1.ReportComplexExpressionEditor },
        drillDownControls: { header: 'dxrd-reportexplorer-editor', editorType: explorerEditors_1.DrillDownEditor },
        pivotGridFields: { custom: 'dxrd-pivotGridFields' },
        scriptsBox: { header: 'dxrd-scriptsbox' },
        formattingRule: { custom: 'dxrd-formattingRuleCollection', editorType: formattingRuleEditor_1.FormattingRuleEditor },
        toclevel: { custom: 'dxrd-levelCollection' },
        calculatedFields: { custom: 'dxrd-calculatedFields' },
        parameters: { custom: 'dxrd-parameters' },
        reportRtlProperty: { header: 'dxrd-reportRtlProperty' },
        comboboxUndo: { header: 'dx-combobox-undo', editorType: undoEditors_1.ComboboxUndoEditor },
        comboboxPageBreak: { header: 'dx-combobox', editorType: bandEditors_1.PageBreakBandEditor },
        fontUndo: { header: 'dx-emptyHeader', content: 'dx-objectEditorContentUndo', editorType: propertyGridEditors_1.FontEditorUndo },
        chartValueBinding: { header: 'dxrd-chartValueBinding', editorType: chartValueBindingEditor_1.ChartValueBindingEditor },
        name: { header: 'dxrd-name', editorType: nameEditor_1.NameEditor },
        bandLevel: { header: 'dx-numeric-undo', editorType: _bandLevelEditor_1.BandLevelEditor },
        pivotCriteria: { header: 'dxrd-pivotcriteria', editorType: pivotGridCriteriaEditor_1.PivotGridCriteriaEditor },
        fieldsCombobox: { header: 'dxrd-fields-combobox', editorType: fieldsComboboxEditor_1.FieldsComboboxEditor },
        richTextLoad: { header: 'dxrd-richtext-loadfile', editorType: analytics_widgets_1.Editor },
        summaryEditor: { header: 'dxrd-summaryeditor-header', content: 'dxrd-objectEditorContent', editorType: summaryEditor_1.SummaryEditor },
        expressionableFont: { header: 'dx-emptyHeader', content: 'dx-objectEditorContent', editorType: expressionableFontEditor_1.ExpressionableFontEditor },
        fontModificatorsHighlightable: { custom: 'dx-modificators-highlightable' },
        parametersCheckbox: { custom: 'dxrd-parameters-checkbox' },
        dataSourceSelectBox: { header: 'dxrd-datasource-combobox', editorType: dataSourceSelectBox_1.DataSourceSelectBox },
        localizationSelectBox: { header: 'dxrd-localization-combobox', editorType: dataSourceSelectBox_1.DataSourceSelectBox },
        pdfContentLoad: { header: 'dxrd-pdfcontent-loadfile', editorType: analytics_widgets_1.Editor },
        viewStyle: { header: 'dxrd-viewStyle', editorType: gaugeStyleEditor_1.GaugeStyleEditor }
    });
    _editorTemplates_1.editorTemplates.getEditor('dataMemberChart').header = analytics_widgets_2.editorTemplates.getEditor('dataMember').header;
    _editorTemplates_1.editorTemplates.getEditor('fieldChart').header = analytics_widgets_2.editorTemplates.getEditor('field').header;
    _editorTemplates_1.editorTemplates.getEditor('valueDataMember').header = analytics_widgets_2.editorTemplates.getEditor('field').header;
}
exports.registerEditors = registerEditors;
