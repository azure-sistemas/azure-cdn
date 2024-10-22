﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPdfContent.js)
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
var xrControl_1 = require("./xrControl");
var xrPdfContent_1 = require("./metadata/xrPdfContent");
var ko = require("knockout");
var _reportRenderingService_1 = require("../services/_reportRenderingService");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var _xrTodoControl_1 = require("./_xrTodoControl");
var XRPdfContentViewModel = (function (_super) {
    __extends(XRPdfContentViewModel, _super);
    function XRPdfContentViewModel(model, parent, serializer) {
        var _this = _super.call(this, model, parent, serializer) || this;
        _this.imageSource = ko.observable('');
        if (!!_this.sourceUrl())
            _this.source(null);
        var parentSize = function () { return (_this.parentModel() ? _this.parentModel().size.width() : 0); };
        _this._disposables.push(_this.sourceUrl.subscribe(function (newVal) {
            if (!!newVal)
                _this.source(null);
            _this._getPdfContentData(!!newVal);
        }), _this.source.subscribe(function (newVal) {
            if (!!newVal)
                _this.sourceUrl('');
            _this._getPdfContentData(!!newVal);
        }), ko.computed(function () {
            if (_this.generateOwnPages()) {
                _this.size.width(parentSize());
                _this.location.x(0);
            }
        }), _this.location.x.subscribe(function (val) {
            if (_this.generateOwnPages())
                _this.location.x(0);
        }), _this.size.width.subscribe(function (val) {
            if (_this.generateOwnPages())
                _this.size.width(parentSize());
        }), _this.generateOwnPages.subscribe(function (val) {
            _this._getPdfContentData(true);
        }), _this.pageRange.subscribe(function (val) {
            _this._getPdfContentData(false);
        }));
        _this.generateOwnPages.valueHasMutated();
        _this._disposables.push(_this.textContent = ko.pureComputed(function () {
            var sourceUrlExpression = _this.getExpressionBinding('SourceUrl');
            var sourceExpression = _this.getExpressionBinding('Source');
            var prefix = analytics_internal_1.getLocalization('Source', 'DevExpress.XtraReports.UI.XRPdfContent.Source');
            var suffix = analytics_internal_1.getLocalization('(none)', 'DxDesignerStringId.None');
            if ((_this.sourceUrl())) {
                prefix = analytics_internal_1.getLocalization('Source Url', 'DevExpress.XtraReports.UI.XRPdfContent.SourceUrl');
                suffix = _this.sourceUrl();
            }
            else if (sourceUrlExpression != null) {
                prefix = analytics_internal_1.getLocalization('Source Url', 'DevExpress.XtraReports.UI.XRPdfContent.SourceUrl');
                suffix = sourceUrlExpression;
            }
            else if (_this.source()) {
                suffix = analytics_internal_1.getLocalization('PDF Content', 'ReportStringId.XRPdfContent_Content');
            }
            else if (sourceExpression != null) {
                suffix = sourceExpression;
            }
            return prefix + ': ' + suffix;
        }));
        return _this;
    }
    XRPdfContentViewModel.prototype.canFit = function () {
        return this.size.width() / this.size.height() != this.imageWidth / this.imageHeight;
    };
    XRPdfContentViewModel.prototype.fitToContent = function () {
        if (!this.imageSource())
            return;
        var width = this.size.width();
        var height = this.size.height();
        var coif = this.imageWidth / this.imageHeight;
        if (coif === 0 || !this.canFit())
            return;
        if (width / height > this.imageWidth / this.imageHeight) {
            this.size.width(height * coif);
        }
        else {
            this.size.height(width / coif);
        }
    };
    XRPdfContentViewModel.prototype._getPdfContentData = function (checkSource) {
        var _this = this;
        var source = this.sourceUrl() || this.source();
        if (this.generateOwnPages() || (checkSource && (!source && !this._sourceItem || !!this._sourceItem && this._sourceItem === source)))
            return;
        this._sourceItem = source;
        _reportRenderingService_1.ReportRenderingService.getPdfContentData(this).done(function (result) {
            _this.pageCount(result.PageCount);
            _this.imageSource('data:image/png;base64,' + result.Img);
            _this.imageWidth = result.Width;
            _this.imageHeight = result.Height;
        }).fail(function (jqXHR) {
            analytics_internal_1.NotifyAboutWarning('It is impossible to get Pdf Content Preview');
        });
    };
    XRPdfContentViewModel.prototype._getExpressionNameByPropertyName = function (propertyName) {
        var modelName = _super.prototype._getExpressionNameByPropertyName.call(this, propertyName);
        if (!!modelName && xrPdfContent_1.pdfSource.modelName.indexOf(modelName) !== -1)
            return 'Source';
        return modelName;
    };
    return XRPdfContentViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRPdfContentViewModel = XRPdfContentViewModel;
var XRPdfContentSurface = (function (_super) {
    __extends(XRPdfContentSurface, _super);
    function XRPdfContentSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this.selectiontemplate = 'dxrd-pdfcontent-selection';
        _this.contenttemplate = 'dxrd-pdfcontent-control-content';
        _this.template = 'dxrd-control';
        _this.displayText = function () { return _this.getControlModel().name(); };
        _this.generateOwnPages = control.generateOwnPages;
        _this._handles = ko.observable(_this._getHandles(_this.generateOwnPages()));
        _this._disposables.push(_this.contentCss = ko.computed(function () {
            var imageSource = control.imageSource();
            if (_this.generateOwnPages() || !imageSource)
                return { background: 'unset' };
            return analytics_internal_1.extend({}, { background: ' url(' + imageSource + ') 50% 50% / contain no-repeat content-box transparent' });
        }));
        return _this;
    }
    XRPdfContentSurface.prototype._getHandles = function (generateOwnPages) {
        return generateOwnPages ? 's,n' : 'all';
    };
    XRPdfContentSurface.prototype.getResizableOptions = function (resizeHandler) {
        var _this = this;
        this._disposables.push(this.generateOwnPages.subscribe(function (newVal) {
            _this._handles(_this._getHandles(newVal));
        }));
        return analytics_internal_1.extend(true, {}, resizeHandler, {
            handles: this._handles
        });
    };
    return XRPdfContentSurface;
}(_xrTodoControl_1.TodoControlSurface));
exports.XRPdfContentSurface = XRPdfContentSurface;
