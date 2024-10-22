﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\controlParameter.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./metadata");
var reportFieldListEditor_1 = require("../../../widgets/reportFieldListEditor");
var $ = require("jquery");
var dataBindingInfo_1 = require("../../../dataObjects/metadata/dataBindingInfo");
exports.controlParameterInfos = dataBindingInfo_1.dataBindingBaseSerializationInfo.concat([
    $.extend({}, metadata_1.name, { propertyName: 'parameterName' }),
    { propertyName: 'fakeBinding', displayName: 'Binding', localizationId: 'DevExpress.XtraReports.Design.DataBinding.Binding', link: true, editor: { header: 'dxrd-dataBinding', editorType: reportFieldListEditor_1.ReportFieldListEditor } }
]);
