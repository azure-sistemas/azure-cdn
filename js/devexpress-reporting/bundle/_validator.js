﻿/**
* DevExpress HTML/JS Reporting (bundle\_validator.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = '%VERSION%';
function checkVersions() {
    var DevExpress = window.DevExpress;
    var reportingVersion = DevExpress['Reporting']['VERSION'];
    var analyticsVersion = DevExpress['Analytics']['VERSION'];
    if (reportingVersion != analyticsVersion)
        console.warn("Reporting (v" + reportingVersion + ") and Analytics-Core (v" + analyticsVersion + ") versions do not match.");
}
exports.checkVersions = checkVersions;
