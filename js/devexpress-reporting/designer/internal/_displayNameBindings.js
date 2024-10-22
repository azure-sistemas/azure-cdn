﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_displayNameBindings.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _htmlMarkUpConverter_1 = require("./_htmlMarkUpConverter");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var $ = require("jquery");
ko.bindingHandlers['controlDisplayName'] = {
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var value = valueAccessor(), surface = ko.unwrap(value);
        var parameters = surface.displayNameParameters();
        var setElementText = function (value) { return $(element).text(value ? ('[' + value + ']') : ''); };
        if (parameters.isExpression) {
            $(element).text(parameters.text);
            var expressionConverter = new analytics_internal_1.DisplayExpressionConverter(bindingContext.$root.displayNameProvider());
            expressionConverter.toDisplayExpression(parameters.dataMember, parameters.text).done(function (result) {
                $(element).text(result);
            });
        }
        else if (parameters.dataMember) {
            setElementText(parameters.dataMember);
            bindingContext.$root.displayNameProvider()
                .getDisplayName(parameters.dataSource, parameters.dataMember, parameters.dataMemberOffset, false)
                .done(function (data) { return setElementText(data); })
                .fail(function () { return setElementText(parameters.dataMember); });
        }
        else {
            if (!parameters.allowMarkupText) {
                $(element).text(parameters.text || '');
            }
            else {
                new _htmlMarkUpConverter_1.ValueConverter(parameters).appendTo(element);
            }
        }
    }
};
ko.bindingHandlers['displayNameExtender'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var value = ko.unwrap(valueAccessor());
        var displayName = ko.observable('');
        var displayNameLoader = ko.computed(function () {
            if (value.dataMember()) {
                var displayNameProvider = bindingContext.$root.displayNameProvider.peek();
                var promise = value.path ? displayNameProvider.getDisplayNameByPath(value.path(), value.dataMember()) :
                    displayNameProvider.getDisplayName(value.dataSource(), value.dataMember(), value.dataMemberOffset, value.includeDataSourceName);
                promise.done(function (data) { return displayName(data); })
                    .fail(function () { return displayName(value.dataMember()); });
            }
            else {
                displayName('');
            }
        }).extend({ rateLimit: 0 });
        analytics_internal_1.addDisposeCallback(element, function () {
            displayNameLoader.dispose();
        });
        var innerBindingContext = bindingContext.extend({ $displayName: displayName });
        ko.applyBindingsToDescendants(innerBindingContext, element);
        return { controlsDescendantBindings: true };
    }
};
ko.virtualElements.allowedBindings['displayNameExtender'] = true;
