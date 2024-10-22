﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_sizeUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var $ = require("jquery");
function stringToPosition(position) {
    var lowerCased = (position || '').toLowerCase();
    if (!lowerCased || lowerCased === 'default') {
        return null;
    }
    var top = lowerCased.indexOf('top') !== -1;
    var right = lowerCased.indexOf('right') !== -1;
    return { top: top, bottom: !top, right: right, left: !right };
}
exports.stringToPosition = stringToPosition;
function getDockedElementCallback($targetElement, $viewer, $window, selector, position) {
    if (position === void 0) { position = null; }
    if (!selector)
        return $.noop;
    return function (viewer) {
        if ($viewer.length === 0)
            $viewer = $(viewer);
        if ($targetElement.length === 0)
            $targetElement = $viewer.find(selector);
        if ($window.length === 0)
            $window = $(window);
        if (!position || position.bottom) {
            var elementTop = parseInt($targetElement.css('bottom')) + $targetElement.height();
            var viewerTop = $viewer.offset().top;
            var viewerHeight = $viewer.height();
            var windowContentHeight = $window.height() + $window.scrollTop();
            var result = viewerTop + viewerHeight - windowContentHeight;
            if (result < viewerHeight - elementTop) {
                result = Math.max(0, result);
                var transform = 'translateY(-' + result * analytics_internal_1.accessibilityFontSizeZoomFactor() + 'px)';
                $targetElement.css({
                    '-webkit-transform': transform,
                    'transform': transform
                });
            }
        }
        else {
            var previewWrapper = $viewer.find('.dxrd-preview-wrapper')[0];
            var clientRect = previewWrapper && previewWrapper.getBoundingClientRect();
            if (!clientRect || clientRect.top < 0 && (clientRect.height + clientRect.top < $targetElement.outerHeight()))
                return;
            var translateY = clientRect.top < 0 ? -clientRect.top : 0;
            var transform = 'translateY(' + translateY * analytics_internal_1.accessibilityFontSizeZoomFactor() + 'px)';
            $targetElement.css({
                '-webkit-transform': transform,
                'transform': transform
            });
        }
    };
}
exports.getDockedElementCallback = getDockedElementCallback;
function _getRightAreaWidth($container) {
    var rightAreaWidth = ($container.find('.dxrd-right-panel:visible').outerWidth() || 0) + ($container.find('.dxrd-right-tabs:visible').outerWidth() || 0);
    return isNaN(rightAreaWidth) ? 0 : rightAreaWidth;
}
function updatePreviewContentSize(previewSize, root, rtl) {
    var _cashedSizeFactorClass = 'lg';
    return function (tabPanelPosition) {
        var $_root = $(root);
        var $root = $_root.find('.dxrd-preview');
        var $viewPort = $(root).children('.dx-designer-viewport');
        var sizeFactor = analytics_internal_1.getSizeFactor($_root.outerWidth());
        if (!!$viewPort.length && _cashedSizeFactorClass !== sizeFactor) {
            $viewPort.removeClass('dx-designer-viewport-' + _cashedSizeFactorClass);
            $viewPort.addClass('dx-designer-viewport-' + sizeFactor);
        }
        _cashedSizeFactorClass = sizeFactor;
        var rightAreaWidth = _getRightAreaWidth($root);
        var surfaceWidth = ($root.width() - rightAreaWidth - 10) * analytics_internal_1.accessibilityFontSizeZoomFactor();
        var cssStyleData = (tabPanelPosition === analytics_utils_1.TabPanel.Position.Left) ? { 'right': '', 'left': rightAreaWidth } : { 'right': rightAreaWidth, 'left': '' };
        $root.find('.dxrd-preview-wrapper').css(cssStyleData);
        previewSize(surfaceWidth);
    };
}
exports.updatePreviewContentSize = updatePreviewContentSize;
function updatePreviewZoomWithAutoFit(width, height, $element, autoFitBy) {
    if (autoFitBy === void 0) { autoFitBy = constants_1.ZoomAutoBy.WholePage; }
    var $previewWrapper = $element.closest('.dxrd-preview-wrapper');
    var $preview = $element.closest('.dxrd-preview');
    if ($previewWrapper.length === 0 || $preview.length === 0) {
        return 1;
    }
    var surfaceWidth = $preview.width() - _getRightAreaWidth($preview) - 10;
    var topAreaHeight = parseFloat($previewWrapper.css('top').split('px')[0]);
    var designerHeight = $preview.outerHeight();
    var surfaceHeight = designerHeight - topAreaHeight;
    if (autoFitBy === constants_1.ZoomAutoBy.PageWidth) {
        return (surfaceWidth - 12) / width;
    }
    var heightZoom = surfaceHeight / (height + 6);
    var widthZoom = surfaceWidth / width;
    return Math.min(heightZoom, widthZoom);
}
exports.updatePreviewZoomWithAutoFit = updatePreviewZoomWithAutoFit;
