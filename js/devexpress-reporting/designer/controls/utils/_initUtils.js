﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_initUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
function getUnitProperties(object) {
    var properties = object && object['constructor'] && object['constructor'].unitProperties;
    if (properties) {
        return {
            reCalculateObject: function (coef) {
                for (var i = 0; i < properties.length; i++) {
                    var propertyName = properties[i];
                    var property = object['_' + propertyName] || object[propertyName];
                    var innerProperties = getUnitProperties(property);
                    if (innerProperties) {
                        innerProperties.reCalculateObject(coef);
                    }
                    else {
                        !!ko.unwrap(property) && property(analytics_internal_1.roundingXDecimals(ko.unwrap(property) * coef));
                    }
                }
            },
            calcProperty: function (val, coef) { return val && analytics_internal_1.roundingXDecimals(val * coef); },
            properties: properties
        };
    }
}
exports.getUnitProperties = getUnitProperties;
