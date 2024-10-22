﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportRenderingService.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _requests_1 = require("../../chart/internal/_requests");
var settings_1 = require("../utils/settings");
var _chart_1 = require("../../chart/internal/meta/_chart");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var $ = require("jquery");
var _utils_1 = require("../../common/utils/_utils");
var ReportRenderingService = (function () {
    function ReportRenderingService() {
    }
    ReportRenderingService.getChartImage = function (surface) {
        return _requests_1.ChartRequests.getChartImage(settings_1.HandlerUri(), new analytics_utils_1.ModelSerializer().serialize(surface._control['chart'], _chart_1.chartSerializationsInfo), surface.contentWidthWithoutZoom(), surface.contentHeightWithoutZoom());
    };
    ReportRenderingService.getShapeImage = function (surface) {
        var _usefulRect = surface.getUsefulRect();
        var params = {
            shapeType: surface._control['Shape']()['shapeType'] && surface._control['Shape']()['shapeType']() || 'Ellipse',
            width: _usefulRect.width,
            lineWidth: surface._control['lineWidth'](),
            fillColor: analytics_utils_1.colorToString(surface._control['fillColor']()),
            lineStyle: surface._control['lineStyle'] && surface._control['lineStyle']() || 'Solid',
            height: _usefulRect.height,
            fillet: surface._control['Shape']()['fillet'] && surface._control['Shape']()['fillet']() || 0,
            numberOfSides: surface._control['Shape']()['numberOfSides'] && surface._control['Shape']()['numberOfSides']() || 3,
            angle: surface._control['angle'] && surface._control['angle']() || 0,
            arrowHeight: surface._control['Shape']()['arrowHeight'] && surface._control['Shape']()['arrowHeight']() || 20,
            arrowWidth: surface._control['Shape']()['arrowWidth'] && surface._control['Shape']()['arrowWidth']() || 20,
            concavity: surface._control['Shape']()['concavity'] && surface._control['Shape']()['concavity']() || 5,
            starPointCount: surface._control['Shape']()['starPointCount'] && surface._control['Shape']()['starPointCount']() || 3,
            horizontalLineWidth: surface._control['Shape']()['horizontalLineWidth'] && surface._control['Shape']()['horizontalLineWidth']() || 10,
            verticalLineWidth: surface._control['Shape']()['verticalLineWidth'] && surface._control['Shape']()['verticalLineWidth']() || 10,
            tipLength: surface._control['Shape']()['tipLength'] && surface._control['Shape']()['tipLength']() || 30,
            tailLength: surface._control['Shape']()['tailLength'] && surface._control['Shape']()['tailLength']() || 30,
            foreColor: analytics_utils_1.colorToString(surface._control['foreColor'] && surface._control['foreColor']() || 'black'),
            stretch: surface._control['stretch'] && surface._control['stretch']() || false,
            padding: surface._control['padding'] && surface._control['padding']() || analytics_elements_1.PaddingModel.defaultVal,
            dpi: surface._control['dpi'] && surface._control['dpi']() || 100
        };
        return settings_1.HandlerUri() + '?actionKey=shapeGlyph&arg=' + encodeURIComponent(JSON.stringify(params));
    };
    ReportRenderingService.getRichImage = function (surface, propertyName) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'renderRich', encodeURIComponent(JSON.stringify({
            layout: JSON.stringify($.extend(new analytics_utils_1.ModelSerializer().serialize(surface._control), {
                '@Font': surface._control['font']()
            })),
            scale: surface._context.zoom(),
            text: _utils_1.transformNewLineCharacters(surface._control['textRtf']() || ''),
            rtf: _utils_1.transformNewLineCharacters(surface._control['_rtf']() || ''),
            format: surface._control['format'](),
            base64rtf: surface._control['serializableRtfString'](),
            propertyName: propertyName
        })));
    };
    ReportRenderingService.getPdfContentData = function (control) {
        return analytics_internal_1.ajax(settings_1.HandlerUri(), 'renderPdfContent', encodeURIComponent(JSON.stringify({
            sourceBase64: control.source() || '',
            sourceUrl: control.sourceUrl() || '',
            pageRange: control.pageRange() || ''
        })));
    };
    return ReportRenderingService;
}());
exports.ReportRenderingService = ReportRenderingService;
