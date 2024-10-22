﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\anchoring.js)
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
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var Anchoring = (function (_super) {
    __extends(Anchoring, _super);
    function Anchoring(subscrible, model, anchoringProperty) {
        var _this = _super.call(this) || this;
        _this.state = Anchoring.states.complete;
        _this.anchoring = anchoringProperty;
        _this.start(subscrible, model);
        return _this;
    }
    Anchoring.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.subscribtion.dispose();
    };
    Anchoring.prototype.start = function (subscrible, model) {
        var _this = this;
        this.subscribtion && this.subscribtion.dispose();
        var oldVal = ko.observable(subscrible());
        this.subscribtion = subscrible.subscribe(function (newVal) {
            if (_this.state !== Anchoring.states.fromControls) {
                _this.state = Anchoring.states.inProgress;
                _this.anchorSubscribtion(newVal, oldVal, model);
            }
            oldVal(newVal);
            _this.state = Anchoring.states.complete;
        });
    };
    Anchoring.states = {
        inProgress: 'inProgress',
        complete: 'complete',
        fromControls: 'fromControls'
    };
    return Anchoring;
}(analytics_utils_1.Disposable));
exports.Anchoring = Anchoring;
var VerticalAcnhoring = (function (_super) {
    __extends(VerticalAcnhoring, _super);
    function VerticalAcnhoring(subscrible, model, anchoringProperty) {
        var _this = _super.call(this, subscrible, model, anchoringProperty) || this;
        _this.anchorSubscribtion = function (parentSizeValue, oldValue, model) {
            if (analytics_internal_1.checkModelReady(model.root) && isFinite(oldValue()) && oldValue()) {
                if (_this.anchoring() === 'Both') {
                    var newSize = model.size.height() + parentSizeValue - oldValue();
                    model.size.height(newSize > 0 ? newSize : 1);
                }
                if (_this.anchoring() === 'Bottom') {
                    var newLocation = model.location.y() + parentSizeValue - oldValue();
                    model.location.y(newLocation > 0 ? newLocation : 0);
                }
            }
        };
        _this._disposables.push(model.size.height.subscribe(function (newVal) {
            if (_this.state === Anchoring.states.complete) {
                _this.state = Anchoring.states.fromControls;
            }
        }));
        _this._disposables.push(model.location.y.subscribe(function (newVal) {
            if (_this.state === Anchoring.states.complete) {
                _this.state = Anchoring.states.fromControls;
            }
        }));
        return _this;
    }
    return VerticalAcnhoring;
}(Anchoring));
exports.VerticalAcnhoring = VerticalAcnhoring;
var HorizontalAnchoring = (function (_super) {
    __extends(HorizontalAnchoring, _super);
    function HorizontalAnchoring(subscrible, model, anchoringProperty) {
        var _this = _super.call(this, subscrible, model, anchoringProperty) || this;
        _this.anchorSubscribtion = function (parentSizeValue, oldValue, model) {
            if (analytics_internal_1.checkModelReady(model.root) && isFinite(oldValue()) && oldValue()) {
                if (_this.anchoring() === 'Both') {
                    var newSize = model.size.width() + parentSizeValue - oldValue();
                    model.size.width(newSize > 0 ? newSize : 1);
                }
                if (_this.anchoring() === 'Right') {
                    var newLocation = model.location.x() + parentSizeValue - oldValue();
                    model.location.x(newLocation > 0 ? newLocation : 0);
                }
            }
        };
        return _this;
    }
    return HorizontalAnchoring;
}(Anchoring));
exports.HorizontalAnchoring = HorizontalAnchoring;
