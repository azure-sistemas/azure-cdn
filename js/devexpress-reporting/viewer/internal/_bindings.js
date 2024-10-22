﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_bindings.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var _sizeUtils_1 = require("./_sizeUtils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var $ = require("jquery");
ko.bindingHandlers['toView'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var $previewPage = $(element), $container = $previewPage.parent('.dxrd-report-preview-holder'), pageActive = valueAccessor().active, subscription = pageActive.subscribe(function (active) {
            if (active) {
                var pageTop = $previewPage.position().top;
                if (pageTop < 0 && (pageTop + $previewPage.height() < 0) || pageTop >= $container.height()) {
                    $container.scrollTop($container.scrollTop() + pageTop);
                }
            }
        });
        analytics_internal_1.addDisposeCallback(element, function () {
            subscription.dispose();
        });
    }
};
ko.bindingHandlers['lazyImages'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var $element = $(element), enabled = valueAccessor().enabled, load = null, loadVisibleImages = function (time) {
            if (time === void 0) { time = 300; }
            load && clearTimeout(load);
            load = setTimeout(function () {
                if (!enabled()) {
                    return;
                }
                var visibleArea = $element.height() + 100;
                for (var i = 0; i < element.children.length; i++) {
                    var previewPage = element.children[i], rect = previewPage.getBoundingClientRect(), pageTop = rect.top;
                    if (visibleArea > pageTop && pageTop >= 0 || pageTop < 0 && pageTop + rect.height > -100) {
                        var previewPageModel = ko.dataFor(previewPage);
                        previewPageModel && previewPageModel.isClientVisible && previewPageModel.isClientVisible(true);
                    }
                }
            }, time);
        };
        if (ko.isObservable(valueAccessor().updateCallback)) {
            valueAccessor().updateCallback(loadVisibleImages);
        }
        var subscribtion = enabled.subscribe(function (newVal) {
            newVal && loadVisibleImages(500);
        });
        var scrollLoad = function () { return loadVisibleImages(700); };
        element.addEventListener('scroll', scrollLoad);
        loadVisibleImages(500);
        analytics_internal_1.addDisposeCallback(element, function () {
            element.removeEventListener('scroll', scrollLoad);
            subscribtion.dispose();
        });
    }
};
ko.bindingHandlers['textCopier'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var keyDownHandler = function (e) {
            var value = viewModel.getSelectedContent();
            if (!value || !(e.ctrlKey || e.metaKey)
                || $(e.target).is('input:visible,textarea:visible')
                || window.getSelection && window.getSelection() && window.getSelection().toString()
                || document['selection'] && document['selection'].createRange().text) {
                return;
            }
            var $clipboardContainer = $('#clipboard-container');
            $clipboardContainer.empty().show();
            $("<textarea id='clipboard'></textarea>").val(value)
                .appendTo($clipboardContainer)
                .focus()
                .select();
        };
        var keyUpHandler = function (e) {
            if ($(e.target).is('#clipboard')) {
                $('#clipboard-container').empty().hide();
            }
        };
        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);
        analytics_internal_1.addDisposeCallback(element, function () {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        });
    }
};
ko.bindingHandlers['autoFit'] = {
    init: function (element, valueAccessor) {
        var options = valueAccessor();
        var subscriptions = [];
        var updateZoom = function (newOptions) {
            var $element = $(element);
            var autoFitBy = newOptions.autoFitBy();
            if (autoFitBy != constants_1.ZoomAutoBy.None) {
                if (options.skipIfInvisible && $element.filter(':visible').length == 0)
                    return;
                var newZoom = analytics_internal_1.roundingXDecimals(_sizeUtils_1.updatePreviewZoomWithAutoFit(newOptions.width(), newOptions.height(), $element, autoFitBy), true);
                newOptions.zoom(Math.max(newZoom, 0.1));
            }
        };
        updateZoom(options);
        var onResize = function () {
            updateZoom(options);
        };
        window.addEventListener('resize', onResize);
        var subscribe = function (value) {
            if (value) {
                subscriptions.push(value.subscribe(function (newVal) {
                    updateZoom(options);
                }));
            }
        };
        subscribe(options.rightPanelWidth);
        subscribe(options.width);
        subscribe(options.height);
        subscribe(options.autoFitBy);
        subscribe(options.brickLoading);
        subscribe(options.previewSize);
        analytics_internal_1.addDisposeCallback(element, function () {
            window.removeEventListener('resize', onResize);
            subscriptions.forEach(function (subscription) {
                subscription.dispose();
            });
        });
    }
};
ko.bindingHandlers['childStyle'] = {
    init: function (element, valueAccessor) {
        var values = valueAccessor();
        $(element).find(values.selector).css(values.style);
    }
};
