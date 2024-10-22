﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\extension.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ExtensionModel = (function () {
    function ExtensionModel(model, serializer) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        serializer.deserialize(this, model);
    }
    ExtensionModel.prototype.getInfo = function () {
        return extensionSerializationInfo;
    };
    return ExtensionModel;
}());
exports.ExtensionModel = ExtensionModel;
var extensionSerializationInfo = [
    { propertyName: 'key', modelName: '@Key' },
    { propertyName: 'value', modelName: '@Value' }
];
