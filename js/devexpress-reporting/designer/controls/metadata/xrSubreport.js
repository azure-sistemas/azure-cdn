﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\xrSubreport.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var xrSubreport_1 = require("../xrSubreport");
var scriptMetadata_1 = require("./properties/scriptMetadata");
var metadata_1 = require("./properties/metadata");
var metadataGroups_1 = require("./properties/metadataGroups");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var editorTemplates_1 = require("../../widgets/editorTemplates");
var dataBindingInfo_1 = require("../../dataObjects/metadata/dataBindingInfo");
var formattingrules_1 = require("./properties/formattingrules");
exports.reportSourceUrl = { propertyName: 'reportSourceUrl', modelName: '@ReportSourceUrl', defaultVal: '', editor: editorTemplates_1.designerEditorTemplates.getEditor('reportSourceUrl'), displayName: 'Report Source Url', localizationId: 'DevExpress.XtraReports.UI.XRSubreport.ReportSourceUrl' };
exports.reportSource = { propertyName: 'reportSource', modelName: 'ReportSource', from: xrSubreport_1.SubreportViewModel.from, toJsonObject: xrSubreport_1.SubreportViewModel.toJson };
exports.parameterBindingSerializationInfo = dataBindingInfo_1.dataBindingBaseSerializationInfo.concat([
    { propertyName: 'parameterName', modelName: '@ParameterName', displayName: 'Parameter Name', localizationId: 'DevExpress.XtraReports.UI.ParameterBinding.ParameterName', editor: analytics_widgets_1.editorTemplates.getEditor('combobox') },
    { propertyName: 'fakeBinding', displayName: 'Binding', localizationId: 'DevExpress.XtraReports.Design.DataBinding.Binding', link: true, editor: { header: 'dxrd-dataBinding', editorType: analytics_widgets_1.FieldListEditor } }
]);
exports.parameterBindings = { propertyName: 'parameterBindings', modelName: 'ParameterBindings', displayName: 'Parameter Bindings', localizationId: 'DevExpress.XtraReports.UI.XRSubreport.ParameterBindings', array: true, editor: analytics_widgets_1.editorTemplates.getEditor('commonCollection'), addHandler: xrSubreport_1.ParameterBinding.createNew, template: '#dxrd-commonCollectionItem' };
exports.generateOwnPages = { propertyName: 'generateOwnPages', defaultVal: false, modelName: '@GenerateOwnPages', displayName: 'Generate Own Pages', localizationId: 'DevExpress.XtraReports.UI.XRSubreport.GenerateOwnPages', editor: analytics_widgets_1.editorTemplates.getEditor('bool'), from: analytics_utils_1.parseBool };
exports.subreportSerializationsInfo = [
    exports.reportSource, exports.reportSourceUrl, scriptMetadata_1.subreportScripts, exports.parameterBindings, metadata_1.bookmarkParent, metadata_1.canShrink, exports.generateOwnPages, formattingrules_1.formattingRuleLinks
].concat(metadataGroups_1.sizeLocation, metadataGroups_1.baseControlProperties.filter(function (x) { return x.modelName != metadata_1.tag.modelName; }));
