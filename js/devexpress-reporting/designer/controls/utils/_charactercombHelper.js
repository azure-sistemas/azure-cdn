﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_charactercombHelper.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharacterCombHelper = (function () {
    function CharacterCombHelper() {
    }
    CharacterCombHelper.getAlignments = function (textAlignment) {
        var vertical = '';
        var horizontal = '';
        for (var i = 0; i < textAlignment.length; i++) {
            if (textAlignment[i] === textAlignment[i].toLocaleUpperCase()) {
                if (vertical === '') {
                    vertical += textAlignment[i];
                }
                else if (vertical !== '') {
                    horizontal += textAlignment[i];
                }
            }
            else {
                if (horizontal !== '') {
                    horizontal += textAlignment[i];
                }
                else {
                    vertical += textAlignment[i];
                }
            }
        }
        return {
            vertical: vertical,
            horizontal: horizontal
        };
    };
    CharacterCombHelper.getLines = function (text, horizontal, multiline, wordwrap) {
        var texts = multiline ? text.split('\n') : [text];
        var result = [];
        if (horizontal === 0) {
            return result;
        }
        for (var i = 0; i < texts.length; i++) {
            var lines = 1;
            if (texts[i].length > horizontal && wordwrap) {
                var lines = Math.round(texts[i].length / horizontal);
                if (lines < texts[i].length / horizontal) {
                    lines++;
                }
            }
            for (var j = 0; j < lines; j++) {
                result.push(texts[i].slice(j * (horizontal), (j + 1) * horizontal));
            }
        }
        return result;
    };
    CharacterCombHelper.getTextOffset = function (texts, position, verticalAlign, horizontalAlign, vertical, horizontal) {
        var offset = 0;
        if (verticalAlign === 'Top') {
            offset += horizontal * position;
        }
        else if (verticalAlign === 'Middle') {
            offset += ((Math.floor((vertical - texts.length) / 2)) * horizontal);
            offset += horizontal * position;
        }
        else if (verticalAlign === 'Bottom') {
            offset += ((vertical - texts.length) * horizontal);
            offset += horizontal * position;
        }
        if (horizontalAlign === 'Center') {
            if (texts[position].length < horizontal) {
                offset += Math.floor((horizontal - Math.max(texts[position].length, 1)) / 2);
            }
        }
        else if (horizontalAlign === 'Right') {
            if (texts[position].length < horizontal) {
                offset += (horizontal - Math.max(texts[position].length, 1));
            }
        }
        return offset;
    };
    CharacterCombHelper.setText = function (texts, cells, getTextOffset) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].text('');
            cells[i].isEmpty = true;
        }
        for (var i = 0; i < texts.length; i++) {
            var offset = getTextOffset(texts, i);
            if (texts[i] === '' && offset < cells.length && offset >= 0) {
                cells[offset].isEmpty = false;
            }
            for (var j = offset; j < offset + texts[i].length; j++) {
                if ((j - offset) < texts[i].length && j < cells.length && j >= 0) {
                    cells[j].text(texts[i][j - offset]);
                    cells[j].isEmpty = false;
                }
            }
        }
    };
    CharacterCombHelper.distributionEmptySpace = function (emptySpace, vertical, textAlignment) {
        if (vertical && textAlignment.indexOf('Top') !== -1 || !vertical && textAlignment.indexOf('Left') !== -1)
            return 0;
        if (vertical && textAlignment.indexOf('Middle') !== -1 || !vertical && textAlignment.indexOf('Center') !== -1)
            return emptySpace / 2;
        return emptySpace;
    };
    CharacterCombHelper.getHorizontalVerticalByText = function (multiline, wordwrap, text, horizontal, vertical) {
        var stringLengths = text.split('\n').map(function (str) { return str.length; });
        var _maxLength = Math.max.apply(Math, stringLengths);
        var _horizontal = Math.min(text.length, horizontal);
        var _vertical = vertical;
        if (!multiline && !wordwrap) {
            _vertical = 1;
            _horizontal = text.length;
        }
        else if (!multiline && wordwrap) {
            _vertical = Math.ceil(text.length / _horizontal);
        }
        else if (multiline && wordwrap) {
            _horizontal = Math.min(_horizontal, _maxLength);
            _vertical = 0;
            stringLengths.forEach(function (length) { return _vertical += (length ? Math.ceil(length / _horizontal) : 1); });
        }
        else if (multiline && !wordwrap) {
            _vertical = stringLengths.length;
            _horizontal = _maxLength;
        }
        return { horizontal: _horizontal, vertical: _vertical };
    };
    return CharacterCombHelper;
}());
exports.CharacterCombHelper = CharacterCombHelper;
