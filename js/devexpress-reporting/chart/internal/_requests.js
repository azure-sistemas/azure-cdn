﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_requests.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var _handlerUri_1 = require("../_handlerUri");
var ChartRequests = (function () {
    function ChartRequests() {
    }
    ChartRequests.getChartImage = function (uri, chartLayout, width, height) {
        return analytics_internal_1.ajax(uri, 'chart', encodeURIComponent(JSON.stringify({
            width: width,
            height: height,
            Chart: JSON.stringify({
                'ChartXmlSerializer': {
                    '@version': '16.2.0.0',
                    Chart: chartLayout
                }
            })
        })));
    };
    ChartRequests.fieldListCallback = function (request) {
        var requestJson = JSON.stringify(request);
        var encodedJson = encodeURIComponent(requestJson);
        return analytics_internal_1.ajax(_handlerUri_1.HandlerUri(), 'fieldList', encodedJson);
    };
    return ChartRequests;
}());
exports.ChartRequests = ChartRequests;
