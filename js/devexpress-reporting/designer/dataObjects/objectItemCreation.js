﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\objectItemCreation.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lookupSettings_1 = require("./parameters/lookupSettings");
var rangeSettings_1 = require("./parameters/rangeSettings");
var universalDataSource_1 = require("./universalDataSource");
var dataFederation_1 = require("./dataFederation");
var objectStorageItem_1 = require("./objectStorageItem");
function createNewObjectItem(model, dsHelperProvider, serializer) {
    var objectType = model['@ObjectType'] || '';
    if (objectType.indexOf('StaticListLookUpSettings') !== -1) {
        return new lookupSettings_1.StaticListLookUpSettings(model, dsHelperProvider, serializer);
    }
    else if (objectType.indexOf('DynamicListLookUpSettings') !== -1) {
        return new lookupSettings_1.DynamicListLookUpSettings(model, dsHelperProvider, serializer);
    }
    else if (objectType.indexOf('RangeParametersSettings') !== -1) {
        return new rangeSettings_1.RangeParametersSettings(model, dsHelperProvider, serializer);
    }
    else if (objectType.indexOf('RangeStartParameter') !== -1) {
        return new rangeSettings_1.RangeStartParameter(model, dsHelperProvider, serializer);
    }
    else if (objectType.indexOf('RangeEndParameter') !== -1) {
        return new rangeSettings_1.RangeEndParameter(model, dsHelperProvider, serializer);
    }
    else if (objectType.indexOf('ReportServer') !== -1 && model['@ObjectType'].indexOf('DataSource') !== -1) {
        return new universalDataSource_1.UniversalDataSource(model, dsHelperProvider, serializer);
    }
    else if (objectType.indexOf('DataFederation') !== -1) {
        return new dataFederation_1.DataFederationDataSource(model, dsHelperProvider, serializer);
    }
    return new objectStorageItem_1.ObjectStorageItem(model, dsHelperProvider, serializer);
}
exports.createNewObjectItem = createNewObjectItem;
