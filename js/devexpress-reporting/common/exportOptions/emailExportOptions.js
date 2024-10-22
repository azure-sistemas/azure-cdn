﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\emailExportOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var AdditionalRecipientModel = (function () {
    function AdditionalRecipientModel(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    AdditionalRecipientModel.prototype.getInfo = function () {
        return exports.additionalRecipientSerializationsInfo;
    };
    AdditionalRecipientModel.createNew = function () {
        return new AdditionalRecipientModel({});
    };
    return AdditionalRecipientModel;
}());
exports.AdditionalRecipientModel = AdditionalRecipientModel;
exports.additionalRecipientSerializationsInfo = [
    { propertyName: 'ContactName', modelName: '@ContactName', displayName: 'ContactName', localizationId: 'DevExpress.XtraPrinting.Recipient.ContactName', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'Address', modelName: '@Address', displayName: 'Address', localizationId: 'DevExpress.XtraPrinting.Recipient.Address', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'Prefix', modelName: '@Prefix', displayName: 'Prefix', localizationId: 'DevExpress.XtraPrinting.Recipient.Prefix', defaultVal: 'SMTP:', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    {
        propertyName: 'fieldType', modelName: '@FieldType', displayName: 'Field Type', localizationId: 'DevExpress.XtraPrinting.Recipient.FieldType', defaultVal: 'TO', editor: analytics_widgets_1.editorTemplates.getEditor('combobox'), from: analytics_utils_1.fromEnum,
        valuesArray: [
            { value: 'TO', displayValue: 'TO', localizationId: 'DevExpress.XtraPrinting.RecipientFieldType.TO' },
            { value: 'CC', displayValue: 'CC', localizationId: 'DevExpress.XtraPrinting.RecipientFieldType.CC' },
            { value: 'BCC', displayValue: 'BCC', localizationId: 'DevExpress.XtraPrinting.RecipientFieldType.BCC' }
        ]
    },
];
