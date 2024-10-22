﻿/**
* DevExpress HTML/JS Reporting (viewer\binding\jsReportViewerBinding.js)
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
var $ = require("jquery");
var ko = require("knockout");
var jsReportViewer_1 = require("./jsReportViewer");
var eventGenerator_1 = require("../../common/binding/eventGenerator");
var _initializer_1 = require("../internal/_initializer");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var JSReportViewerBinding = (function (_super) {
    __extends(JSReportViewerBinding, _super);
    function JSReportViewerBinding(_options, customEventRaiser) {
        var _this = _super.call(this, _options, customEventRaiser) || this;
        _this._deferreds = [];
        _options.viewerModel = analytics_internal_1._wrapModelInObservable(_options.viewerModel);
        _this.sender = new jsReportViewer_1.JSReportViewer(_options.viewerModel);
        _this._closeReportOnDisposing = !_options.keepReportOnComponentDisposal;
        _options.callbacks && _options.callbacks._eventSenderCreated && _options.callbacks._eventSenderCreated(_this.sender);
        return _this;
    }
    JSReportViewerBinding.prototype.dispose = function () {
        if (this._closeReportOnDisposing && this.sender && this.sender.Close)
            this.sender.Close();
        (this._deferreds || []).forEach(function (deferred) {
            deferred.reject();
        });
        _super.prototype.dispose.call(this);
    };
    JSReportViewerBinding.prototype._initializeEvents = function () {
        var _this = this;
        return this._getAvailableEvents(eventGenerator_1.EventGenerator.generatePreviewEvents(function (eventName, args) {
            _this._fireEvent(eventName, args);
        }));
    };
    JSReportViewerBinding.prototype._initializeCallbacks = function () {
        if (this._options.callbacks) {
            return this._initializeEvents();
        }
    };
    JSReportViewerBinding.prototype._applyBindings = function (model, _$element) {
        this._disposables.push(model);
        _$element.children().remove();
        var child = _$element.append(this._templateHtml).children()[0];
        if (!child)
            return;
        ko.cleanNode(child);
        this._callbacks && this._callbacks.beforeRender && this._callbacks.beforeRender(model);
        ko.applyBindings(model, child);
        this._fireEvent('Init');
    };
    JSReportViewerBinding.prototype._createModel = function (element) {
        this._callbacks = this._initializeCallbacks();
        return _initializer_1.createPreviewModel(this._options, element, this._callbacks, false);
    };
    JSReportViewerBinding.prototype.applyBindings = function (element) {
        var _this = this;
        var _$element = $(element);
        _$element.addClass('dx-designer');
        if (this._options.reportPreview && this._options.parts) {
            this._applyBindings(this._options, _$element);
            return;
        }
        var requestOptions = this._options.requestOptions;
        var applyModel = function () {
            if (requestOptions && requestOptions.invokeAction) {
                _this._options.handlerUri = _this._getServerActionUrl(requestOptions.host, requestOptions.invokeAction);
            }
            _this._deferreds.push(_this._createModel(element)
                .done(function (previewModel) {
                _this.sender.previewModel = previewModel;
                if (_this._options.reportUrl) {
                    if (ko.isSubscribable(_this._options.reportUrl)) {
                        _this._disposables.push(_this._options.reportUrl.subscribe(function (newVal) {
                            _this.sender.OpenReport(newVal);
                        }));
                    }
                }
                _this._createDisposeFunction(element);
                _this._applyBindings(_this.sender.previewModel, _$element);
                _initializer_1.initPreviewModel(previewModel, _this._options);
            }));
        };
        if (requestOptions) {
            this._getLocalizationRequest().done(function (localization) {
                localization && analytics_utils_1.addCultureInfo(localization);
            }).always(function () {
                applyModel();
            });
        }
        else {
            applyModel();
        }
    };
    return JSReportViewerBinding;
}(analytics_internal_1.JSDesignerBindingCommon));
exports.JSReportViewerBinding = JSReportViewerBinding;
ko.bindingHandlers['dxReportViewer'] = {
    init: function (element, valueAccessor) {
        new JSReportViewerBinding(ko.unwrap(valueAccessor()) || {}).applyBindings(element);
        return { controlsDescendantBindings: true };
    }
};
