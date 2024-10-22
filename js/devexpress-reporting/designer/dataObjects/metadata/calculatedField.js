﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\calculatedField.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var metadata_1 = require("../../controls/metadata/properties/metadata");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var editorTemplates_1 = require("../../widgets/editorTemplates");
var calculatedFieldScriptsInfo = [
    { propertyName: 'onGetValue', modelName: '@OnGetValue', displayName: 'Get a Value', localizationId: 'DevExpress.XtraReports.UI.CalculatedFieldScripts.OnGetValue', editor: editorTemplates_1.designerEditorTemplates.getEditor('scriptsBox') }
];
exports.calculatedFieldScripts = { propertyName: 'scripts', modelName: 'Scripts', displayName: 'Scripts', localizationId: 'DevExpress.XtraReports.UI.CalculatedField.Scripts', info: calculatedFieldScriptsInfo, editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor') };
exports.calculatedFieldSerializationInfo = [
    { propertyName: 'calculatedFieldName', modelName: '@Name' },
    { propertyName: 'nameEditable', displayName: 'Name', validationRules: analytics_internal_1.nameValidationRules, editor: editorTemplates_1.designerEditorTemplates.getEditor('name'), localizationId: 'DevExpress.XtraReports.UI.XRControl.Name' },
    metadata_1.displayName,
    {
        propertyName: 'fieldType', modelName: '@FieldType', displayName: 'Field Type', localizationId: 'DevExpress.XtraReports.UI.CalculatedField.FieldType', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), defaultVal: 'None', from: analytics_utils_1.fromEnum,
        valuesArray: [
            { value: 'None', displayValue: 'None', localizationId: 'DevExpress.XtraReports.UI.FieldType.None' },
            { value: 'String', displayValue: 'String', localizationId: 'DevExpress.XtraReports.UI.FieldType.String' },
            { value: 'DateTime', displayValue: 'DateTime', localizationId: 'DevExpress.XtraReports.UI.FieldType.DateTime' },
            { value: 'TimeSpan', displayValue: 'TimeSpan', localizationId: 'DevExpress.XtraReports.UI.FieldType.TimeSpan' },
            { value: 'Byte', displayValue: 'Byte', localizationId: 'DevExpress.XtraReports.UI.FieldType.Byte' },
            { value: 'Int16', displayValue: 'Int16', localizationId: 'DevExpress.XtraReports.UI.FieldType.Int16' },
            { value: 'Int32', displayValue: 'Int32', localizationId: 'DevExpress.XtraReports.UI.FieldType.Int32' },
            { value: 'Float', displayValue: 'Float', localizationId: 'DevExpress.XtraReports.UI.FieldType.Float' },
            { value: 'Double', displayValue: 'Double', localizationId: 'DevExpress.XtraReports.UI.FieldType.Double' },
            { value: 'Decimal', displayValue: 'Decimal', localizationId: 'DevExpress.XtraReports.UI.FieldType.Decimal' },
            { value: 'Boolean', displayValue: 'Boolean', localizationId: 'DevExpress.XtraReports.UI.FieldType.Boolean' }
        ]
    },
    metadata_1.dataSource,
    metadata_1.dataMember,
    { propertyName: 'expression', modelName: '@Expression', displayName: 'Expression', localizationId: 'DevExpress.XtraReports.UI.CalculatedField.Expression', defaultVal: '' },
    { propertyName: 'expressionObj', displayName: 'Expression', localizationId: 'DevExpress.XtraReports.UI.CalculatedField.Expression', editor: analytics_widgets_1.editorTemplates.getEditor('expressionEditor') },
    exports.calculatedFieldScripts
];
