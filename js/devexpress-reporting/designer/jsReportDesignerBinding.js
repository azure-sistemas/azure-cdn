﻿/**
* DevExpress HTML/JS Reporting (designer\jsReportDesignerBinding.js)
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
var jsReportDesigner_1 = require("./jsReportDesigner");
var eventGenerator_1 = require("../common/binding/eventGenerator");
var _initializer_1 = require("./internal/_initializer");
var _settings_1 = require("./internal/_settings");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var _initializer_2 = require("../chart/_initializer");
var JSReportDesignerBinding = (function (_super) {
    __extends(JSReportDesignerBinding, _super);
    function JSReportDesignerBinding(_options, customEventRaiser) {
        var _this = _super.call(this, _options, customEventRaiser) || this;
        _this._model = null;
        _this._deferreds = [];
        _settings_1.limitation(_options.limitation);
        _initializer_2._setChartLimitation(_settings_1.limitation());
        _options.designerModel = analytics_internal_1._wrapModelInObservable(_options.designerModel);
        _this.sender = new jsReportDesigner_1.JSReportDesigner(_options.designerModel);
        _this._initializationData = ko.isObservable(_options.initializationData)
            ? _options.initializationData
            : ko.observable(_options.initializationData);
        _options.callbacks && _options.callbacks._eventSenderCreated && _options.callbacks._eventSenderCreated(_this.sender);
        return _this;
    }
    JSReportDesignerBinding.prototype._applyBindings = function (model, $element) {
        this.sender.designerModel = model;
        this._disposables.push(model);
        var childTemplate = !model ? $('<div>') : this._templateHtml;
        $element.children().remove();
        var child = $element.append(childTemplate).children()[0];
        if (!child)
            return;
        ko.cleanNode(child);
        this._callbacks && this._callbacks.designer.beforeRender && this._callbacks.designer.beforeRender(model);
        ko.applyBindings(model, child);
        model.afterRender();
        this._fireEvent('Init');
        var updateSizeTimeout = setTimeout(function () {
            model && model.updateSurfaceSize();
        }, 1);
        this._disposables.push({ dispose: function () { return clearTimeout(updateSizeTimeout); } });
    };
    JSReportDesignerBinding.prototype._initializeCallbacks = function () {
        var _this = this;
        if (this._options.callbacks) {
            return {
                preview: this._getAvailableEvents(eventGenerator_1.EventGenerator.generatePreviewEvents(function (eventName, args) {
                    _this._fireEvent(eventName, args);
                }, 'Preview'), 'preview'),
                designer: this._getAvailableEvents(eventGenerator_1.EventGenerator.generateDesignerEvents(function (eventName, args) {
                    _this._fireEvent(eventName, args);
                }), 'designer')
            };
        }
    };
    JSReportDesignerBinding.prototype._createModel = function (initData, element) {
        this._callbacks = this._initializeCallbacks();
        return _initializer_1.createReportDesignerFromModel(initData, element, this._callbacks, false);
    };
    JSReportDesignerBinding.prototype._showErrorInfo = function (jqXHR, getRequestDetails, errorThrown) {
        var requestDetails = getRequestDetails();
        var reportUrl = requestDetails.data.reportUrl;
        var messages = [];
        if (jqXHR && jqXHR.status)
            messages.push(jqXHR.status);
        if (errorThrown)
            messages.push(errorThrown);
        var errorStatus = messages.length > 0 ? messages.join(' - ') + '. ' : '';
        var helpLink = 'https://go.devexpress.com/Web_Reporting_Diagnostics_Tips.aspx';
        var consoleMessage = "Review the following help topic to diagnose a problem: '" + helpLink + "'.";
        var clientMessage = analytics_internal_1.getLocalization("The page is blank because the Report Designer failed to load the report. Consult the developer for assistance.\n            Use development mode for detailed information.", 'ASPxReportsStringId.ReportDesigner_GetReportDesignerModel_Error');
        var developerMessage = errorStatus + "An attempt to load the '" + reportUrl + "' report failed.\n            Open the browser developer console to investigate the issue. Review the following help topic: ";
        if (this._options.developmentMode) {
            var message = $('<span>').text(developerMessage);
            var link = $('<a>')
                .attr('target', '_blank')
                .attr('rel', 'noopener noreferrer')
                .attr('href', helpLink)
                .text('Reporting Application Diagnostics');
            analytics_internal_1.ShowMessage('', 'error', undefined, undefined, function () {
                return $('<div>').append(message, link);
            });
            console.log(consoleMessage);
            if (jqXHR && jqXHR.responseText)
                console.log(jqXHR.responseText);
        }
        else {
            analytics_internal_1.ShowMessage(clientMessage);
        }
    };
    JSReportDesignerBinding.prototype._getDesignerModelRequest = function (reportUrl) {
        var self = this;
        var requestOptions = this._options.requestOptions;
        self._callbacks = this._initializeCallbacks();
        var getDesignerModelActionUrl = this._getServerActionUrl(requestOptions.host, requestOptions.getDesignerModelAction);
        var onError = function (data, textStatus, jqXHR, getRequestDetails, errorThrown) {
            self._showErrorInfo(jqXHR, getRequestDetails, errorThrown);
            if (self._callbacks && self._callbacks.designer && self._callbacks.designer.onServerError)
                self._callbacks.designer.onServerError({ jqXHR: jqXHR, textStatus: textStatus, data: data, getRequestDetails: getRequestDetails });
            if (errorThrown)
                throw errorThrown;
        };
        var getModel = analytics_utils_1.ajaxSetup.sendRequest({
            url: getDesignerModelActionUrl,
            type: 'POST',
            data: {
                reportUrl: reportUrl
            }
        });
        var _deferredModel = $.Deferred();
        this._deferreds.push(_deferredModel);
        getModel.done(_deferredModel.resolve).fail(_deferredModel.reject);
        _deferredModel.done(function (result, textStatus, jqXHR) {
            if (result.error) {
                return onError(result, textStatus, jqXHR, function () { return ({ url: getDesignerModelActionUrl, data: { reportUrl: reportUrl } }); }, result.error);
            }
            result.handlerUri = self._getServerActionUrl(requestOptions.host, result.handlerUri);
            result.viewerHandlerUri = self._getServerActionUrl(requestOptions.host, result.viewerHandlerUri);
            result.queryBuilderHandlerUri = self._getServerActionUrl(requestOptions.host, result.queryBuilderHandlerUri);
            self._initializationData(result);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            var localizationPromises = [];
            self._callbacks && self._callbacks.designer && self._callbacks.designer.customizeLocalization && self._callbacks.designer.customizeLocalization(localizationPromises);
            analytics_internal_1.resolveFromPromises(localizationPromises, function () {
                onError({ error: errorThrown }, textStatus, jqXHR, function () { return ({ url: getDesignerModelActionUrl, data: { reportUrl: reportUrl } }); }, errorThrown);
            });
        });
    };
    JSReportDesignerBinding.prototype.dispose = function () {
        (this._deferreds || []).forEach(function (deferred) {
            deferred.reject();
        });
        _super.prototype.dispose.call(this);
    };
    JSReportDesignerBinding.prototype.applyBindings = function (element) {
        var _this = this;
        var self = this;
        var _$element = $(element);
        _$element.addClass('dx-designer');
        this._createDisposeFunction(element);
        if (self._options.undoEngine) {
            self._applyBindings(self._options, _$element);
            return;
        }
        var applyBindingsFunc = function (newData) {
            if (_this._model) {
                _this._disposables.splice(_this._disposables.indexOf(_this._model), 1);
                ko.cleanNode(element.firstChild);
                _this._model.dispose();
            }
            self._createModel(newData, element).done(function (model) {
                _this._model = model;
                self._applyBindings(model, _$element);
            });
        };
        this._disposables.push(self._initializationData.subscribe(function (newVal) {
            applyBindingsFunc(newVal);
        }));
        if (self._options.requestOptions) {
            self._getLocalizationRequest().done(function (localization) {
                localization && analytics_utils_1.addCultureInfo(localization);
            }).always(function () {
                if (self._options.requestOptions.getDesignerModelAction) {
                    if (ko.isSubscribable(self._options.reportUrl)) {
                        _this._disposables.push(self._options.reportUrl.subscribe(function (newVal) { return self._getDesignerModelRequest(newVal); }));
                    }
                    self._getDesignerModelRequest(ko.unwrap(self._options.reportUrl));
                }
                else {
                    applyBindingsFunc(self._initializationData());
                }
            });
        }
        else {
            applyBindingsFunc(self._initializationData());
        }
    };
    return JSReportDesignerBinding;
}(analytics_internal_1.JSDesignerBindingCommon));
exports.JSReportDesignerBinding = JSReportDesignerBinding;
ko.bindingHandlers['dxReportDesigner'] = {
    init: function (element, valueAccessor) {
        new JSReportDesignerBinding(ko.unwrap(valueAccessor()) || {}).applyBindings(element);
        return { controlsDescendantBindings: true };
    }
};
