﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\characterCombEditingField.js)
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
var textEditingField_1 = require("./textEditingField");
var metadata_1 = require("../../../common/metadata");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var $ = require("jquery");
require("jquery-ui/ui/focusable");
var CharacterCombEditingFieldViewModel = (function (_super) {
    __extends(CharacterCombEditingFieldViewModel, _super);
    function CharacterCombEditingFieldViewModel(field, pageWidth, pageHeight, zoom, bounds) {
        var _this = _super.call(this) || this;
        _this.field = field;
        _this.template = 'dxrp-character-comb-editing-field';
        _this.active = ko.observable(false);
        var brickStyle = field.model().brickOptions;
        var style = { rtl: function () { return brickStyle.rtl; } };
        new analytics_utils_1.ModelSerializer().deserialize(style, JSON.parse(brickStyle.style), metadata_1.brickStyleSerializationsInfo);
        var cssCalculator = new analytics_internal_1.CssCalculator(style, ko.observable(!!brickStyle.rtlLayout));
        var verticalPadding = parseInt(cssCalculator.paddingsCss()['paddingTop']) + parseInt(cssCalculator.paddingsCss()['paddingBottom']);
        var borderCss = cssCalculator.borderCss();
        if (borderCss['borderTop'] !== 'none') {
            verticalPadding += style['borderWidth']();
        }
        if (borderCss['borderBottom'] !== 'none') {
            verticalPadding += style['borderWidth']();
        }
        _this.textStyle = function () { return $.extend({}, cssCalculator.fontCss(), cssCalculator.foreColorCss(), cssCalculator.textAlignmentCss()); };
        _this.hideEditor = function (shouldCommit) {
            setTimeout(function () {
                if (shouldCommit) {
                    field.editValue(field._editorValue());
                }
                else {
                    field._editorValue(field.editValue());
                }
                _this.active(false);
            });
        };
        _this.containerStyle = ko.pureComputed(function () {
            return $.extend({
                width: bounds.width + 'px',
                height: bounds.height + 'px',
                'line-height': (bounds.height - verticalPadding) + 'px',
                top: bounds.top * 100 / pageHeight + '%',
                left: bounds.left * 100 / pageWidth + '%'
            }, cssCalculator.fontCss(), cssCalculator.foreColorCss());
        });
        var cellVerticalPadding = 0;
        var borderCellStyle = 'none';
        ['Left', 'Top', 'Right', 'Bottom'].forEach(function (item) {
            if (borderCss['border' + item] !== 'none') {
                borderCellStyle = borderCss['border' + item];
                cellVerticalPadding = style['borderWidth']() * 2;
            }
        });
        var cellStyle = {
            'border': borderCellStyle,
            'text-align': 'center',
            'position': 'absolute',
            'box-sizing': 'border-box',
            'border-color': 'transparent'
        };
        var characterCombBounds = field.model().brickOptions.characterCombBounds;
        _this.cells = [];
        var rowTops = {};
        for (var i = 0; i < characterCombBounds.length; i++) {
            _this.cells.push({
                style: $.extend({
                    width: characterCombBounds[i].width + 'px',
                    height: characterCombBounds[i].height + 'px',
                    'line-height': (characterCombBounds[i].height - cellVerticalPadding) + 'px',
                    top: characterCombBounds[i].top + 'px',
                    left: characterCombBounds[i].left + 'px'
                }, cellStyle),
                text: ''
            });
            rowTops[characterCombBounds[i].top] = i;
        }
        var rowsCount = Object.keys(rowTops).length;
        var colsCount = _this.cells.length / rowsCount;
        CharacterCombEditingFieldViewModel.setText(_this.cells, style['textAlignment'](), style.rtl(), field.editValue.peek(), rowsCount, colsCount);
        field.editValue.subscribe(function (newValue) {
            CharacterCombEditingFieldViewModel.setText(_this.cells, style['textAlignment'](), style.rtl(), newValue, rowsCount, colsCount);
        });
        _this.zoom = zoom;
        return _this;
    }
    CharacterCombEditingFieldViewModel.prototype.activateEditor = function (viewModel, e) {
        if (!this.field.readOnly() && !this.active()) {
            this.active(true);
            var element = $(e && e.currentTarget).find(':focusable').eq(0)[0];
            element.focus();
            if (element['setSelectionRange']) {
                element['setSelectionRange'](element['value'].length, element['value'].length);
            }
        }
    };
    CharacterCombEditingFieldViewModel.setText = function (cells, textAlignment, rtl, text, rowsCount, colsCount) {
        for (var j = 0; j < cells.length; j++) {
            cells[j].text = '';
        }
        var textRowsCount = Math.ceil(text.length / colsCount);
        var textLastRowColCount = text.length % colsCount;
        var startRow = -1;
        if (textAlignment.indexOf('Bottom') === 0) {
            startRow = rowsCount - textRowsCount;
        }
        else if (textAlignment.indexOf('Middle') === 0) {
            startRow = Math.floor((rowsCount - textRowsCount) / 2);
        }
        else {
            startRow = 0;
        }
        var lastRowStartCol = -1;
        if (textAlignment.indexOf('Right') > 0) {
            lastRowStartCol = rtl ? 0 : (colsCount - textLastRowColCount);
        }
        else if (textAlignment.indexOf('Center') > 0) {
            lastRowStartCol = Math.floor((colsCount - textLastRowColCount) / 2);
        }
        else {
            lastRowStartCol = rtl ? (colsCount - textLastRowColCount) : 0;
        }
        var j = startRow * colsCount;
        var i = 0;
        for (; i < text.length - textLastRowColCount; i++, j++) {
            if (j >= 0 && j < cells.length) {
                cells[j].text = text[i];
            }
        }
        for (; i < text.length; i++, j++) {
            if (j >= 0 && j < cells.length) {
                cells[j + lastRowStartCol].text = text[i];
            }
        }
    };
    return CharacterCombEditingFieldViewModel;
}(textEditingField_1.TextEditingFieldViewModelBase));
exports.CharacterCombEditingFieldViewModel = CharacterCombEditingFieldViewModel;
