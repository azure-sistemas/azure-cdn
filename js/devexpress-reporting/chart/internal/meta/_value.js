﻿/**
* DevExpress HTML/JS Reporting (chart\internal\meta\_value.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _editorTemplates_1 = require("../_editorTemplates");
exports.commonValueSerializationsInfo = [
    { propertyName: 'value', displayName: 'Value', editor: _editorTemplates_1.editorTemplates.getEditor('valueDataMember'), localizationId: 'AnalyticsCoreStringId.FilterEditor_Operand_Type_Value' },
];
exports.valueWeightSerializationsInfo = [
    { propertyName: 'value', displayName: 'Value', editor: _editorTemplates_1.editorTemplates.getEditor('valueDataMember'), localizationId: 'AnalyticsCoreStringId.FilterEditor_Operand_Type_Value' },
    { propertyName: 'weight', displayName: 'Weight', editor: _editorTemplates_1.editorTemplates.getEditor('valueDataMember'), localizationId: 'DevExpress.XtraPivotGrid.PivotKPIType.Weight' },
];
exports.value1Value2SerializationsInfo = [
    { propertyName: 'value1', displayName: 'Value 1', editor: _editorTemplates_1.editorTemplates.getEditor('valueDataMember'), localizationId: 'DevExpress.XtraCharts.ValueLevel.Value_1' },
    { propertyName: 'value2', displayName: 'Value 2', editor: _editorTemplates_1.editorTemplates.getEditor('valueDataMember'), localizationId: 'DevExpress.XtraCharts.ValueLevel.Value_2' },
];
exports.stockValueSerializationsInfo = [
    { propertyName: 'low', displayName: 'Low', editor: _editorTemplates_1.editorTemplates.getEditor('valueDataMember'), localizationId: 'DevExpress.XtraCharts.StockLevel.Low' },
    { propertyName: 'high', displayName: 'High', editor: _editorTemplates_1.editorTemplates.getEditor('valueDataMember'), localizationId: 'DevExpress.XtraCharts.StockLevel.High' },
    { propertyName: 'open', displayName: 'Open', editor: _editorTemplates_1.editorTemplates.getEditor('valueDataMember'), localizationId: 'DevExpress.XtraCharts.StockLevel.Open' },
    { propertyName: 'close', displayName: 'Close', editor: _editorTemplates_1.editorTemplates.getEditor('valueDataMember'), localizationId: 'DevExpress.XtraCharts.StockLevel.Close' },
];
