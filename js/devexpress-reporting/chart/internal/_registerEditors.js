﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_registerEditors.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _chartDataSourceEditor_1 = require("../widgets/_chartDataSourceEditor");
var _collectionLookupEditor_1 = require("../widgets/_collectionLookupEditor");
var _viewEditor_1 = require("../widgets/_viewEditor");
var _chartDataMemberEditor_1 = require("../widgets/_chartDataMemberEditor");
var _summaryFunctionEditor_1 = require("../widgets/_summaryFunctionEditor");
var _pointsEditor_1 = require("../widgets/_pointsEditor");
var _chartDependencyEditor_1 = require("../widgets/_chartDependencyEditor");
var _undoColorPickerEditor_1 = require("../widgets/_undoColorPickerEditor");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var _editorTemplates_1 = require("./_editorTemplates");
var _positionSeriesLabelEditor_1 = require("../widgets/_positionSeriesLabelEditor");
function registerEditorTemplates() {
    _editorTemplates_1.editorTemplates.registerEditors({
        chartDataSource: { header: 'dxcd-datasource', editorType: _chartDataSourceEditor_1.ChartDataSourceEditor },
        collection: { header: 'dxcd-collection-lookup-header', content: 'dxcd-collection-item', editorType: _collectionLookupEditor_1.CollectionLookupEditorModel },
        views: { header: 'dxcd-viewHeader', content: 'dxcd-viewContent', editorType: _viewEditor_1.ViewEditor },
        fieldChart: { header: 'dxcd-field', editorType: analytics_widgets_1.FieldListEditor },
        dataMemberChart: { header: 'dxcd-field', editorType: analytics_widgets_1.DataMemberEditor },
        valueDataMember: { header: 'dxcd-field', editorType: _chartDataMemberEditor_1.ChartDataMemberEditor },
        comboboxPositionSeriesLabel: { header: 'dx-combobox', editorType: _positionSeriesLabelEditor_1.PositionSeriesLabelEditor },
        panes: { header: 'dxcd-panes-editor' },
        axisX: { header: 'dxcd-axisX-editor' },
        axisY: { header: 'dxcd-axisY-editor' },
        legends: { header: 'dxcd-legends-editor' },
        summaryFunction: { header: 'dx-emptyHeader', content: 'dxcd-summaryFunction-content', editorType: _summaryFunctionEditor_1.SummaryFunctionEditor },
        points: { custom: 'dxcd-pointscollection', editorType: _pointsEditor_1.PointsEditor },
        maxSize: { header: 'dxcd-maxSize', editorType: _chartDependencyEditor_1.ChartDependencyEditor },
        minSize: { header: 'dxcd-minSize', editorType: _chartDependencyEditor_1.ChartDependencyEditor },
        group: { header: 'dxcd-group' },
        undoCustomColorEditor: { header: 'dxcd-color-undo', editorType: _undoColorPickerEditor_1.UndoColorPickerEditor }
    });
}
exports.registerEditorTemplates = registerEditorTemplates;
