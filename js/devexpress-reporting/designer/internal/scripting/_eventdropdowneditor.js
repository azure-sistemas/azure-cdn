﻿/**
* DevExpress HTML/JS Reporting (designer\internal\scripting\_eventdropdowneditor.js)
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
require("devextreme/ui/select_box");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var EDITOR_CLASS = 'dx-eventdropdowneditor dx-selectbox', EDITOR_ELLIPSIS_BUTTON_CLASS = 'dx-button-normal dx-dropdowneditor-button dxrd-ellipsis-button', EDITOR_ELLIPSIS_BUTTON_ICON_CLASS = 'dx-dropdowneditor-icon dxrd-ellipsis-image', EDITOR_ELLIPSIS_BUTTON_ICON_TEMPLATE = 'dxrd-svg-ellipsis';
var dxEventDropDownEditor = (function (_super) {
    __extends(dxEventDropDownEditor, _super);
    function dxEventDropDownEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    dxEventDropDownEditor.prototype.getComponentName = function () {
        return 'dxSelectBox';
    };
    dxEventDropDownEditor.prototype.ctor = function () {
        this._secondAction = null;
        this._$ellipsisButton = null;
        this._koContext = null;
    };
    dxEventDropDownEditor.prototype._getDefaultOptions = function () {
        return $.extend(analytics_internal_1._getSuper(this)['_getDefaultOptions'].apply(this), {
            openOnFieldClick: false,
            secondAction: null
        });
    };
    dxEventDropDownEditor.prototype._init = function () {
        analytics_internal_1._getSuper(this)['_init'].apply(this);
        this._initSecondAction();
        var $element = $(this['element']());
        this._koContext = ko.contextFor($element[0]);
    };
    dxEventDropDownEditor.prototype._initSecondAction = function () {
        this._secondAction = this['_createAction'](this.option('secondAction'));
    };
    dxEventDropDownEditor.prototype._render = function () {
        var $element = $(this['element']());
        $element.addClass(EDITOR_CLASS);
        analytics_internal_1._getSuper(this)['_render'].apply(this);
    };
    dxEventDropDownEditor.prototype._renderDropDownButton = function () {
        if (this._$ellipsisButton) {
            this._$ellipsisButton.remove();
            this._$ellipsisButton = null;
        }
        analytics_internal_1._getSuper(this)['_renderDropDownButton'].apply(this);
        this._$ellipsisButton = this._createEllipsisButton();
        this._$ellipsisButton.prependTo(this['_buttonsContainer']());
        this._attachEllipsisButtonClickHandler();
    };
    dxEventDropDownEditor.prototype._createEllipsisButton = function () {
        var $buttonIcon = $('<div>').addClass(EDITOR_ELLIPSIS_BUTTON_ICON_CLASS).append(analytics_widgets_internal_1.SvgTemplatesEngine.templates[EDITOR_ELLIPSIS_BUTTON_ICON_TEMPLATE]);
        ko.applyBindingsToDescendants(this._koContext, $buttonIcon[0]);
        var $button = $('<div>')['dxButton']({
            focusStateEnabled: false,
            disabled: this.option('readOnly')
        })['removeClass']('dx-button');
        $button.addClass(EDITOR_ELLIPSIS_BUTTON_CLASS);
        $button.append($buttonIcon);
        $button.find('.dx-button-content').remove();
        return $button;
    };
    dxEventDropDownEditor.prototype._attachEllipsisButtonClickHandler = function () {
        if (this._$ellipsisButton) {
            this._$ellipsisButton.dxButton('option', 'onClick', this._secondAction.bind(this));
        }
    };
    dxEventDropDownEditor.prototype._optionChanged = function (args) {
        switch (args.name) {
            case 'secondAction':
                this._initSecondAction();
                this._attachEllipsisButtonClickHandler();
                break;
            default:
                analytics_internal_1._getSuper(this)['_optionChanged'].apply(this, [args]);
        }
    };
    return dxEventDropDownEditor;
}(analytics_internal_1._dxtInherit));
exports.dxEventDropDownEditor = dxEventDropDownEditor;
analytics_internal_1._registerDxtComponent('dxEventDropDownEditor', dxEventDropDownEditor);
