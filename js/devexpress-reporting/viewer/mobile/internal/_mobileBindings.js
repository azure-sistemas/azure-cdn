﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_mobileBindings.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _eventProcessor_1 = require("./_eventProcessor");
var events_1 = require("devextreme/events");
require("devextreme/events/transform");
require("devextreme/events/pointer");
var ko = require("knockout");
var scroll_view_1 = require("devextreme/ui/scroll_view");
ko.bindingHandlers['mobileZoom'] = {
    init: function (element, valueAccessor) {
        var options = valueAccessor();
        var scroll;
        var zoom = options.zoom();
        events_1.on(element, 'dxpinch', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var scale = e['scale'];
            var newZoom = zoom;
            newZoom *= scale;
            newZoom = Math.max(0.15, Math.min(2, newZoom));
            options.zoom(newZoom);
        });
        events_1.on(element, 'dxpinchstart', function (e) {
            scroll = scroll_view_1.default.getInstance(element.getElementsByClassName('dxrd-scrollView-mobile')[0]);
            e.stopPropagation();
            e.preventDefault();
            options.zoomUpdating(true);
            scroll && scroll.option('disabled', true);
            zoom = options.zoom.peek();
        });
        events_1.on(element, 'dxpinchend', function (e) {
            e.stopPropagation();
            options.zoomUpdating(false);
            setTimeout(function () {
                scroll && scroll.option('disabled', false);
                scroll && scroll.refresh();
            }, 10);
        });
    }
};
ko.bindingHandlers['slide'] = {
    init: function (element, valueAccessor) {
        var slideOptionsValue = valueAccessor();
        var isStarted = false;
        var processor = new _eventProcessor_1.EventProcessor(element, slideOptionsValue);
        events_1.on(element, 'dxpointerdown', function (e) {
            processor.start(e);
            isStarted = true;
        });
        events_1.on(element, 'dxpointermove', function (e) {
            isStarted && processor.move(e);
        });
        ['dxpointercancel', 'dxpointerleave', 'dxpointerup'].forEach(function (value) {
            events_1.on(element, value, function (e) {
                if (isStarted) {
                    processor.end(e);
                    isStarted = false;
                }
            });
        });
    }
};
