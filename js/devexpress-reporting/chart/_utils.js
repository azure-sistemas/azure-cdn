﻿/**
* DevExpress HTML/JS Reporting (chart\_utils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
function getSeriesClassName(typeName) {
    return typeName.toLowerCase().split('seriesview')[0];
}
exports.getSeriesClassName = getSeriesClassName;
function deserializeModelArray(model, creator, prefix) {
    var array = ko.observableArray();
    array(analytics_utils_1.deserializeArray(model || {}, function (item) { return creator(item, array); })());
    array()['innerActions'] = [{
            text: analytics_utils_1.getLocalization('Add', 'ChartStringId.MenuItemAdd'),
            imageClassName: 'dxrd-image-add',
            imageTemplateName: 'dxrd-svg-operations-add',
            disabled: ko.observable(false),
            visible: true,
            clickAction: function () {
                array.push(creator({ '@Name': analytics_internal_1.getUniqueName(array().map(function (x) { return x['name'] && x['name'](); }), prefix) }, array));
            }
        }];
    return array;
}
exports.deserializeModelArray = deserializeModelArray;
