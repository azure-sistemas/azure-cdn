﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTableOfContentsLevel.js)
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
var _utils_1 = require("../internal/_utils");
var _locker_1 = require("../../common/utils/_locker");
var settings_1 = require("../utils/settings");
var xrControl_1 = require("./xrControl");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var ko = require("knockout");
var $ = require("jquery");
var defaultTableOfContentsLevelHeight_1 = require("./defaultTableOfContentsLevelHeight");
var TableOfContentsLevel = (function (_super) {
    __extends(TableOfContentsLevel, _super);
    function TableOfContentsLevel(model, parent, serializer, isTitle) {
        if (isTitle === void 0) { isTitle = false; }
        var _this = _super.call(this, $.extend({ '@ControlType': 'TableOfContentsLevel', isTitle: isTitle }, model), parent, serializer) || this;
        _this.borderWidth = parent.borderWidth;
        _this.borderColor = parent.borderColor;
        _this.borders = parent.borders;
        _this.dpi = parent.dpi;
        if (_this.padding) {
            _this._createPaddingDependencies();
        }
        _this.borderDashStyle = parent.borderDashStyle;
        _this.borderDefault = parent.borderDefault;
        _this._disposables.push(_this._levelIndex = ko.pureComputed(function () { return parent.allLevels().indexOf(_this); }));
        _this._disposables.push(_this._indentFactor = ko.pureComputed(function () { return _utils_1.recalculateUnit(60, _this.parentModel().dpi()); }));
        _this.indent = _this.indent || ko.observable(0);
        _this._disposables.push(_this.left = ko.pureComputed({
            read: function () {
                if (!_this.indent)
                    return 0;
                if (_this.indent() !== null && _this.indent() !== undefined)
                    return _this.indent();
                return _this._levelIndex() === 0 ? 0 : (_this._levelIndex() - 1) * _this._indentFactor();
            },
            write: $.noop
        }));
        _this._disposables.push(_this.width = ko.pureComputed({
            read: function () { return parent.size.width() - _this.left(); },
            write: $.noop
        }));
        _this._disposables.push(_this.name = ko.pureComputed(function () {
            if (_this.isTitle)
                return null;
            if (_this._levelIndex() == parent.allLevels().length - 1)
                return 'Level (Default)';
            return 'Level ' + _this._levelIndex();
        }));
        _this._disposables.push(_this.top = ko.computed({
            read: function () {
                var previousLevel = parent.allLevels()[_this._levelIndex() - 1];
                return previousLevel ? previousLevel.top() + previousLevel.height() : 0;
            },
            write: $.noop,
            deferEvaluation: true
        }));
        _this.lockedInUserDesigner = parent.lockedInUserDesigner;
        return _this;
    }
    TableOfContentsLevel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.parentModel(null);
    };
    TableOfContentsLevel.createNew = function (parent) {
        return new TableOfContentsLevel({ '@Height': _utils_1.recalculateUnit(defaultTableOfContentsLevelHeight_1.levelDefaultHeight, parent.dpi()) }, parent);
    };
    TableOfContentsLevel.prototype._createPaddingDependencies = function () {
        var _this = this;
        this.paddingObj = new analytics_elements_1.PaddingModel();
        this._disposables.push(this.paddingObj);
        this.paddingObj.applyFromString(this['padding']());
        this.paddingObj.dpi = ko.computed(function () { return _this.dpi && _this.dpi(); });
        var lock = new _locker_1.Locker().lock;
        this._disposables.push(this.padding.subscribe(function (newVal) { return lock(function () { return _this.paddingObj.applyFromString(newVal); }); }));
        ['left', 'right', 'top', 'bottom'].forEach(function (name) {
            _this._disposables.push(_this.paddingObj[name].subscribe(function (newVal) {
                if (_this.root['isModelReady'] && _this.root['isModelReady']() || !_this.root['isModelReady'])
                    lock(function () { return _this.padding(_this.paddingObj.toString()); });
            }));
        });
        this._disposables.push(this.paddingObj.dpi.subscribe(function (newVal) { return lock(function () {
            if (_this.padding())
                _this.padding(_this.paddingObj.toString());
        }); }));
        this.paddingObj['resetValue'] = function () {
            lock(function () {
                ['left', 'right', 'top', 'bottom'].forEach(function (name) { return _this.paddingObj[name](null); });
                _this.padding(_this.paddingObj.toString());
                _this.paddingObj.applyFromString(_this.padding());
            });
        };
    };
    TableOfContentsLevel.prototype.preInitProperties = function (model) {
        this.isTitle = model.isTitle;
        delete model['isTitle'];
    };
    TableOfContentsLevel.prototype.getInfo = function () {
        return this.isTitle ? xrTableOfContents_1.tocTitleSerializationsInfo : xrTableOfContentsLevel_1.tocLevelSerializationsInfo;
    };
    TableOfContentsLevel.prototype.isPropertyModified = function (name) {
        return false;
    };
    TableOfContentsLevel.prototype.getControlFactory = function () {
        return settings_1.controlsFactory();
    };
    TableOfContentsLevel.prototype.rtl = function () {
        return this.parentModel() && this.parentModel().rtl();
    };
    TableOfContentsLevel.unitProperties = ['height', 'indent'];
    return TableOfContentsLevel;
}(analytics_elements_1.ElementViewModel));
exports.TableOfContentsLevel = TableOfContentsLevel;
var TableOfContentsLevelSurface = (function (_super) {
    __extends(TableOfContentsLevelSurface, _super);
    function TableOfContentsLevelSurface(control, context) {
        var _this = _super.call(this, control, context, TableOfContentsLevelSurface._unitProperties) || this;
        _this._leaderSymbolWidth = ko.pureComputed(function () {
            if (!TableOfContentsLevelSurface._$leaderSymbol)
                TableOfContentsLevelSurface._$leaderSymbol = $('<span />').hide().appendTo('body');
            TableOfContentsLevelSurface._$leaderSymbol.html(_this.getControlModel().leaderSymbol()).css(_this.contentCss());
            return TableOfContentsLevelSurface._$leaderSymbol.width();
        });
        _this.leaderSymbols = ko.pureComputed(function () {
            var elementWidth = _this.contentWidthWithoutZoom();
            if (elementWidth <= 0 || _this._leaderSymbolWidth() === 0)
                return '';
            var symbolsCount = elementWidth / _this._leaderSymbolWidth();
            var symbol = _this.getControlModel().leaderSymbol();
            var a = [];
            while (a.length < symbolsCount) {
                a.push(symbol);
            }
            return a.join('');
        });
        _this._disposables.push(_this.isIntersect = ko.computed(function () { return false; }));
        _this._disposables.push(_this.leaderSymbols);
        _this.text = control.text;
        _this.template = 'dxrd-table-of-contents-level';
        return _this;
    }
    TableOfContentsLevelSurface.prototype.resizable = function (resizeHandler, element) {
        return $.extend({}, resizeHandler, {
            handles: 's',
            $selectedNodes: $(element),
            minimumHeight: 10
        });
    };
    TableOfContentsLevelSurface.prototype.rtlLayout = function () {
        return this._control.rtl();
    };
    TableOfContentsLevelSurface._unitProperties = {
        _height: function (o) {
            return o.height;
        },
        _width: function (o) {
            return o.width;
        },
        _x: function (o) {
            return o.left;
        },
        _y: function (o) {
            return o.top;
        },
    };
    return TableOfContentsLevelSurface;
}(xrControl_1.XRControlSurfaceBase));
exports.TableOfContentsLevelSurface = TableOfContentsLevelSurface;
var xrTableOfContents_1 = require("./metadata/xrTableOfContents");
var xrTableOfContentsLevel_1 = require("./metadata/xrTableOfContentsLevel");
