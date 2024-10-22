﻿/**
* DevExpress HTML/JS Reporting (viewer\search\_dxSearchEditor.js)
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
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var ko = require("knockout");
require("devextreme/ui/text_box");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var editor_prefix = 'dx-searcheditor', EDITOR_CLASS = editor_prefix + '', EDITOR_BUTTON_CLASS = editor_prefix + '-button dx-widget dx-dropdowneditor-button', EDITOR_BUTTON_SELECTOR = '.' + editor_prefix + '-button', EDITOR_BUTTON_ICON_CLASS = editor_prefix + '-icon dx-dropdowneditor-icon dx-icon-dxrd-image-move', EDITOR_BUTTON_ICON_UP_TEMPLATE = 'dxrd-svg-operations-moveup', EDITOR_BUTTON_ICON_DOWN_TEMPLATE = 'dxrd-svg-operations-movedown';
var dxSearchEditor = (function (_super) {
    __extends(dxSearchEditor, _super);
    function dxSearchEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._$buttons = [];
        return _this;
    }
    dxSearchEditor.prototype.getComponentName = function () {
        return 'dxTextBox';
    };
    dxSearchEditor.prototype.ctor = function (element, options) {
        var _this = this;
        this.option('onKeyDown', function (e) {
            if (e.event.key === analytics_internal_1.KeyboardEnum.Enter) {
                e.event.stopPropagation();
                e.event.preventDefault();
                e.component.findNext(e.event.shiftKey);
            }
        });
        this.option('onFocusOut', function (e) {
            e.component._searchModel.searchText(e.component.option('text'));
        });
        this._activeStateUnit = EDITOR_BUTTON_SELECTOR;
        this._focusRequestRaised = function () { _this.focus(); };
        this._searchModel = options.searchModel;
        this._searchModel.focusRequested.subscribe(function (val) { return _this._focusRequestRaised(); });
    };
    dxSearchEditor.prototype.findNext = function (searchUp) {
        if (this._searchModel.searchText() !== this.option('text')) {
            this._searchModel.searchText(this.option('text'));
        }
        else {
            try {
                if (searchUp) {
                    (!this._searchModel.loading()) && this._searchModel.findUp();
                }
                else {
                    (!this._searchModel.loading()) && this._searchModel.findDown();
                }
            }
            finally {
                return true;
            }
        }
    };
    dxSearchEditor.prototype._init = function () {
        analytics_internal_1._getSuper(this)['_init'].apply(this);
        var $element = $(this.element());
        $element.addClass(EDITOR_CLASS);
        this._koContext = ko.contextFor($element.get(0));
    };
    dxSearchEditor.prototype._render = function () {
        var _this = this;
        analytics_internal_1._getSuper(this)['_render'].apply(this);
        this.on('keyDown', function (e) {
            if (e.event.key == 'ArrowUp')
                _this.findNext(true) && e.event.stopPropagation();
            if (e.event.key == 'ArrowDown')
                _this.findNext(false) && e.event.stopPropagation();
        });
        this._renderButton('Up');
        this._renderButton('Down');
    };
    dxSearchEditor.prototype._renderButton = function (direction) {
        this._$button = $('<div />').addClass(EDITOR_BUTTON_CLASS);
        this._attachButtonEvents(direction);
        this._$buttonIcon = $('<div />').addClass(EDITOR_BUTTON_ICON_CLASS + direction.toLowerCase())
            .append(analytics_widgets_internal_1.SvgTemplatesEngine.templates[direction.toLowerCase() === 'up' ? EDITOR_BUTTON_ICON_UP_TEMPLATE : EDITOR_BUTTON_ICON_DOWN_TEMPLATE])
            .appendTo(this._$button);
        ko.applyBindingsToDescendants(this._koContext, this._$buttonIcon[0]);
        var buttonsContainer = this['_buttonsContainer']();
        this._$button.appendTo(buttonsContainer);
        this._$buttons.push(this._$button);
    };
    dxSearchEditor.prototype._attachButtonEvents = function (direction) {
        var _this = this;
        this._$button.off('click');
        var onClick = function (e) {
            _this.findNext(direction.toLowerCase() === 'up') && e.stopPropagation();
        };
        if (!this.option('disabled')) {
            this._$button.on('click', onClick);
            analytics_internal_1.addDisposeCallback(this._$button[0], function () {
                _this._$buttons.forEach(function ($button) {
                    $button.off('click');
                });
            });
        }
    };
    return dxSearchEditor;
}(analytics_internal_1._dxtInherit));
exports.dxSearchEditor = dxSearchEditor;
analytics_internal_1._registerDxtComponent('dxSearchEditor', dxSearchEditor);
