﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_chartFieldListExtender.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ChartFieldListExtender = (function () {
    function ChartFieldListExtender() {
    }
    ChartFieldListExtender.prototype.beforeItemsFilled = function (request, items) {
        if (request.ref !== 'PivotGrid' && request.id !== 'PivotGrid')
            return false;
        switch (request.path) {
            case 'dataMember': return true;
            case 'seriesDataMember': {
                items.push({ name: 'Arguments', displayName: 'Arguments', specifics: 'String' }, { name: 'Series', displayName: analytics_utils_1.getLocalization('Series', 'DevExpress.XtraReports.UI.XRChart.Series'), specifics: 'String' }, { name: 'Values', displayName: analytics_utils_1.getLocalization('Values', 'DevExpress.XtraCharts.SeriesPoint.Values'), specifics: 'Integer' });
                return true;
            }
            case 'valueDataMembers': {
                items.push({ name: 'Values', displayName: analytics_utils_1.getLocalization('Values', 'DevExpress.XtraCharts.SeriesPoint.Values'), specifics: 'Integer' });
                return true;
            }
        }
    };
    return ChartFieldListExtender;
}());
exports.ChartFieldListExtender = ChartFieldListExtender;
