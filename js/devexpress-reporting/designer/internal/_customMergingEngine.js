﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_customMergingEngine.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var CustomMergingEngine = (function () {
    function CustomMergingEngine() {
    }
    CustomMergingEngine.prototype._customMergeForFormatString = function (propertyName, controls, undoEngine) {
        if (propertyName === 'formatString') {
            var result = ko.observable(controls.every(function (control) { return controls[0][propertyName].peek() === control[propertyName].peek(); }) ? controls[0][propertyName].peek() : null);
            return {
                result: result,
                subscriptions: [
                    result.subscribe(function (newVal) {
                        undoEngine && undoEngine().start();
                        controls.forEach(function (control) {
                            if (!control.disabled()) {
                                control[propertyName](newVal);
                            }
                        });
                        undoEngine && undoEngine().end();
                    })
                ]
            };
        }
    };
    CustomMergingEngine.prototype.customMerge = function (propertyName, controls, undoEngine) {
        var _this = this;
        if (propertyName === 'dataBindings') {
            var result = ko.observableArray();
            var subscriptions = [];
            var allBindings = [].concat.apply([], controls.map(function (x) { return x[propertyName](); }));
            controls[0][propertyName]().map(function (x) { return x.propertyName(); }).forEach(function (name) {
                var availableBindings = allBindings.filter(function (binding) {
                    return binding.propertyName() === name;
                });
                if (availableBindings.length === controls.length) {
                    var combinedObj = analytics_internal_1.CombinedObject._merge(availableBindings, undoEngine, function (propertyName, controls, undoEngine) { return _this._customMergeForFormatString(propertyName, controls, undoEngine); });
                    var binding = combinedObj.result;
                    binding['isEmpty'] = function () {
                        return !(binding['dataMember']() || binding['dataSource']() || binding['parameter']());
                    };
                    binding['visible'] = ko.observable(false);
                    binding['disabled'] = ko.computed(function () {
                        return availableBindings.every(function (x) { return x.disabled(); });
                    });
                    combinedObj.subscriptions.push(binding['disabled']);
                    result.push(binding);
                    subscriptions = [].concat.apply(subscriptions, combinedObj.subscriptions);
                }
            });
            return { result: result, subscriptions: subscriptions };
        }
    };
    return CustomMergingEngine;
}());
exports.CustomMergingEngine = CustomMergingEngine;
