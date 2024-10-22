﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_autoScrolling.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var scroll_view_1 = require("devextreme/ui/scroll_view");
var ko = require("knockout");
var $ = require("jquery");
ko.bindingHandlers['dxAutoScrolling'] = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $(element);
        var rect = null;
        var values = valueAccessor();
        var scrollView = scroll_view_1.default['getInstance'](element);
        if (scrollView) {
            var timeout = null, interval = null, clearTimings = function () {
                timeout && clearTimeout(timeout);
                interval && clearInterval(interval);
                timeout = null;
                interval = null;
            }, scrolling = function (inc) {
                timeout = setTimeout(function () {
                    interval = setInterval(function () {
                        var newPosition = scrollView.scrollTop() + inc;
                        if (newPosition < 0) {
                            newPosition = 0;
                        }
                        scrollView['scrollTo'](newPosition);
                    }, 50);
                }, 500);
            }, move = function (event) {
                if (values.active()) {
                    if (!rect) {
                        rect = element.getBoundingClientRect();
                    }
                    if (event.clientY <= rect.top + 30) {
                        !timeout && scrolling(-30);
                    }
                    else if (event.clientY >= rect.bottom - 30) {
                        !timeout && scrolling(30);
                    }
                    else {
                        clearTimings();
                    }
                }
            }, subscription = values.active.subscribe(function (newVal) {
                rect = null;
                clearTimings();
            });
            element.addEventListener('mousemove', move);
            analytics_internal_1.addDisposeCallback(element, function () {
                element.removeEventListener('mousemove', move);
                subscription.dispose();
            });
        }
    }
};
