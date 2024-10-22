﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\emailMetaData.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var emailExportOptions_1 = require("./emailExportOptions");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
exports.nativeFormatOptionsSerializationInfo = [
    { propertyName: 'compressed', modelName: '@Compressed', displayName: 'Compressed', localizationId: 'DevExpress.XtraPrinting.PdfExportOptions.Compressed', defaultVal: true, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool },
    { propertyName: 'showOptionsBeforeSave', modelName: '@ShowOptionsBeforeSave', displayName: 'Show Options Before Save', localizationId: 'DevExpress.XtraPrinting.NativeFormatOptions.ShowOptionsBeforeSave', defaultVal: false, editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool }
];
exports.additionalRecipients = { propertyName: 'additionalRecipients', modelName: 'AdditionalRecipients', displayName: 'Additional Recipients', localizationId: 'DevExpress.XtraPrinting.EmailOptions.AdditionalRecipients', array: true, editor: analytics_widgets_1.editorTemplates.getEditor('commonCollection'), addHandler: emailExportOptions_1.AdditionalRecipientModel.createNew, template: '#dxrd-commonCollectionItem' };
exports.emailOptionsSerializationInfo = [
    { propertyName: 'recipientName', modelName: '@RecipientName', displayName: 'Recipient Name', localizationId: 'DevExpress.XtraPrinting.EmailOptions.RecipientName', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'recipientAddress', modelName: '@RecipientAddress', displayName: 'Recipient Address', localizationId: 'DevExpress.XtraPrinting.EmailOptions.RecipientAddress', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'recipientAddressPrefix', modelName: '@RecipientAddressPrefix', displayName: 'Recipient Address Prefix', localizationId: 'DevExpress.XtraPrinting.EmailOptions.RecipientAddressPrefix', defaultVal: 'SMTP:', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'subject', modelName: '@Subject', displayName: 'Subject', localizationId: 'DevExpress.XtraPrinting.EmailOptions.Subject', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'body', modelName: '@Body', displayName: 'Body', localizationId: 'DevExpress.XtraPrinting.EmailOptions.Body', defaultVal: '', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    exports.additionalRecipients
];
