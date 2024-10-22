﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_utils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _dateUtils_1 = require("../_dateUtils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var $ = require("jquery");
function createInnerActionsWithPopover(text, id, actions, template) {
    var object = {
        text: text,
        imageClassName: 'dxrd-image-add',
        imageTemplateName: 'dxrd-svg-operations-add',
        disabled: ko.observable(false),
        id: id,
        _visible: ko.observable(false),
        popoverVisible: null,
        togglePopoverVisible: null,
        closePopover: null,
        templateName: 'dxrd-collectionactions-template',
        contentTemplate: template,
        getContainer: function (element, selector) {
            return $(element).parent().find(selector);
        },
        actions: actions
    };
    object.popoverVisible = ko.pureComputed(function () {
        return object._visible();
    });
    object.togglePopoverVisible = function () {
        object._visible(!object._visible());
    };
    object.closePopover = function () {
        object._visible(false);
    };
    return [object];
}
exports.createInnerActionsWithPopover = createInnerActionsWithPopover;
function _isNumericTypeSpecific(specific) {
    return ['Integer', 'Float', 'CalcInteger', 'CalcFloat', 'SumInteger', 'SumFloat'].indexOf(specific) > -1;
}
exports._isNumericTypeSpecific = _isNumericTypeSpecific;
function _isDateTypeSpecific(specific) {
    return ['Date', 'CalcDate', 'SumDate'].indexOf(specific) > -1;
}
exports._isDateTypeSpecific = _isDateTypeSpecific;
function _getUnconvertiblePoint(propertyName, oldValue, newValue, points) {
    var filter = function (_) { return false; };
    if ((oldValue === 'Numerical' && newValue === 'DateTime') || (oldValue === 'DateTime' && newValue === 'Numerical')) {
        filter = function (point) { return point[propertyName]() !== null && point[propertyName]() !== void 0 && point[propertyName]() !== ''; };
    }
    if (oldValue === 'Auto' || oldValue === 'Qualitative')
        if (newValue === 'Numerical') {
            filter = function (point) {
                var number = parseInt(point[propertyName]());
                return isNaN(number) || (typeof number === 'number' && JSON.stringify(number) !== point[propertyName]().toString());
            };
        }
        else if (newValue === 'DateTime') {
            filter = function (point) {
                var date = analytics_internal_1.parseDate(point[propertyName](), false, 'MM/dd/yyyy');
                if (!date)
                    date = _dateUtils_1.parseDate(point[propertyName]());
                return !date;
            };
        }
    return points.filter(filter)[0] || null;
}
exports._getUnconvertiblePoint = _getUnconvertiblePoint;
