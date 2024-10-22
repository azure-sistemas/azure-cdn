﻿/**
* DevExpress HTML/JS Reporting (common\types.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertMapToKeyValuePair(object) {
    var result = [];
    if (object) {
        Object.keys(object).forEach(function (key) {
            result.push({ Key: key, Value: object[key] });
        });
    }
    return result;
}
exports.convertMapToKeyValuePair = convertMapToKeyValuePair;
