﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\dataBinding.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var editorTemplates_1 = require("../../widgets/editorTemplates");
var dataBinding_1 = require("../dataBinding");
var dataBindingInfo_1 = require("./dataBindingInfo");
exports.dataBindings = function (dataBindingsArray) {
    return {
        propertyName: 'dataBindings',
        modelName: 'DataBindings',
        array: true,
        info: dataBindingInfo_1.dataBindingSerializationInfo,
        displayName: 'Data Bindings', localizationId: 'DevExpress.XtraReports.UI.XRControl.DataBindings',
        editor: editorTemplates_1.designerEditorTemplates.getEditor('dataBindings'),
        allDataBindings: dataBindingsArray,
        from: dataBinding_1.DataBinding.initialize
    };
};
