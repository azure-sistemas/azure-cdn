﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_paginator.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var MobilePaginator = (function (_super) {
    __extends(MobilePaginator, _super);
    function MobilePaginator(reportPreview, gallery) {
        var _this = _super.call(this) || this;
        _this.visible = ko.observable(false).extend({ notify: 'always' });
        _this._disposables.push(_this.text = ko.computed(function () {
            setTimeout(function () { _this.visible(true); }, 1);
            if (reportPreview.pageIndex() === -1) {
                return analytics_utils_1.getLocalization('0 pages', 'ASPxReportsStringId.WebDocumentViewer_0Pages');
            }
            else {
                var ofText = analytics_utils_1.getLocalization('of', 'ASPxReportsStringId.ToolBarItemText_OfLabel');
                var pageText = analytics_utils_1.getLocalization('Page', 'ASPxReportsStringId.ToolBarItemText_PageLabel');
                return pageText + ' ' + gallery.currentBlockText() + ' ' + ofText + ' ' + reportPreview.pages().length;
            }
        }));
        return _this;
    }
    return MobilePaginator;
}(analytics_utils_1.Disposable));
exports.MobilePaginator = MobilePaginator;
ko.bindingHandlers['dxrdMobilePaginator'] = {
    init: function (element, valueAccessor) {
        var values = valueAccessor();
        var $element = $(element);
        var timeoutId = null;
        var hideAnimationTimeoutId = null;
        values.visible.subscribe(function (newVal) {
            if (newVal) {
                $element.removeClass('dxrdp-hide').addClass('dxrdp-show');
                timeoutId && clearTimeout(timeoutId);
                timeoutId = setTimeout(function () { values.visible(false); }, 2000);
            }
            else {
                $element.removeClass('dxrdp-show').addClass('dxrdp-hide');
                hideAnimationTimeoutId && clearTimeout(hideAnimationTimeoutId);
                hideAnimationTimeoutId = setTimeout(function () {
                    $element.removeClass('dxrdp-hide');
                }, 500);
            }
        });
    }
};
