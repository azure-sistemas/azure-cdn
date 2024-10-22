﻿/**
* DevExpress HTML/JS Reporting (designer\localization\localizationService.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var $ = require("jquery");
var TranslationFactory = (function () {
    function TranslationFactory() {
        this._services = {};
    }
    TranslationFactory.prototype.getFirstRegistered = function () {
        var _this = this;
        return analytics_internal_1.findFirstItemMatchesCondition(Object.keys(this._services), function (serviseKey) { return _this._services[serviseKey].onRequest !== undefined; });
    };
    TranslationFactory.prototype.getTranslations = function (texts, destinationLanguage) {
        var _this = this;
        var $deferred = $.Deferred();
        $.when.apply($, Object.keys(this._services).map(function (serviceName) { return _this.translate(serviceName, texts, destinationLanguage); })).done(function () {
            var results = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                results[_i] = arguments[_i];
            }
            $deferred.resolve([].concat.apply([], results));
        });
        return $deferred;
    };
    TranslationFactory.prototype.translate = function (name, texts, destinationLanguage) {
        var _this = this;
        if (!this._services[name])
            return;
        var $deferred = $.Deferred();
        $.ajax(this._services[name].onRequest(texts, destinationLanguage)).done(function (result) {
            $deferred.resolve({ name: name, texts: _this._services[name].onResponse(result) });
        }).fail(function () { return $deferred.reject(); });
        return $deferred.promise();
    };
    TranslationFactory.prototype.register = function (name, service) {
        this._services[name] = service;
    };
    TranslationFactory.prototype.unregister = function (name) {
        delete this._services[name];
    };
    return TranslationFactory;
}());
exports._translationFactory = new TranslationFactory();
function registerTranslationService(name, service) {
    exports._translationFactory.register(name, service);
}
exports.registerTranslationService = registerTranslationService;
function unregisterTranslationService(name) {
    exports._translationFactory.unregister(name);
}
exports.unregisterTranslationService = unregisterTranslationService;
