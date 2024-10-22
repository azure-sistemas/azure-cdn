﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_subreportUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
function subreportControlCollector(target, subreportControls) {
    if (subreportControls === void 0) { subreportControls = []; }
    var visitor = function (target) {
        if (target instanceof xrSubreport_1.XRSubreportViewModel) {
            subreportControls.push(target);
            subreportControlCollector(target['reportSource'], subreportControls);
        }
    };
    visitor(target);
    analytics_internal_1.collectionsVisitor(target, function (collection) {
        collection().forEach(visitor);
    }, ['controls', 'bands']);
    return subreportControls;
}
exports.subreportControlCollector = subreportControlCollector;
var xrSubreport_1 = require("../xrSubreport");
