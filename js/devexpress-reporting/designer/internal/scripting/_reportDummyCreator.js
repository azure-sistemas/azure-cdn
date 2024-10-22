﻿/**
* DevExpress HTML/JS Reporting (designer\internal\scripting\_reportDummyCreator.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ReportDummyCreator = (function () {
    function ReportDummyCreator() {
    }
    ReportDummyCreator._createDummy = function (report) {
        Object.keys(report).forEach(function (propertyName) {
            if (analytics_internal_1.isPlainObject(report[propertyName])) {
                ReportDummyCreator._createDummy(report[propertyName]);
                if (analytics_internal_1.isEmptyObject(report[propertyName]) || (Object.keys(report[propertyName]).length === 1 && report[propertyName]['@Ref']))
                    delete report[propertyName];
            }
            else if (propertyName !== '@Ref' &&
                propertyName.indexOf('Item') !== 0 &&
                propertyName !== '@Name' &&
                propertyName !== 'Name' &&
                propertyName !== '@ControlType' &&
                propertyName !== '@ObjectType' &&
                propertyName !== '@Content' &&
                propertyName !== '@Type' &&
                report[propertyName].toString().indexOf('#Ref-') !== 0) {
                delete report[propertyName];
            }
        });
        return report;
    };
    return ReportDummyCreator;
}());
exports.ReportDummyCreator = ReportDummyCreator;
