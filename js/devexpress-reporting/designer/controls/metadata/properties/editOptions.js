﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\editOptions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var editOptions_1 = require("../../properties/editOptions");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
exports.editOptionsSerializationInfo = [
    { propertyName: 'enabled', modelName: '@Enabled', displayName: 'Enabled', localizationId: 'DevExpress.XtraReports.UI.EditOptions.Enabled', defaultVal: false, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('boolSelect') },
    { propertyName: 'id', modelName: '@ID', displayName: 'ID', localizationId: 'DevExpress.XtraReports.UI.EditOptions.ID', editor: analytics_widgets_1.editorTemplates.getEditor('text') },
    { propertyName: 'readOnly', modelName: '@ReadOnly', displayName: 'Read Only', localizationId: 'DevExpress.XtraReports.UI.EditOptions.ReadOnly', defaultVal: false, from: analytics_utils_1.parseBool, editor: analytics_widgets_1.editorTemplates.getEditor('boolSelect') }
];
exports.editOptions = {
    propertyName: 'editOptions',
    modelName: 'EditOptions',
    displayName: 'Edit Options', localizationId: 'DevExpress.XtraReports.UI.XRLabel.EditOptions',
    editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'),
    from: function (model, serializer) { return new editOptions_1.EditOptions(model, serializer); },
    toJsonObject: function (value, serializer) { return serializer.serialize(value); }
};
exports.textEditOptions = analytics_internal_1.extend({}, exports.editOptions, {
    propertyName: 'textEditOptions',
    from: function (model, serializer) { return new editOptions_1.TextEditOptions(model, serializer); }
});
