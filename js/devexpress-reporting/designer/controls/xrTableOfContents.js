﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTableOfContents.js)
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
var xrReportelement_1 = require("./xrReportelement");
var _localizationUtils_1 = require("./utils/_localizationUtils");
var xrTableOfContentsLevel_1 = require("./xrTableOfContentsLevel");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var XRTableOfContentsViewModel = (function (_super) {
    __extends(XRTableOfContentsViewModel, _super);
    function XRTableOfContentsViewModel(control, parent, serializer) {
        var _this = _super.call(this, control, parent, serializer) || this;
        _this.borderDefault = ko.pureComputed(function () { return 'none'; });
        _this._disposables.push(_this.levelTitle = new xrTableOfContentsLevel_1.TableOfContentsLevel(control['LevelTitle'], _this, serializer, true));
        _this.levelTitleText = _this.levelTitle.text;
        _this._disposables.push(_this.levelDefault = new xrTableOfContentsLevel_1.TableOfContentsLevel(control['LevelDefault'], _this, serializer));
        _this.levels = analytics_utils_1.deserializeArray(control['Levels'], function (item) { return new xrTableOfContentsLevel_1.TableOfContentsLevel(item, _this, serializer); });
        _this._disposables.push(_this.allLevels = ko.computed(function () {
            var array = [_this.levelTitle];
            Array.prototype.push.apply(array, _this.levels());
            array.push(_this.levelDefault);
            return array;
        }));
        _this._disposables.push(_this.size.height = ko.computed({
            read: function () { return _this.levelDefault.top() + _this.levelDefault.height(); },
            write: $.noop
        }));
        _this._disposables.push(_this.size.width = ko.computed({
            read: function () { return (_this.parentModel() ? _this.parentModel().size.width() : 0); },
            write: $.noop
        }));
        _this._disposables.push(_this.location.x = ko.computed({
            read: function () { return 0; },
            write: function () { }
        }));
        _this._disposables.push(_this.borderDefault);
        return _this;
    }
    XRTableOfContentsViewModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.levels);
        this.resetObservableArray(this.levels);
    };
    XRTableOfContentsViewModel.prototype.createLocalizationProvider = function () {
        return new _localizationUtils_1.TableOfContentLocalizationProvider(this);
    };
    Object.defineProperty(XRTableOfContentsViewModel.prototype, "textEditableProperty", {
        get: function () { return this.levelTitleText; },
        enumerable: true,
        configurable: true
    });
    XRTableOfContentsViewModel.unitProperties = [].concat(['levelTitle', 'levelDefault'], xrReportelement_1.XRReportElementViewModel.unitProperties);
    return XRTableOfContentsViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRTableOfContentsViewModel = XRTableOfContentsViewModel;
var XRTableOfContentsSurface = (function (_super) {
    __extends(XRTableOfContentsSurface, _super);
    function XRTableOfContentsSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this.levels = ko.observableArray();
        _this._disposables.push(_this.levelTitle = new xrTableOfContentsLevel_1.TableOfContentsLevelSurface(control.levelTitle, context));
        _this._disposables.push(_this.levelDefault = new xrTableOfContentsLevel_1.TableOfContentsLevelSurface(control.levelDefault, context));
        _this._disposables.push(analytics_internal_1.createObservableArrayMapCollection(control.levels, _this.levels, function (item) { return new xrTableOfContentsLevel_1.TableOfContentsLevelSurface(item, context); }));
        _this.template = 'dxrd-table-of-contents';
        _this.selectiontemplate = 'dxrd-table-of-contents-selected';
        return _this;
    }
    XRTableOfContentsSurface.prototype.isThereIntersectionWithChildCollection = function () {
        return false;
    };
    XRTableOfContentsSurface.prototype.isThereIntersectionWithUsefulArea = function () {
        return false;
    };
    XRTableOfContentsSurface.prototype.isThereIntersectionWithParentCollection = function () {
        return false;
    };
    return XRTableOfContentsSurface;
}(xrControl_1.XRControlSurface));
exports.XRTableOfContentsSurface = XRTableOfContentsSurface;
