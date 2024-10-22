﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\textEditingField.js)
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
var metadata_1 = require("../../../common/metadata");
var editingFieldExtensions_1 = require("../../../common/utils/editingFieldExtensions");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var $ = require("jquery");
require("jquery-ui/ui/focusable");
var TextEditingFieldViewModelBase = (function () {
    function TextEditingFieldViewModelBase() {
    }
    TextEditingFieldViewModelBase.prototype.keypressAction = function (data, event) {
        var _this = this;
        analytics_internal_1.processTextEditorHotKeys(event, {
            esc: function () {
                _this.hideEditor(false);
            },
            ctrlEnter: function () {
                _this.hideEditor(true);
            }
        });
    };
    return TextEditingFieldViewModelBase;
}());
exports.TextEditingFieldViewModelBase = TextEditingFieldViewModelBase;
var TextEditingFieldViewModel = (function (_super) {
    __extends(TextEditingFieldViewModel, _super);
    function TextEditingFieldViewModel(field, pageWidth, pageHeight, zoom, bounds) {
        var _this = _super.call(this) || this;
        _this.template = 'dxrp-editing-field-container';
        _this.htmlValue = function () { return _this.field.htmlValue(); };
        _this.wordWrap = true;
        _this.active = ko.observable(false);
        var brickStyle = field.model().brickOptions;
        var style = { rtl: function () { return brickStyle.rtl; } };
        new analytics_utils_1.ModelSerializer().deserialize(style, JSON.parse(brickStyle.style), metadata_1.brickStyleSerializationsInfo);
        var cssCalculator = new analytics_internal_1.CssCalculator(style, ko.observable(!!brickStyle.rtlLayout));
        var padding = cssCalculator.paddingsCss();
        var verticalPadding = parseInt(padding['paddingTop']) + parseInt(padding['paddingBottom']);
        if (cssCalculator.borderCss()['borderTop'] !== 'none') {
            verticalPadding += style['borderWidth']();
        }
        if (cssCalculator.borderCss()['borderBottom'] !== 'none') {
            verticalPadding += style['borderWidth']();
        }
        _this.breakOffsetStyle = function () {
            return {
                top: bounds.offset.y * -100 / bounds.height + '%',
                left: bounds.offset.x * -100 / bounds.width + '%'
            };
        };
        _this.textStyle = function () { return $.extend({}, cssCalculator.fontCss(), cssCalculator.foreColorCss(), cssCalculator.textAlignmentCss()); };
        _this.zoom = zoom;
        _this.field = field;
        if (brickStyle.wordWrap != undefined) {
            _this.wordWrap = brickStyle.wordWrap;
        }
        _this.hideEditor = function (shouldCommit) {
            setTimeout(function () {
                if (shouldCommit) {
                    if (editorOptions.onHideEditor) {
                        editorOptions.onHideEditor(field);
                    }
                    else {
                        field.editValue(field._editorValue());
                    }
                }
                else {
                    field._editorValue(field.editValue());
                }
                _this.active(false);
            }, 1);
        };
        var editor = editingFieldExtensions_1.EditingFieldExtensions.instance().editor(field.editorName());
        var editorOptions = $.extend(true, {}, editor && editor.options || {});
        _this.data = {
            value: field._editorValue,
            hideEditor: _this.hideEditor,
            keypressAction: _this.keypressAction,
            textStyle: _this.textStyle,
            options: editorOptions,
            getOptions: function (templateOptions) { return $.extend({}, _this.data.options, templateOptions); }
        };
        var isCustomEditor = !!(editor && editor.template && editor.template !== 'dxrp-editing-field-datetime');
        if (!isCustomEditor) {
            var self = _this;
            _this.data.options = $.extend(true, {}, editorOptions, {
                value: field._editorValue,
                onFocusOut: function (e) {
                    self.hideEditor(true);
                }
            });
        }
        if (editor) {
            _this.editorTemplate = editor.template || 'dxrp-editing-field-mask';
        }
        else {
            _this.editorTemplate = 'dxrp-editing-field-text';
        }
        _this.containerStyle = ko.pureComputed(function () {
            return $.extend({
                width: bounds.width + 'px',
                height: bounds.height + 'px',
                'line-height': (bounds.height - verticalPadding) + 'px',
                top: bounds.top * 100 / pageHeight + '%',
                left: bounds.left * 100 / pageWidth + '%',
                cursor: _this.field.readOnly() ? 'auto' : 'text'
            }, _this.active() || !_this.htmlValue() ? cssCalculator.borderCss() : { border: 'none' }, isCustomEditor && _this.active() || (!!_this.htmlValue() && !_this.active()) ? { padding: 0 } : cssCalculator.paddingsCss(), { 'border-color': 'transparent' });
        });
        _this.borderStyle = ko.pureComputed(function () {
            if (style['borderWidth']() > 0 && style['borders']() !== 'None') {
                return {
                    left: '-' + style['borderWidth']() + 'px',
                    top: '-' + style['borderWidth']() + 'px',
                    paddingRight: (style['borderWidth']() * 2 - 2) + 'px',
                    paddingBottom: (style['borderWidth']() * 2 - 2) + 'px'
                };
            }
        });
        return _this;
    }
    TextEditingFieldViewModel.prototype.activateEditor = function (viewModel, e) {
        if (this.field.readOnly() || this.active()) {
            return;
        }
        var data = viewModel.data;
        if (data && data.options && data.options.onPreRender) {
            data.options.onPreRender(this.data);
        }
        this.active(true);
        var elementFocused = false;
        if (viewModel.options && viewModel.options.onEditorShown) {
            elementFocused = viewModel.options.onEditorShown(this.data, $(e && e.currentTarget).first().get(0));
        }
        if (!elementFocused) {
            var element = $(e && e.currentTarget).find(':focusable').eq(0)[0];
            element.focus();
            if (element['setSelectionRange']) {
                element['setSelectionRange'](element['value'].length, element['value'].length);
            }
        }
    };
    return TextEditingFieldViewModel;
}(TextEditingFieldViewModelBase));
exports.TextEditingFieldViewModel = TextEditingFieldViewModel;
