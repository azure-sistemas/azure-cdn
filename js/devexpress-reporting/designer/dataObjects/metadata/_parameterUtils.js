﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\metadata\_parameterUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reportParameterHelper_1 = require("../../helpers/reportParameterHelper");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var parameterSettings_1 = require("../parameters/parameterSettings");
function parameterValueToJsonObject(value) {
    var result = reportParameterHelper_1.ReportParameterHelper.getSerializationValue(value, analytics_utils_1.serializeDate);
    return (result instanceof Array) ? result.join(parameterSettings_1.parameterSeparator) : result;
}
exports.parameterValueToJsonObject = parameterValueToJsonObject;
function collectAvailableParameters(parameters) {
    return parameters.reduce(function (result, parameter) {
        if (parameter.isList)
            result.push.apply(result, parameter.getRangeParameters());
        else
            result.push(parameter);
        return result;
    }, []);
}
exports.collectAvailableParameters = collectAvailableParameters;
