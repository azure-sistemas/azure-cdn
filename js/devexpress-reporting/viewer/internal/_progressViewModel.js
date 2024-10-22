﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_progressViewModel.js)
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
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ProgressViewModel = (function (_super) {
    __extends(ProgressViewModel, _super);
    function ProgressViewModel(enableKeyboardSupport) {
        var _this = _super.call(this) || this;
        _this.progress = ko.observable(0);
        _this._forceInvisible = ko.observable(false);
        _this.inProgress = ko.observable(false);
        _this.cancelText = ko.observable(analytics_utils_1.getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel'));
        _this.text = ko.observable('');
        _this.cssClasses = ko.observable();
        _this.visible = ko.pureComputed({
            read: function () {
                if (_this._forceInvisible()) {
                    return false;
                }
                return _this.inProgress();
            },
            write: function (visibleState) {
                _this._forceInvisible(!visibleState);
            }
        });
        _this.complete = function () {
            _this.inProgress(false);
            _this.progress(0);
            $.isFunction(_this._onComplete) && _this._onComplete();
            _this._onComplete = null;
        };
        _this.startProgress = function (onComplete, onStop) {
            _this.inProgress(true);
            _this.progress(0);
            _this._onComplete = onComplete;
            _this.stop = function () {
                try {
                    $.isFunction(onStop) && onStop();
                }
                finally {
                    _this.complete();
                }
            };
        };
        if (enableKeyboardSupport) {
            _this.progressBarAccessibility = new analytics_internal_1.ListKeyboardHelper();
            _this._disposables.push(_this.progressBarAccessibility);
        }
        return _this;
    }
    ProgressViewModel.prototype.setPosition = function (position) {
        if (!position) {
            this.cssClasses({
                'dxrd-align-default': true
            });
        }
        else {
            this.cssClasses({
                'dxrd-align-bottom': position.bottom,
                'dxrd-align-top': position.top,
                'dxrd-align-left': position.left,
                'dxrd-align-right': position.right
            });
        }
    };
    return ProgressViewModel;
}(analytics_utils_1.Disposable));
exports.ProgressViewModel = ProgressViewModel;
