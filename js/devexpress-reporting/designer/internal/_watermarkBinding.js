﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_watermarkBinding.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
ko.bindingHandlers['dxWatermark'] = {
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var options = valueAccessor();
        var leftMargin = options.forLeftMargin;
        var band = options.band;
        var reportSurface = options.reportSurface;
        var backgroundRect = band.backgroundRect();
        var pxs = function (x) { return x === 0 ? '0' : (x + 'px'); };
        var url = function (s) { return s ? analytics_internal_1.formatUnicorn('url("{0}")', s) : s; };
        var size = function (w, h) { return pxs(w) + ' ' + pxs(h); };
        var getOffset = function (size, vertical) {
            var noOffsetKey = vertical ? 'Top' : 'Left', fullOffsetKey = vertical ? 'Bottom' : 'Right', pageSize = vertical ? reportSurface.pageHeight() : reportSurface.pageWidth(), align = options.align;
            return (pageSize - size) * (align.indexOf(noOffsetKey) >= 0 ? 0 : align.indexOf(fullOffsetKey) >= 0 ? 1 : 0.5);
        };
        element.style['height'] = pxs(backgroundRect.height);
        element.style['width'] = pxs(leftMargin ? reportSurface.margins.left() : band._width());
        element.style['background-image'] = url(options.image);
        element.style['opacity'] = (255 - options.transparency) / 255 + '';
        element.style['background-repeat'] = options.tiling ? 'repeat' : 'no-repeat';
        var xOffset = 0, yOffset = 0, _a = reportSurface._watermarkImageNaturalSize(), width = _a.width, height = _a.height;
        switch (options.viewMode) {
            case 'Clip':
                width *= reportSurface.zoom();
                height *= reportSurface.zoom();
                xOffset = getOffset(width, false);
                yOffset = getOffset(height, true);
                element.style['background-size'] = size(width, height);
                break;
            case 'Stretch':
                xOffset = yOffset = 0;
                element.style['background-size'] = size(reportSurface.pageWidth(), reportSurface.pageHeight());
                break;
            case 'Zoom':
                var xRatio = reportSurface.pageWidth() / width, yRatio = reportSurface.pageHeight() / height, ratio;
                if (xRatio < yRatio) {
                    ratio = xRatio;
                    xOffset = 0;
                    yOffset = getOffset(ratio * height, true);
                }
                else {
                    ratio = yRatio;
                    xOffset = getOffset(ratio * width, false);
                    yOffset = 0;
                }
                element.style['background-size'] = size(width * ratio, height * ratio);
                break;
        }
        element.style['background-position-y'] = pxs(yOffset - backgroundRect.top);
        element.style['background-position-x'] = pxs(xOffset - (backgroundRect.left || 0) - (leftMargin ? 0 : reportSurface.margins.left()));
    }
};
